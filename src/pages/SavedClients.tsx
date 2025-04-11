
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';
import { Button } from '@/components/ui/button';
import { UserPlus, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { fetchClients, saveClient, updateClient, deleteClient as deleteClientService } from '@/components/management/clients/clientsService';
import SavedClientsList from '@/components/management/clients/SavedClientsList';
import ClientSearch from '@/components/management/clients/ClientSearch';
import ClientFormDialog from '@/components/management/clients/ClientFormDialog';
import { ClientFormData } from '@/components/management/clients/ClientFormDialog';

const SavedClientsPage = () => {
  const { user } = useAuth();
  const { offer, updateClientInfo } = useOffer();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'vat'>('name');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const handleOpenAddDialog = () => {
    setCurrentClient(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setIsEditMode(true);
    setIsDialogOpen(true);
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
      setCurrentClient(undefined);
      setIsEditMode(false);
      setIsDialogOpen(true);
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

  const filteredClients = clients.filter(client => {
    if (searchType === 'name') {
      return client.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return client.vat_number?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{t.savedClients.title}</h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleImportFromOffer} 
            variant="outline"
          >
            {t.savedClients.importFromOffer}
          </Button>
          
          <Button 
            onClick={handleOpenAddDialog} 
            className="gap-2"
          >
            <UserPlus className="h-4 w-4" />
            {t.savedClients.addNewClient}
          </Button>
        </div>
      </div>
      
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
