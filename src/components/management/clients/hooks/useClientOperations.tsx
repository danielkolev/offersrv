
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Client } from '@/types/database';
import { ClientFormData } from '../ClientFormDialog';
import { 
  saveClient, 
  updateClient, 
  deleteClient as deleteClientService 
} from '../clientsService';
import { useToast } from '@/hooks/use-toast';
import { Translations } from '@/types/language';

export const useClientOperations = (
  t: Translations,
  clients: Client[],
  setClients: React.Dispatch<React.SetStateAction<Client[]>>,
  setIsDialogOpen: (open: boolean) => void
) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveClient = async (formData: ClientFormData, isEditMode: boolean, currentClient?: Client) => {
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
          eikNumber: formData.eikNumber, // Add eikNumber here
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
                  eik_number: formData.eikNumber, // Add eik_number here
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
          eikNumber: formData.eikNumber, // Add eikNumber here
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

  return {
    isSaving,
    handleSaveClient,
    deleteClient
  };
};
