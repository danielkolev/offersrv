
import { useState } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Product, BundledProduct } from '@/types/offer';
import { v4 as uuidv4 } from 'uuid';
import { useProductUnits } from '@/hooks/use-product-units';

export function useProductForm() {
  const { offer, addProduct, updateProduct, removeProduct } = useOffer();
  const { defaultUnit } = useProductUnits();
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

  const handleAddProduct = (isBundle: boolean = false) => {
    addProduct({
      name: '',
      description: '',
      partNumber: '',
      quantity: 1,
      unitPrice: 0,
      unit: defaultUnit, // Using the default unit from the hook
      isBundle: isBundle,
      bundledProducts: isBundle ? [] : undefined,
      showBundledPrices: true // Default to showing bundled prices
    });
  };

  // Function to handle adding an existing product directly
  const addExistingProduct = (product: Omit<Product, 'id'>) => {
    // Ensure the product has the default unit if none is specified
    const productToAdd = {
      ...product,
      unit: product.unit || defaultUnit
    };
    // Add the product directly without modification
    addProduct(productToAdd);
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
        id: uuidv4(),
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

  return {
    products: offer.products,
    showPartNumber: offer.details.showPartNumber,
    bundleDialogOpen,
    setBundleDialogOpen,
    selectedProductId,
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
  };
}
