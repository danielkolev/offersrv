
import { useClientsFetching } from './useClientsFetching';
import { useClientOperations } from './useClientOperations';
import { useClientSearch } from './useClientSearch';
import { useClientDialog } from './useClientDialog';
import { useClientSelection } from './useClientSelection';
import { Translations } from '@/types/language';

export const useClientsManagement = (t: Translations) => {
  // Use the smaller hooks
  const {
    clients,
    setClients,
    isLoading,
    fetchClientsList
  } = useClientsFetching(t);
  
  const { 
    searchTerm, 
    setSearchTerm, 
    searchType, 
    setSearchType,
    filteredClients
  } = useClientSearch({ clients });
  
  const {
    isDialogOpen,
    setIsDialogOpen,
    currentClient,
    isEditMode,
    handleOpenAddDialog,
    handleEditClient
  } = useClientDialog();

  const {
    isSaving,
    handleSaveClient,
    deleteClient
  } = useClientOperations(t, clients, setClients, setIsDialogOpen);

  const {
    selectClient,
    handleImportFromOffer
  } = useClientSelection(t, clients, handleEditClient, handleOpenAddDialog);

  // Create a wrapper function to maintain the same API
  const handleSaveClientWrapper = async (formData: any) => {
    await handleSaveClient(formData, isEditMode, currentClient);
  };

  return {
    clients,
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
    handleOpenAddDialog,
    handleEditClient,
    handleSaveClient: handleSaveClientWrapper,
    handleImportFromOffer,
    deleteClient,
    selectClient
  };
};
