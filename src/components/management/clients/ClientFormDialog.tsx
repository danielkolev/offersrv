
import React from 'react';
import { Client } from '@/types/database';
import { Translations } from '@/types/language';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import ClientFormFields from './ClientFormFields';
import ClientFormFooter from './ClientFormFooter';
import { useClientForm } from './hooks/useClientForm';

export interface ClientFormData {
  name: string;
  vatNumber: string;
  eikNumber: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
}

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClientFormData) => Promise<void>;
  client?: Client;
  isSubmitting: boolean;
  t: Translations;
  isEditMode: boolean;
}

const ClientFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  client,
  isSubmitting,
  t,
  isEditMode
}: ClientFormDialogProps) => {
  const form = useClientForm({ client, open });

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
    form.reset();
  });

  // Добавяме обработка на затварянето на модалния прозорец
  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    // Малко забавяне преди да се възстанови фокуса
    if (!newOpenState) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t.savedClients.editClient : t.savedClients.addNewClient}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <ClientFormFields form={form} t={t} />
            
            <ClientFormFooter 
              isSubmitting={isSubmitting} 
              isEditMode={isEditMode} 
              onCancel={() => onOpenChange(false)} 
              t={t} 
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientFormDialog;
