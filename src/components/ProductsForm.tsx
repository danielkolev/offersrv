
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon, Plus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';

const ProductsForm = () => {
  const { offer, addProduct, updateProduct, removeProduct } = useOffer();
  const { t } = useLanguage();

  const handleAddProduct = () => {
    addProduct({
      name: 'New Product',
      description: 'Product description',
      partNumber: '',
      quantity: 1,
      unitPrice: 0
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.products.title}</CardTitle>
        <Button onClick={handleAddProduct} variant="outline" className="gap-2">
          <Plus size={16} /> {t.products.addProduct}
        </Button>
      </CardHeader>
      <CardContent>
        {offer.products.map((product, index) => (
          <div key={product.id} className="mb-6 relative rounded-lg border p-4">
            <div className="absolute right-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeProduct(product.id)}
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
              >
                <XIcon size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div className="space-y-2">
                <Label htmlFor={`product-name-${index}`}>{t.products.productName}</Label>
                <Input
                  id={`product-name-${index}`}
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, { name: e.target.value })}
                />
              </div>
              
              {offer.details.showPartNumber && (
                <div className="space-y-2">
                  <Label htmlFor={`product-part-${index}`}>{t.products.partNumber}</Label>
                  <Input
                    id={`product-part-${index}`}
                    value={product.partNumber || ''}
                    onChange={(e) => updateProduct(product.id, { partNumber: e.target.value })}
                  />
                </div>
              )}
              
              <div className={`space-y-2 ${offer.details.showPartNumber ? 'md:col-span-2' : 'md:col-span-1'}`}>
                <Label htmlFor={`product-desc-${index}`}>{t.products.description}</Label>
                <Textarea
                  id={`product-desc-${index}`}
                  value={product.description}
                  onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`product-quantity-${index}`}>{t.products.quantity}</Label>
                <Input
                  id={`product-quantity-${index}`}
                  type="number"
                  min="1"
                  value={product.quantity}
                  onChange={(e) => updateProduct(product.id, { quantity: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor={`product-price-${index}`}>{t.products.unitPrice}</Label>
                <Input
                  id={`product-price-${index}`}
                  type="number"
                  min="0"
                  step="0.01"
                  value={product.unitPrice}
                  onChange={(e) => updateProduct(product.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div className="text-right text-sm text-muted-foreground mt-2">
              {t.products.total}: {formatCurrency(product.quantity * product.unitPrice)}
            </div>
          </div>
        ))}
        
        {offer.products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {t.products.noProducts}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsForm;
