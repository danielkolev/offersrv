
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { OfferProvider } from '@/context/offer/OfferContext';
import SavedClientsList from '@/components/management/clients/SavedClientsList';
import ClientSearch from '@/components/management/clients/ClientSearch';
import ClientFormDialog from '@/components/management/clients/ClientFormDialog';
import ClientPageHeader from '@/components/management/clients/ClientPageHeader';
import { useClientsManagement } from '@/components/management/clients/hooks/useClientsManagement';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const SavedClientsContent = () => {
  const { t } = useLanguage();
  const {
    filteredClients,
    isLoading,
    isSaving,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    isDialogOpen,
    setIsDialogOpen,
    currentClient,
    isEditMode,
    clients,
    handleOpenAddDialog,
    handleEditClient,
    handleSaveClient,
    handleImportFromOffer,
    deleteClient,
    selectClient
  } = useClientsManagement(t);

  return (
    <div className="p-6">
      <ClientPageHeader 
        t={t} 
        onAddClient={handleOpenAddDialog} 
        onImportFromOffer={handleImportFromOffer} 
      />
      <ClientSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        t={t}
      />
      <SavedClientsList 
        clients={clients}
        filteredClients={filteredClients}
        isLoading={isLoading}
        selectClient={selectClient}
        deleteClient={deleteClient}
        editClient={handleEditClient}
        t={t}
      />
      <ClientFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSaveClient}
        client={currentClient}
        isSubmitting={isSaving}
        isEditMode={isEditMode}
        t={t}
      />
    </div>
  );
};

// Main component that wraps the content with OfferProvider
const SavedClientsPage = () => {
  const { t } = useLanguage();
  return (
    <>
      <div className="container pt-6 pb-0">
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
              <BreadcrumbPage>{t.navigation.clients}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <OfferProvider>
        <SavedClientsContent />
      </OfferProvider>
    </>
  );
};

export default SavedClientsPage;
