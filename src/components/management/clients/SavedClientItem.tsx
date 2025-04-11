
import React from 'react';
import { Client } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Translations } from '@/types/language';

export interface SavedClientItemProps {
  client: Client;
  selectClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  t: Translations;
}

const SavedClientItem = ({ client, selectClient, deleteClient, t }: SavedClientItemProps) => {
  return (
    <tr key={client.id}>
      <td className="p-4 align-middle">{client.name}</td>
      <td className="p-4 align-middle">{client.vat_number || '-'}</td>
      <td className="p-4 align-middle">{client.contact_person || '-'}</td>
      <td className="text-right p-4 align-middle">
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => selectClient(client)}
          >
            {t.savedClients.selectClient}
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.savedClients.deleteConfirmation}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteClient(client.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t.common.delete}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default SavedClientItem;
