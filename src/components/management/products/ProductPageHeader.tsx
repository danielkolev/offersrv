
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Save } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';
import { Translations } from '@/types/language';

interface ProductPageHeaderProps {
  t: Translations;
  onAddProduct: () => void;
  onSaveFromOffer?: () => void;
}

const ProductPageHeader = ({ t, onAddProduct, onSaveFromOffer }: ProductPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <BackButton label={t.common.back} />
        <h1 className="text-2xl font-bold">{t.savedProducts.title}</h1>
      </div>
      
      <div className="flex gap-2">
        {onSaveFromOffer && (
          <Button 
            onClick={onSaveFromOffer} 
            variant="outline"
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            {t.savedProducts.saveFromOffer}
          </Button>
        )}
        
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
