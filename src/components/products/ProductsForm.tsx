import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, PackageOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import ProductSelector from '../product-selector/ProductSelector';
import { useProductForm } from '@/hooks/use-product-form';
import ProductItem from './ProductItem';
import BundleManagementDialog from './BundleManagementDialog';
import { ProductsProvider } from '@/context/products/ProductsContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductsForm = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const {
    products,
    showPartNumber,
    bundleDialogOpen,
    setBundleDialogOpen,
    bundleProducts,
    newBundleProduct,
    setNewBundleProduct,
    handleAddProduct,
    addExistingProduct,
    updateProduct,
    removeProduct,
    openBundleDialog,
    addBundleProduct,
    removeBundleProduct,
    saveBundleProducts,
    validateProductName
  } = useProductForm();

  return (
    <Card className="mb-6 bg-gray-50">
      <CardHeader className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <CardTitle>{t.products.title}</CardTitle>
        </div>
        <div className={`flex gap-2 ${isMobile ? 'flex-col w-full' : ''}`}>
          <ProductsProvider products={products}>
            <ProductSelector onAddProduct={addExistingProduct} />
          </ProductsProvider>
          <Button 
            onClick={() => handleAddProduct(true)} 
            variant="outline" 
            className="gap-2"
            size={isMobile ? "sm" : "default"}
          >
            <PackageOpen size={16} />
            {language === 'bg' ? 'Добави комплект' : 'Add Bundle'}
          </Button>
          <Button 
            onClick={() => handleAddProduct()} 
            variant="outline" 
            className="gap-2"
            size={isMobile ? "sm" : "default"}
          >
            <Plus size={16} />
            {language === 'bg' ? 'Нов продукт' : 'New Product'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            showPartNumber={showPartNumber}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
            openBundleDialog={openBundleDialog}
            validateProductName={validateProductName}
          />
        ))}
        
        {products.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {t.products.noProducts}
          </div>
        )}
        
        <BundleManagementDialog
          open={bundleDialogOpen}
          onOpenChange={setBundleDialogOpen}
          bundleProducts={bundleProducts}
          newBundleProduct={newBundleProduct}
          setNewBundleProduct={setNewBundleProduct}
          addBundleProduct={addBundleProduct}
          removeBundleProduct={removeBundleProduct}
          saveBundleProducts={saveBundleProducts}
        />
      </CardContent>
    </Card>
  );
};

export default ProductsForm;
