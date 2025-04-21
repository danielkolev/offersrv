
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ProductSearch from '@/components/management/products/ProductSearch';
import SavedProductsList from '@/components/management/products/SavedProductsList';
import ProductPageHeader from '@/components/management/products/ProductPageHeader';
import ProductFormDialog from '@/components/management/products/ProductFormDialog';
import { useProductsManagement } from '@/components/management/products/hooks/useProductsManagement';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
    <div className="flex-1 p-6">
      <div className="container pt-0 pb-4">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">{t.navigation.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{t.navigation.products}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ProductPageHeader t={t} onAddProduct={handleOpenAddDialog} />
      <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchType={searchType} setSearchType={setSearchType} />
      <div className="mb-8">
        <SavedProductsList products={products} filteredProducts={filteredProducts} isLoading={isLoading} onSelectProduct={handleSelectProduct} onDeleteProduct={handleDeleteProduct} onEditProduct={handleEditProduct} />
      </div>
      <ProductFormDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onSubmit={handleSaveProduct} product={currentProduct} isSubmitting={isSaving} isEditMode={isEditMode} t={t} />
    </div>
  );
};
export default SavedProductsPage;
