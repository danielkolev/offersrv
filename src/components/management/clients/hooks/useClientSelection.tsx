
import { useOffer } from '@/context/offer/OfferContext';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';
import { useToast } from '@/hooks/use-toast';
import { Translations } from '@/types/language';

export const useClientSelection = (
  t: Translations,
  clients: Client[],
  handleEditClient: (client: Client) => void,
  handleOpenAddDialog: () => void
) => {
  const { offer, updateClientInfo } = useOffer();
  const { toast } = useToast();

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
      description: t.savedClients.clientLoaded,
    });
  };

  const handleImportFromOffer = () => {
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

  return {
    selectClient,
    handleImportFromOffer
  };
};
