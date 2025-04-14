
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import QuickActionCards from '@/components/home/QuickActionCards';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer';
import { formatDistanceToNow } from 'date-fns';
import { bg, enUS } from 'date-fns/locale';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import { useToast } from '@/hooks/use-toast';

const HomeContent = () => {
  const { t, language, currency } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { resetOffer } = useOffer();
  const { toast } = useToast();
  const [recentOffers, setRecentOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecentOffers();
      checkForDraftOffer();
    }
  }, [user]);

  const checkForDraftOffer = async () => {
    if (!user) return;
    
    try {
      const draftOffer = await getLatestDraftFromDatabase(user.id);
      if (draftOffer) {
        setHasDraft(true);
      } else {
        setHasDraft(false);
      }
    } catch (error) {
      console.error("Error checking for draft offer:", error);
    }
  };

  const fetchRecentOffers = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_offers')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_draft', false)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      // Properly cast the data to SavedOffer[] type
      setRecentOffers((data || []) as unknown as SavedOffer[]);
    } catch (error) {
      console.error('Error fetching recent offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatOfferDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: language === 'bg' ? bg : enUS,
      });
    } catch (error) {
      return date;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'bg' ? 'bg-BG' : 'en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // Calculate offer total safely
  const calculateOfferTotal = (offer: SavedOffer) => {
    try {
      // Check if offer_data and products exist and are properly structured
      if (!offer?.offer_data?.products || !Array.isArray(offer.offer_data.products)) {
        return 0;
      }
      
      return offer.offer_data.products.reduce(
        (acc, product) => acc + ((product?.quantity || 0) * (product?.unitPrice || 0)), 
        0
      );
    } catch (error) {
      console.error('Error calculating offer total:', error);
      return 0;
    }
  };

  const handleOpenDraftOffer = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    
    try {
      if (user && hasDraft) {
        console.log("HomeContent: Opening draft offer");
        
        // Navigate with state that indicates we're loading a draft
        navigate('/new-offer', {
          state: { 
            loadDraft: true,
            draftId: user.id,
            timestamp: new Date().getTime()
          },
          replace: true
        });
      } else {
        console.log("HomeContent: No draft found");
        await resetOffer();
        navigate('/new-offer', { replace: true });
      }
    } catch (error) {
      console.error("Error opening draft:", error);
      toast({
        title: t.common.error,
        description: "Error opening draft offer",
        variant: 'destructive'
      });
      await resetOffer();
      navigate('/new-offer', { replace: true });
    } finally {
      setIsNavigating(false);
    }
  };

  const handleOfferClick = async (offer: SavedOffer) => {
    if (isNavigating) return; // Prevent multiple clicks
    setIsNavigating(true);
    
    try {
      console.log("HomeContent: Loading offer with data:", offer.offer_data);
      
      if (offer?.offer_data) {
        // Navigate to the new offer page with state that indicates we should load this offer
        navigate('/new-offer', {
          state: { 
            loadSavedOffer: true,
            savedOfferId: offer.id,
            offerData: offer.offer_data,
            timestamp: new Date().getTime()
          },
          replace: true
        });
      } else {
        console.error("HomeContent: Invalid offer data:", offer);
        toast({
          title: t.common.error,
          description: "Invalid offer data",
          variant: 'destructive'
        });
        await resetOffer();
        navigate('/new-offer', { replace: true });
      }
    } catch (error) {
      console.error("HomeContent: Error loading offer:", error);
      toast({
        title: t.common.error,
        description: "Failed to load offer data",
        variant: 'destructive'
      });
      
      await resetOffer();
      navigate('/new-offer', { replace: true });
    } finally {
      setIsNavigating(false);
    }
  };

  const handleCreateNewOffer = async () => {
    // Reset offer state before creating a new one
    await resetOffer();
    navigate('/new-offer', { replace: true });
  };

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.home.quickActions}</h2>
      </section>
      
      <section>
        <QuickActionCards />
      </section>

      {hasDraft && (
        <section>
          <h2 className="text-xl font-semibold mb-4">{t.offer.draftStatus}</h2>
          <Card 
            className="hover:shadow-md transition-shadow cursor-pointer border-amber-200 bg-amber-50"
            onClick={handleOpenDraftOffer}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                    <FileEdit size={18} />
                  </div>
                  <div>
                    <div className="font-medium text-amber-800">
                      {t.offer.draftInProgress}
                    </div>
                    <div className="text-sm text-amber-600">
                      {t.offer.continueWorking}
                    </div>
                  </div>
                </div>
                <ArrowUpRight size={16} className="text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-4">{t.savedOffers.recentOffers}</h2>
        <div className="grid grid-cols-1 gap-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center">{t.common.loading}</div>
              </CardContent>
            </Card>
          ) : recentOffers.length > 0 ? (
            recentOffers.map((offer) => (
              <Card 
                key={offer.id} 
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleOfferClick(offer)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                        {offer.offer_data?.client?.name ? (
                          <User size={18} />
                        ) : (
                          <Calendar size={18} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {offer.offer_data?.client?.name || t.common.noName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatOfferDate(offer.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(calculateOfferTotal(offer))}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {offer.offer_data?.products?.length || 0} {t.products.items}
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-2">{t.home.noRecentOffers}</div>
                <Button 
                  variant="outline" 
                  onClick={handleCreateNewOffer}
                >
                  {t.common.newOffer}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
