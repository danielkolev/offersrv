import React, { useState } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { XIcon, Plus, PackageOpen } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from "@/components/ui/checkbox";
import { BundledProduct } from '@/types/offer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import ProductSelector from './product-selector/ProductSelector';
import { useProductUnits } from '@/hooks/use-product-units';

const ProductsForm = () => {
  const { offer, addProduct, updateProduct, removeProduct } = useOffer();
  const { language, currency, t } = useLanguage();
  const [bundleDialogOpen, setBundleDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [bundleProducts, setBundleProducts] = useState<BundledProduct[]>([]);
  const [newBundleProduct, setNewBundleProduct] = useState<Partial<BundledProduct>>({
    name: '',
    description: '',
    partNumber: '',
    quantity: 1,
    unitPrice: 0
  });
  
  // Use the custom product units hook instead of hardcoded units
  const { units, getLocalizedUnitName, defaultUnit } = useProductUnits();

  const handleAddProduct = (isBundle: boolean = false) => {
    addProduct({
      name: '',
      description: '',
      partNumber: '',
      quantity: 1,
      unitPrice: 0,
      unit: defaultUnit, // Use the default unit from the hook
      isBundle: isBundle,
      bundledProducts: isBundle ? [] : undefined,
      showBundledPrices: true // Default to showing bundled prices
    });
  };

  const openBundleDialog = (productId: string) => {
    setSelectedProductId(productId);
    const product = offer.products.find(p => p.id === productId);
    if (product && product.bundledProducts) {
      setBundleProducts([...product.bundledProducts]);
    } else {
      setBundleProducts([]);
    }
    setBundleDialogOpen(true);
  };

  const addBundleProduct = () => {
    if (newBundleProduct.name && newBundleProduct.quantity && newBundleProduct.unitPrice) {
      const bundleProduct: BundledProduct = {
        id: crypto.randomUUID(),
        name: newBundleProduct.name || '',
        description: newBundleProduct.description,
        partNumber: newBundleProduct.partNumber,
        quantity: newBundleProduct.quantity || 1,
        unitPrice: newBundleProduct.unitPrice || 0
      };
      
      setBundleProducts([...bundleProducts, bundleProduct]);
      
      // Reset form
      setNewBundleProduct({
        name: '',
        description: '',
        partNumber: '',
        quantity: 1,
        unitPrice: 0
      });
    }
  };

  const removeBundleProduct = (id: string) => {
    setBundleProducts(bundleProducts.filter(p => p.id !== id));
  };

  const saveBundleProducts = () => {
    if (selectedProductId) {
      const totalBundlePrice = bundleProducts.reduce((sum, product) => 
        sum + (product.quantity * product.unitPrice), 0);
        
      updateProduct(selectedProductId, { 
        bundledProducts: bundleProducts,
        unitPrice: totalBundlePrice
      });
      
      setBundleDialogOpen(false);
    }
  };

  // Validate product name is not empty
  const validateProductName = (name: string) => {
    return name.trim() !== '';
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.products.title}</CardTitle>
        <div className="flex gap-2">
          <ProductSelector onSelectProduct={addProduct} buttonText={t.products.selectExisting} />
          <Button onClick={() => handleAddProduct(true)} variant="outline" className="gap-2">
            <PackageOpen size={16} /> Add Bundle
          </Button>
          <Button onClick={() => handleAddProduct()} variant="outline" className="gap-2">
            <Plus size={16} /> {t.products.addProduct}
          </Button>
        </div>
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
              
              {offer.details.showPartNumber && (
                <div className="space-y-2">
                  <Label htmlFor={`product-part-${index}`}>{t.products.partNumber}</Label>
                  <Input
                    id={`product-part-${index}`}
                    value={product.partNumber || ''}
                    onChange={(e) => updateProduct(product.id, { partNumber: e.target.value })}
                    placeholder={t.products.partNumber}
                  />
                </div>
              )}
              
              <div className={`space-y-2 ${offer.details.showPartNumber ? 'md:col-span-2' : 'md:col-span-1'}`}>
                <Label htmlFor={`product-desc-${index}`}>{t.products.description}</Label>
                <Textarea
                  id={`product-desc-${index}`}
                  value={product.description}
                  onChange={(e) => updateProduct(product.id, { description: e.target.value })}
                  placeholder={t.common.description}
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
                  
                  <Select
                    value={product.unit || defaultUnit}
                    onValueChange={(value) => updateProduct(product.id, { unit: value })}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder={t.products.unit} />
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
                    Manage Bundle Items ({product.bundledProducts?.length || 0} items)
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
              {product.unit && product.unit !== 'none' && !product.isBundle && (
                <span className="ml-1">({product.quantity} {getLocalizedUnitName(product.unit)})</span>
              )}
            </div>
          </div>
        ))}
        
        {offer.products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {t.products.noProducts}
          </div>
        )}
      </CardContent>
      
      {/* Bundle Management Dialog */}
      <Dialog open={bundleDialogOpen} onOpenChange={setBundleDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Manage Bundle Items</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Add Item to Bundle</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <Label htmlFor="bundle-item-name">Name</Label>
                  <Input
                    id="bundle-item-name"
                    value={newBundleProduct.name}
                    onChange={(e) => setNewBundleProduct({...newBundleProduct, name: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bundle-item-qty">Quantity</Label>
                  <Input
                    id="bundle-item-qty"
                    type="number"
                    min="1"
                    value={newBundleProduct.quantity}
                    onChange={(e) => setNewBundleProduct({...newBundleProduct, quantity: parseInt(e.target.value) || 1})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="bundle-item-price">Price</Label>
                  <Input
                    id="bundle-item-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newBundleProduct.unitPrice}
                    onChange={(e) => setNewBundleProduct({...newBundleProduct, unitPrice: parseFloat(e.target.value) || 0})}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button onClick={addBundleProduct} className="w-full">Add Item</Button>
                </div>
              </div>
            </div>
            
            {bundleProducts.length > 0 ? (
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Bundle Items</h3>
                <div className="space-y-2">
                  {bundleProducts.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {formatCurrency(item.unitPrice, language, currency)}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm font-medium">
                          {formatCurrency(item.quantity * item.unitPrice, language, currency)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBundleProduct(item.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-4 pt-2 border-t">
                  <span className="font-medium">Total Bundle Price:</span>
                  <span className="font-bold">
                    {formatCurrency(
                      bundleProducts.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0),
                      language, 
                      currency
                    )}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 border rounded-md">
                <p className="text-muted-foreground">No items in this bundle yet.</p>
                <p className="text-sm">Add items above to create your bundle.</p>
              </div>
            )}
            
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setBundleDialogOpen(false)}>Cancel</Button>
              <Button onClick={saveBundleProducts}>Save Bundle</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductsForm;
