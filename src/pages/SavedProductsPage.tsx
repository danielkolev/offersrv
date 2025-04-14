
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import ProductSearch from '@/components/management/products/ProductSearch';
import SavedProductsList from '@/components/management/products/SavedProductsList';
import ProductPageHeader from '@/components/management/products/ProductPageHeader';
import ProductFormDialog from '@/components/management/products/ProductFormDialog';
import { useProductsManagement } from '@/components/management/products/hooks/useProductsManagement';
import BackButton from '@/components/navigation/BackButton';
import { OfferProvider } from '@/context/offer';

const SavedProductsContent = () => {
  const { t } = useLanguage();
  
  const {
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
    handleDeleteProduct,
    handleSelectProduct
  } = useProductsManagement(t);

  return (
    <div className="flex-1 p-6">
      <ProductPageHeader 
        t={t} 
        onAddProduct={handleOpenAddDialog} 
        // Removed onSaveFromOffer prop to hide the button 
      />
      
      <div className="mb-4">
        <BackButton label={t.common.back} />
      </div>
      
      <ProductSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
      />
      
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">{t.savedProducts.title}</h2>
        <SavedProductsList
          products={products}
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          onSelectProduct={handleSelectProduct}
          onDeleteProduct={handleDeleteProduct}
          onEditProduct={handleEditProduct}
        />
      </div>
      
      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSaveProduct}
        product={currentProduct}
        isSubmitting={isSaving}
        isEditMode={isEditMode}
        t={t}
      />
    </div>
  );
};

// This is the main component that wraps the content with OfferProvider
const SavedProductsPage = () => {
  return (
    <OfferProvider>
      <SavedProductsContent />
    </OfferProvider>
  );
};

export default SavedProductsPage;
