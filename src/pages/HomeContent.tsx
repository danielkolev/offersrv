
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import QuickActionCards from '@/components/home/QuickActionCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Offer } from '@/types/offer';

interface SavedOfferData {
  id: string;
  created_at: string;
  offer_data: Offer;
  name?: string;
}

const HomeContent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [recentOffers, setRecentOffers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecentOffers();
    }
  }, [user]);

  const fetchRecentOffers = async () => {
    setIsLoading(true);
    try {
      // Fetch recent offers from saved_offers table
      const { data: offers, error: offersError } = await supabase
        .from('saved_offers')
        .select('id, created_at, offer_data')
        .order('created_at', { ascending: false })
        .limit(5);

      if (offersError) throw offersError;
      
      // Transform the offers data to include the required display fields
      const transformedOffers = offers?.map(offer => {
        // Cast offer_data to Offer type after parsing it (if it's a string)
        const offerData = typeof offer.offer_data === 'string' 
          ? JSON.parse(offer.offer_data) as Offer
          : offer.offer_data as unknown as Offer;

        return {
          id: offer.id,
          created_at: offer.created_at,
          client_name: offerData.client?.name || 'Unknown Client',
          offer_number: offerData.details?.offerNumber || `#${offer.id.slice(0, 8)}`,
          total_amount: offerData.details?.includeVat && offerData.products && offerData.details?.vatRate
            ? (offerData.products || []).reduce((sum, p) => sum + (p.quantity * p.unitPrice * (1 + offerData.details.vatRate / 100)), 0) 
            : (offerData.products || []).reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0)
        };
      }) || [];
      
      setRecentOffers(transformedOffers);
    } catch (error) {
      console.error('Error fetching recent offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.common.dashboard}
        </h1>
      </div>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t.home.quickActions}</h2>
        <div className="flex justify-center">
          <QuickActionCards />
        </div>
      </section>
      
      <section className="mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>{t.savedOffers.recentOffers}</span>
              <Link 
                to="/saved-offers" 
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>{t.common.viewAll}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-4">
                <div className="animate-pulse space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            ) : recentOffers.length > 0 ? (
              <ul className="divide-y">
                {recentOffers.map((offer) => (
                  <li key={offer.id} className="py-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{offer.client_name}</span>
                      <span className="text-gray-500">{new Date(offer.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.offer_number}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t.home.noRecentOffers}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomeContent;
