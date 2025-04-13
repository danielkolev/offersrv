
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { useProductUnits } from '@/hooks/use-product-units';

interface ProductItemProps {
  product: Product;
  index: number;
  showPartNumber: boolean;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  openBundleDialog: (productId: string) => void;
  validateProductName: (name: string) => boolean;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  index,
  showPartNumber,
  updateProduct,
  removeProduct,
  openBundleDialog,
  validateProductName
}) => {
  const { language, currency, t } = useLanguage();
  const { units, getLocalizedUnitName, defaultUnit } = useProductUnits();

  return (
    <div className="mb-6 relative rounded-lg border p-4 bg-gray-50">
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
          <Label htmlFor={`product-name-${index}`} className="flex items-center">
            {t.products.productName}
            <span className="text-destructive ml-1">*</span>
          </Label>
          <Input
            id={`product-name-${index}`}
            value={product.name}
            onChange={(e) => updateProduct(product.id, { name: e.target.value })}
            placeholder={t.products.productName}
            className={!validateProductName(product.name) ? "border-destructive" : ""}
          />
          {!validateProductName(product.name) && (
            <p className="text-sm text-destructive">{t.common.required}</p>
          )}
        </div>
        
        {showPartNumber && (
          <div className="space-y-2">
            <Label htmlFor={`product-part-${index}`}>{t.products.partNumber}</Label>
            <Input
              id={`product-part-${index}`}
              value={product.partNumber || ''}
              onChange={(e) => updateProduct(product.id, { partNumber: e.target.value })}
              placeholder={t.products.partNo}
            />
          </div>
        )}
        
        <div className={`space-y-2 ${showPartNumber ? 'md:col-span-2' : 'md:col-span-1'}`}>
          <Label htmlFor={`product-desc-${index}`}>{t.products.description}</Label>
          <Textarea
            id={`product-desc-${index}`}
            value={product.description || ''}
            onChange={(e) => updateProduct(product.id, { description: e.target.value })}
            placeholder={t.products.description}
            rows={2}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`product-quantity-${index}`}>{t.products.quantity}</Label>
          <div className="flex gap-2">
            <Input
              id={`product-quantity-${index}`}
              type="number"
              min="1"
              value={product.quantity}
              onChange={(e) => updateProduct(product.id, { quantity: parseInt(e.target.value) || 0 })}
            />
            
            <div className="w-[120px]">
              <Label htmlFor={`product-unit-${index}`} className="text-xs mb-1 block">
                {language === 'bg' ? 'Мярка' : 'Unit'}
              </Label>
              <Select
                value={product.unit || defaultUnit}
                onValueChange={(value) => updateProduct(product.id, { unit: value })}
              >
                <SelectTrigger id={`product-unit-${index}`} className="w-full" placeholder={t.products.unitPlaceholder}>
                  <SelectValue placeholder={t.products.unitPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {units.map(unit => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {language === 'bg' ? unit.name : unit.name_en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
            disabled={product.isBundle}
          />
        </div>
      </div>
      
      {product.isBundle && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => openBundleDialog(product.id)}
              className="flex-grow"
            >
              Manage Bundle Items ({product.bundledProducts?.length || 0} {t.products.items})
            </Button>
            
            <div className="flex items-center space-x-2 ml-4">
              <Checkbox 
                id={`show-bundle-prices-${index}`}
                checked={product.showBundledPrices}
                onCheckedChange={(checked) => 
                  updateProduct(product.id, { showBundledPrices: !!checked })
                }
              />
              <Label 
                htmlFor={`show-bundle-prices-${index}`}
                className="text-sm cursor-pointer"
              >
                Show bundled item prices
              </Label>
            </div>
          </div>
          
          {product.bundledProducts && product.bundledProducts.length > 0 && (
            <div className="mt-2 border rounded-md p-2 bg-slate-50">
              <p className="text-sm font-medium mb-1">Included items:</p>
              <ul className="text-sm">
                {product.bundledProducts.map(item => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatCurrency(item.unitPrice * item.quantity, language, currency)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      <div className="text-right text-sm text-muted-foreground mt-2">
        {t.products.total}: {formatCurrency(product.quantity * product.unitPrice, language, currency)}
        {/* Only show unit if it's not the default 'none' unit and not a bundle */}
        {product.unit && product.unit !== 'none' && !product.isBundle && (
          <span className="ml-1">({product.quantity} {getLocalizedUnitName(product.unit)})</span>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
