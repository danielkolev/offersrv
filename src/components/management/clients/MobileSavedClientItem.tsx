
import React from 'react';
import { Client } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, UserCheck, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Translations } from '@/types/language';

export interface MobileSavedClientItemProps {
  client: Client;
  selectClient: (client: Client) => void;
  deleteClient: (id: string) => void;
  editClient: (client: Client) => void;
  t: Translations;
}

const MobileSavedClientItem = ({ 
  client, 
  selectClient, 
  deleteClient, 
  editClient, 
  t 
}: MobileSavedClientItemProps) => {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Основна информация */}
          <div>
            <h3 className="font-medium">{client.name}</h3>
            {client.vat_number && (
              <p className="text-xs text-muted-foreground">{t.client.vatNumber}: {client.vat_number}</p>
            )}
          </div>
          
          {/* Контактна информация */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {client.contact_person && (
              <div>
                <span className="text-muted-foreground">{t.client.contactPerson}:</span> {client.contact_person}
              </div>
            )}
            {client.email && (
              <div>
                <span className="text-muted-foreground">{t.client.email}:</span> {client.email}
              </div>
            )}
          </div>
          
          {/* Бутони за действия */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => selectClient(client)}
              className="flex-1"
            >
              <UserCheck className="h-4 w-4 mr-1" />
              {t.savedClients.selectClient}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(true)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              {t.common.view}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => editClient(client)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-1" />
              {t.common.edit}
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {t.common.delete}
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
        </div>
      </CardContent>

      {/* Диалог с детайлите на клиента */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{client.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">VAT:</span>
              <span>{client.vat_number || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.contactPerson}:</span>
              <span>{client.contact_person || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.email}:</span>
              <span>{client.email || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.phone}:</span>
              <span>{client.phone || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.address}:</span>
              <span>{client.address || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.city}:</span>
              <span>{client.city || '-'}</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <span className="font-semibold">{t.client.country}:</span>
              <span>{client.country || '-'}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MobileSavedClientItem;
