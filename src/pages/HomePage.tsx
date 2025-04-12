
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus, Users, Package, FileText } from 'lucide-react';

const HomePage = () => {
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
    <div className="flex-1 space-y-8 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.common.home}
        </h1>
      </div>
      
      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t.offer.createOffer}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new offer for your clients with products and services.
            </p>
            <Button asChild className="w-full gap-2">
              <Link to="/">
                <Plus className="h-4 w-4" />
                <span>{t.offer.createOffer}</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t.savedClients.addNewClient}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add a new client to your database for future offers.
            </p>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to="/saved-clients">
                <Users className="h-4 w-4" />
                <span>{t.savedClients.addNewClient}</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{t.savedProducts.addProduct}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Create new products or services to include in your offers.
            </p>
            <Button asChild variant="outline" className="w-full gap-2">
              <Link to="/saved-products">
                <Package className="h-4 w-4" />
                <span>{t.savedProducts.addProduct}</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Offers Section */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>You'll see your most recent offers here once you create them.</p>
              <Button asChild variant="link" className="mt-2">
                <Link to="/saved-offers">View all offers</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Analytics Section - Placeholder */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <p>Analytics dashboard coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
