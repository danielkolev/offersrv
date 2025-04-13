
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import QuickActionCards from '@/components/home/QuickActionCards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { ArrowUpRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer';
import { formatDistanceToNow } from 'date-fns';
import { bg, enUS } from 'date-fns/locale';
import DraftIndicator from '@/components/offer-draft/DraftIndicator';

const HomeContent = () => {
  const { t, language, currency } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { setOffer } = useOffer();
  const [recentOffers, setRecentOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchRecentOffers();
    }
  }, [user]);

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

  const handleOfferClick = (offer: SavedOffer) => {
    // Зареждане на офертата и навигация към страницата за редактиране
    setOffer(offer.offer_data);
    navigate('/new-offer');
  };

  return (
    <div className="space-y-8">
      <section className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{t.home.quickActions}</h2>
        <DraftIndicator />
      </section>
      
      <section>
        <QuickActionCards />
      </section>

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
                        {offer.offer_data.client?.name ? (
                          <User size={18} />
                        ) : (
                          <Calendar size={18} />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {offer.offer_data.client?.name || t.common.noName}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatOfferDate(offer.created_at)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium">
                          {formatCurrency(
                            offer.offer_data.products.reduce(
                              (acc, product) => acc + (product.unitPrice * product.quantity), 
                              0
                            )
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {offer.offer_data.products.length} {t.products.items}
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
                  onClick={() => navigate('/new-offer')}
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
