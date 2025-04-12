
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import SavedClientsList from '@/components/management/clients/SavedClientsList';
import ClientSearch from '@/components/management/clients/ClientSearch';
import ClientFormDialog from '@/components/management/clients/ClientFormDialog';
import ClientPageHeader from '@/components/management/clients/ClientPageHeader';
import { useClientsManagement } from '@/components/management/clients/hooks/useClientsManagement';

const SavedClientsPage = () => {
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

export default SavedClientsPage;
