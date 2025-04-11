
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductSearch from '@/components/management/products/ProductSearch';
import CurrentProductsList from '@/components/management/products/CurrentProductsList';
import SavedProductsList from '@/components/management/products/SavedProductsList';
import ProductPageHeader from '@/components/management/products/ProductPageHeader';
import ProductFormDialog from '@/components/management/products/ProductFormDialog';
import { useProductsManagement } from '@/components/management/products/hooks/useProductsManagement';

const SavedProductsPage = () => {
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
    handleSaveFromOffer,
    handleDeleteProduct,
    handleSelectProduct
  } = useProductsManagement(t);

  return (
    <div className="container mx-auto py-8 px-4">
      <ProductPageHeader 
        t={t} 
        onAddProduct={handleOpenAddDialog} 
        onSaveFromOffer={handleSaveFromOffer} 
      />
      
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

export default SavedProductsPage;
