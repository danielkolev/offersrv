
import React from 'react';
import { Product } from '@/types/offer';
import { Button } from '@/components/ui/button';
import { Loader2, Save } from 'lucide-react';

interface CurrentProductsListProps {
  products: Product[];
  onSaveProduct: (product: Product) => void;
  isSaving: boolean;
}

const CurrentProductsList = ({ products, onSaveProduct, isSaving }: CurrentProductsListProps) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 mb-4 bg-slate-50">
      <h3 className="font-medium mb-2">Current offer products</h3>
      <div className="grid gap-2">
        {products.map(product => (
          <div key={product.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{product.name}</div>
              {product.partNumber && <div className="text-sm text-muted-foreground">{product.partNumber}</div>}
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onSaveProduct(product)}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentProductsList;
