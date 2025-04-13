
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { XIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BundledProduct } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';

interface BundleManagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bundleProducts: BundledProduct[];
  newBundleProduct: Partial<BundledProduct>;
  setNewBundleProduct: (product: Partial<BundledProduct>) => void;
  addBundleProduct: () => void;
  removeBundleProduct: (id: string) => void;
  saveBundleProducts: () => void;
}

const BundleManagementDialog: React.FC<BundleManagementDialogProps> = ({
  open,
  onOpenChange,
  bundleProducts,
  newBundleProduct,
  setNewBundleProduct,
  addBundleProduct,
  removeBundleProduct,
  saveBundleProducts
}) => {
  const { language, currency, t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={saveBundleProducts}>Save Bundle</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BundleManagementDialog;
