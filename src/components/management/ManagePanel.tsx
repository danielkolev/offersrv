
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Save, Users, ShoppingCart } from 'lucide-react';

const ManagePanel = () => {
  const { t } = useLanguage();

  return (
    <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Link to="/saved-offers">
        <Button variant="outline" className="w-full gap-2">
          <Save className="h-4 w-4" />
          {t.savedOffers.title}
        </Button>
      </Link>
      
      <Link to="/saved-clients">
        <Button variant="outline" className="w-full gap-2">
          <Users className="h-4 w-4" />
          {t.savedClients.title}
        </Button>
      </Link>
      
      <Link to="/saved-products">
        <Button variant="outline" className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          {t.savedProducts.title}
        </Button>
      </Link>
    </div>
  );
};

export default ManagePanel;
