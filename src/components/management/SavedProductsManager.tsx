
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedProduct } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import SavedProductsDialog from './products/SavedProductsDialog';
import SavedProductsList from './products/SavedProductsList';
import ProductSearch from './products/ProductSearch';
import CurrentProductsList from './products/CurrentProductsList';
import { fetchSavedProducts, saveProduct, deleteProduct, convertToOfferProduct } from './products/productsService';

const SavedProductsManager = () => {
  const { user } = useAuth();
  const { offer, addProduct } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'partNumber'>('name');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && open) {
      fetchProducts();
    }
  }, [user, open]);

  const fetchProducts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await fetchSavedProducts(user.id);
      setProducts(data);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProduct = async (product: any) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated || "You need to be logged in",
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const savedProduct = await saveProduct(user.id, product);
      setProducts(prev => [...prev, savedProduct].sort((a, b) => a.name.localeCompare(b.name)));
      toast({
        title: t.common.success,
        description: 'Product saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: t.common.success,
        description: 'Product deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleSelectProduct = (savedProduct: SavedProduct) => {
    const product = convertToOfferProduct(savedProduct);
    addProduct(product);
    setOpen(false);
    
    toast({
      title: t.common.success,
      description: 'Product added to offer',
    });
  };

  const filteredProducts = products.filter(product => {
    if (searchType === 'name') {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return product.part_number?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <SavedProductsDialog
      open={open}
      setOpen={setOpen}
      title={t.savedProducts.title}
      closeLabel={t.common.close}
    >
      <div className="mb-4">
        <ProductSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
        />
        
        <CurrentProductsList
          products={offer.products}
          onSaveProduct={handleSaveProduct}
          isSaving={isSaving}
        />
        
        <SavedProductsList
          products={products}
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          onSelectProduct={handleSelectProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </SavedProductsDialog>
  );
};

export default SavedProductsManager;
