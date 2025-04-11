
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedProduct } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductSearch from '@/components/management/products/ProductSearch';
import CurrentProductsList from '@/components/management/products/CurrentProductsList';
import SavedProductsList from '@/components/management/products/SavedProductsList';
import { fetchSavedProducts, saveProduct, deleteProduct, convertToOfferProduct } from '@/components/management/products/productsService';

const SavedProductsPage = () => {
  const { user } = useAuth();
  const { offer, addProduct } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'partNumber'>('name');

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

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
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{t.savedProducts.title}</h1>
        </div>
      </div>
      
      <ProductSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Current Products</h2>
        <CurrentProductsList
          products={offer.products}
          onSaveProduct={handleSaveProduct}
          isSaving={isSaving}
        />
      </div>
      
      <SavedProductsList
        products={products}
        filteredProducts={filteredProducts}
        isLoading={isLoading}
        onSelectProduct={handleSelectProduct}
        onDeleteProduct={handleDeleteProduct}
      />
    </div>
  );
};

export default SavedProductsPage;
