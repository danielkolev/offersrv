
import React from 'react';
import { Client } from '@/types/database';
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SavedClientItem from './SavedClientItem';
import { Translations } from '@/types/language';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileSavedClientItem from './MobileSavedClientItem';

export interface SavedClientsListProps {
  clients: Client[];
  isLoading: boolean;
  filteredClients: Client[];
  selectClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  editClient: (client: Client) => void;
  t: Translations;
}

const SavedClientsList = ({ 
  clients, 
  isLoading, 
  filteredClients,
  selectClient, 
  deleteClient,
  editClient,
  t 
}: SavedClientsListProps) => {
  const isMobile = useIsMobile();
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-offer-blue" />
      </div>
    );
  }
  
  if (filteredClients.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t.savedClients.noClientsFound}
      </div>
    );
  }

  // Мобилен изглед с карти
  if (isMobile) {
    return (
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <MobileSavedClientItem
            key={client.id}
            client={client}
            selectClient={selectClient}
            deleteClient={deleteClient}
            editClient={editClient}
            t={t}
          />
        ))}
      </div>
    );
  }

  // Настолен изглед с таблица и скрол ако е нужен
  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.client.name}</TableHead>
            <TableHead>{t.client.vatNumber}</TableHead>
            <TableHead>{t.client.contactPerson}</TableHead>
            <TableHead>{t.client.email}</TableHead>
            <TableHead className="text-right">{t.common.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.map((client) => (
            <SavedClientItem
              key={client.id}
              client={client}
              selectClient={selectClient}
              deleteClient={deleteClient}
              editClient={editClient}
              t={t}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default SavedClientsList;
