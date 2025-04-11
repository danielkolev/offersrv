
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { Translations } from '@/types/language';
import { SavedProduct } from '@/types/database';
import { Product } from '@/types/offer';
import { 
  fetchSavedProducts, 
  saveProduct, 
  updateProduct,
  deleteProduct, 
  convertToOfferProduct 
} from '@/components/management/products/productsService';
import { v4 as uuidv4 } from 'uuid';

export const useProductsManagement = (t: Translations) => {
  const { user } = useAuth();
  const { offer, addProduct } = useOffer();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'partNumber'>('name');
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<SavedProduct> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleOpenAddDialog = () => {
    setCurrentProduct({
      name: '',
      description: '',
      part_number: '',
      unit_price: 0
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: SavedProduct) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = async (product: Partial<SavedProduct>) => {
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
      let savedProduct;
      
      if (isEditMode && product.id) {
        // Update existing product
        savedProduct = await updateProduct(product.id, {
          name: product.name || '',
          description: product.description || null,
          part_number: product.part_number || null,
          unit_price: product.unit_price || 0
        });
        
        setProducts(prev => 
          prev.map(p => p.id === savedProduct.id ? savedProduct : p)
            .sort((a, b) => a.name.localeCompare(b.name))
        );
        
        toast({
          title: t.common.success,
          description: 'Product updated successfully',
        });
      } else {
        // Create new product
        // Adding temporary id with uuid as it's used by convertToOfferProduct later
        const tempProductForSaving: Omit<Product, 'id'> & { id?: string } = {
          id: uuidv4(), // Generate a temporary ID
          name: product.name || '',
          description: product.description || undefined,
          partNumber: product.part_number || undefined,
          quantity: 1,
          unitPrice: product.unit_price || 0
        };
        
        savedProduct = await saveProduct(user.id, tempProductForSaving);
        
        setProducts(prev => 
          [...prev, savedProduct].sort((a, b) => a.name.localeCompare(b.name))
        );
        
        toast({
          title: t.common.success,
          description: 'Product saved successfully',
        });
      }
      
      setIsDialogOpen(false);
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

  const handleSaveFromOffer = () => {
    if (offer.products.length === 0) {
      toast({
        title: t.common.error,
        description: 'No products in current offer to save',
        variant: 'destructive',
      });
      return;
    }
    
    // Open dialog with data from the first product in the offer
    const productToSave = offer.products[0];
    setCurrentProduct({
      name: productToSave.name,
      description: productToSave.description || '',
      part_number: productToSave.partNumber || '',
      unit_price: productToSave.unitPrice
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
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

  return {
    products,
    filteredProducts,
    isLoading,
    isSaving,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    isDialogOpen,
    setIsDialogOpen,
    currentProduct,
    isEditMode,
    handleOpenAddDialog,
    handleEditProduct,
    handleSaveProduct,
    handleSaveFromOffer,
    handleDeleteProduct,
    handleSelectProduct
  };
};
