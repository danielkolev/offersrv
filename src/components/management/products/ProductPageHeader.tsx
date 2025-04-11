
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Translations } from '@/types/language';

interface ProductPageHeaderProps {
  t: Translations;
  onAddProduct: () => void;
  onSaveFromOffer: () => void;
}

const ProductPageHeader = ({ t, onAddProduct, onSaveFromOffer }: ProductPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.savedProducts.title}</h1>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onSaveFromOffer} 
          variant="outline"
          className="gap-2"
        >
          <Save className="h-4 w-4" />
          {t.savedProducts.saveFromOffer}
        </Button>
        
        <Button 
          onClick={onAddProduct} 
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {t.savedProducts.addProduct}
        </Button>
      </div>
    </div>
  );
};

export default ProductPageHeader;
