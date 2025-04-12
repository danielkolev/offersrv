
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import ProductSearch from '@/components/management/products/ProductSearch';
import SavedProductsList from '@/components/management/products/SavedProductsList';
import ProductPageHeader from '@/components/management/products/ProductPageHeader';
import ProductFormDialog from '@/components/management/products/ProductFormDialog';
import { useProductsManagement } from '@/components/management/products/hooks/useProductsManagement';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SavedProductsPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const lastOfferPath = localStorage.getItem('lastOfferPath') || '/new-offer';
  
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

  const handleBackToOffer = () => {
    navigate(lastOfferPath);
  };

  return (
    <div className="flex-1 p-6">
      <ProductPageHeader 
        t={t} 
        onAddProduct={handleOpenAddDialog} 
        onSaveFromOffer={handleSaveFromOffer} 
      />
      
      <div className="mb-4">
        <Button
          variant="outline"
          onClick={handleBackToOffer}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.savedProducts.backToOffer}
        </Button>
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

export default SavedProductsPage;
