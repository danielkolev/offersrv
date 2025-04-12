
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import QuickActionCards from '@/components/home/QuickActionCards';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeContent = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

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
        <QuickActionCards />
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
            <div className="text-center py-8 text-gray-500">
              {t.home.noRecentOffers}
            </div>
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
            <div className="text-center py-8 text-gray-500">
              {t.home.noRecentClients}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomeContent;
