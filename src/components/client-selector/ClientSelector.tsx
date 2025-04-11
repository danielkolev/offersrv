
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchClients } from '@/components/management/clients/clientsService';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';

interface ClientSelectorProps {
  onSelectClient: (clientInfo: Partial<ClientInfo>) => void;
}

const ClientSelector = ({ onSelectClient }: ClientSelectorProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadClients();
    }
  }, [isOpen]);

  const loadClients = async () => {
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error('Error loading clients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectClient = (client: Client) => {
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
    
    onSelectClient(clientInfo);
    setIsOpen(false);
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.vat_number && client.vat_number.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full md:w-auto mb-4"
        >
          {t.clientInfo.selectExisting}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t.clientInfo.selectClient}</SheetTitle>
        </SheetHeader>
        
        <div className="py-4">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.clientInfo.searchClients}
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>{t.common.loading}</p>
            </div>
          ) : filteredClients.length > 0 ? (
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {filteredClients.map((client) => (
                <div
                  key={client.id}
                  className="p-3 border rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="font-medium">{client.name}</div>
                  {client.vat_number && (
                    <div className="text-sm text-muted-foreground">
                      {t.clientInfo.vatNumber}: {client.vat_number}
                    </div>
                  )}
                  {client.contact_person && (
                    <div className="text-sm text-muted-foreground">
                      {t.clientInfo.contactPerson}: {client.contact_person}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? t.savedClients.noClientsFoundSearch 
                : t.savedClients.noClientsFound}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ClientSelector;
