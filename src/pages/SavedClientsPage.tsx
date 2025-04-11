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

  const handleSaveClient = async () => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated || "You need to be logged in",
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
      await handleUpdateExistingClient(existingClient.id);
      return;
    }
    
    setIsSaving(true);
    try {
      const newClient = await saveClient(user.id, offer.client);
      setClients(prev => [...prev, newClient].sort((a, b) => a.name.localeCompare(b.name)));
      toast({
        title: t.common.success,
        description: 'Client saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving client:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleUpdateExistingClient = async (id: string) => {
    setIsSaving(true);
    try {
      await updateClient(id, offer.client);
      
      // Update local state
      setClients(prev => 
        prev.map(client => 
          client.id === id 
            ? {
                ...client,
                name: offer.client.name,
                contact_person: offer.client.contactPerson,
                address: offer.client.address,
                city: offer.client.city,
                country: offer.client.country,
                vat_number: offer.client.vatNumber,
                email: offer.client.email,
                phone: offer.client.phone,
                updated_at: new Date().toISOString(),
              }
            : client
        )
      );
      
      toast({
        title: t.common.success,
        description: 'Client updated successfully',
      });
    } catch (error: any) {
      console.error('Error updating client:', error);
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
        description: 'Client deleted successfully',
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
        
        <Button 
          onClick={handleSaveClient} 
          className="gap-2"
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          {t.savedClients.addClient}
        </Button>
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
        t={t}
      />
    </div>
  );
};

export default SavedClientsPage;
