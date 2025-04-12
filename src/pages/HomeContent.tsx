
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import QuickActionCards from '@/components/home/QuickActionCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const HomeContent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [recentOffers, setRecentOffers] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecentItems();
    }
  }, [user]);

  const fetchRecentItems = async () => {
    setIsLoading(true);
    try {
      // Fetch recent offers (adjust table name as needed)
      const { data: offers, error: offersError } = await supabase
        .from('offers')
        .select('id, client_name, offer_number, created_at, total_amount')
        .order('created_at', { ascending: false })
        .limit(5);

      if (offersError) throw offersError;
      setRecentOffers(offers || []);

      // Fetch recent clients (adjust table name as needed)
      const { data: clients, error: clientsError } = await supabase
        .from('clients')
        .select('id, name, email, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (clientsError) throw clientsError;
      setRecentClients(clients || []);
    } catch (error) {
      console.error('Error fetching recent items:', error);
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
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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
                      <span className="font-medium">{offer.client_name || 'Client'}</span>
                      <span className="text-gray-500">{new Date(offer.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.offer_number || `Offer #${offer.id.slice(0, 8)}`}
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
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>{t.savedClients.recentClients}</span>
              <Link 
                to="/saved-clients" 
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
            ) : recentClients.length > 0 ? (
              <ul className="divide-y">
                {recentClients.map((client) => (
                  <li key={client.id} className="py-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{client.name || 'Unknown'}</span>
                      <span className="text-gray-500">{new Date(client.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {client.email || 'No email'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {t.home.noRecentClients}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomeContent;
