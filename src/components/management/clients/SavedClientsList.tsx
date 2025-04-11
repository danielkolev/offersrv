
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

export interface SavedClientsListProps {
  clients: Client[];
  isLoading: boolean;
  filteredClients: Client[];
  selectClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  t: Translations;
}

const SavedClientsList = ({ 
  clients, 
  isLoading, 
  filteredClients,
  selectClient, 
  deleteClient, 
  t 
}: SavedClientsListProps) => {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.client.name}</TableHead>
          <TableHead>{t.client.vatNumber}</TableHead>
          <TableHead>{t.client.contactPerson}</TableHead>
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
            t={t}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedClientsList;
