
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';
import { ClientFormData } from '../ClientFormDialog';
import { 
  fetchClients, 
  saveClient, 
  updateClient, 
  deleteClient as deleteClientService 
} from '../clientsService';
import { useClientSearch } from './useClientSearch';
import { useClientDialog } from './useClientDialog';
import { Translations } from '@/types/language';

export const useClientsManagement = (t: Translations) => {
  const { user } = useAuth();
  const { offer, updateClientInfo } = useOffer();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Use the smaller hooks
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

  useEffect(() => {
    if (user) {
      fetchClientsList();
    }
  }, [user]);

  const fetchClientsList = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveClient = async (formData: ClientFormData) => {
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
      if (isEditMode && currentClient) {
        // Update client
        await updateClient(currentClient.id, {
          name: formData.name,
          contactPerson: formData.contactPerson,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          vatNumber: formData.vatNumber,
          email: formData.email,
          phone: formData.phone,
        });
        
        // Update local state
        setClients(prev => 
          prev.map(client => 
            client.id === currentClient.id 
              ? {
                  ...client,
                  name: formData.name,
                  contact_person: formData.contactPerson,
                  address: formData.address,
                  city: formData.city,
                  country: formData.country,
                  vat_number: formData.vatNumber,
                  email: formData.email,
                  phone: formData.phone,
                  updated_at: new Date().toISOString(),
                }
              : client
          )
        );
        
        toast({
          title: t.common.success,
          description: t.savedClients.clientUpdatedSuccess,
        });
      } else {
        // Create new client
        const newClient = await saveClient(user.id, {
          name: formData.name,
          contactPerson: formData.contactPerson,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          vatNumber: formData.vatNumber,
          email: formData.email,
          phone: formData.phone,
        });
        
        setClients(prev => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
        
        toast({
          title: t.common.success,
          description: t.savedClients.clientAddedSuccess,
        });
      }
      
      // Close dialog
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving/updating client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImportFromOffer = () => {
    if (!user) return;
    
    if (!offer.client.name) {
      toast({
        title: t.common.error,
        description: "No client information in current offer",
        variant: 'destructive',
      });
      return;
    }
    
    // Check if client already exists
    const existingClient = clients.find(
      client => client.vat_number === offer.client.vatNumber
    );
    
    if (existingClient) {
      // Update existing client
      handleEditClient(existingClient);
    } else {
      // Prepare a new client from offer data
      handleOpenAddDialog();
    }
  };

  const deleteClient = async (id: string) => {
    try {
      await deleteClientService(id);
      setClients(prev => prev.filter(client => client.id !== id));
      toast({
        title: t.common.success,
        description: t.savedClients.clientDeletedSuccess,
      });
    } catch (error: any) {
      console.error('Error deleting client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const selectClient = (client: Client) => {
    const clientInfo: Partial<ClientInfo> = {
      name: client.name,
      contactPerson: client.contact_person || '',
      address: client.address || '',
      city: client.city || '',
      country: client.country || '',
      vatNumber: client.vat_number || '',
      email: client.email || '',
      phone: client.phone || '',
    };
    
    updateClientInfo(clientInfo);
    
    toast({
      title: t.common.success,
      description: 'Client loaded successfully',
    });
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
    handleSaveClient,
    handleImportFromOffer,
    deleteClient,
    selectClient
  };
};
