
import React from 'react';
import { Client } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, UserCheck, Eye } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Translations } from '@/types/language';

export interface SavedClientItemProps {
  client: Client;
  selectClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  editClient: (client: Client) => void;
  t: Translations;
}

const SavedClientItem = ({ client, selectClient, deleteClient, editClient, t }: SavedClientItemProps) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <tr key={client.id}>
      <td className="p-4 align-middle">{client.name}</td>
      <td className="p-4 align-middle">{client.vat_number || '-'}</td>
      <td className="p-4 align-middle">{client.contact_person || '-'}</td>
      <td className="p-4 align-middle">{client.email || '-'}</td>
      <td className="text-right p-4 align-middle">
        <div className="flex justify-end gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => selectClient(client)}
                  className="h-8 w-8"
                >
                  <UserCheck className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.savedClients.selectClient}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowDetails(true)}
                  className="h-8 w-8"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.common.view}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => editClient(client)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.common.edit}</p>
              </TooltipContent>
            </Tooltip>

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
          </TooltipProvider>
        </div>
      </td>

      {/* Client Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{client.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">VAT:</span>
              <span className="col-span-3">{client.vat_number || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Contact:</span>
              <span className="col-span-3">{client.contact_person || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Email:</span>
              <span className="col-span-3">{client.email || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Phone:</span>
              <span className="col-span-3">{client.phone || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Address:</span>
              <span className="col-span-3">{client.address || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">City:</span>
              <span className="col-span-3">{client.city || '-'}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-semibold">Country:</span>
              <span className="col-span-3">{client.country || '-'}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </tr>
  );
};

export default SavedClientItem;
