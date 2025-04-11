
import React from 'react';
import { useForm } from 'react-hook-form';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';
import { Translations } from '@/types/language';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export interface ClientFormData {
  name: string;
  vatNumber: string;
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
  const form = useForm<ClientFormData>({
    defaultValues: {
      name: client?.name || '',
      vatNumber: client?.vat_number || '',
      contactPerson: client?.contact_person || '',
      address: client?.address || '',
      city: client?.city || '',
      country: client?.country || '',
      email: client?.email || '',
      phone: client?.phone || '',
    }
  });

  // Reset form when client changes or dialog opens/closes
  React.useEffect(() => {
    if (open) {
      form.reset({
        name: client?.name || '',
        vatNumber: client?.vat_number || '',
        contactPerson: client?.contact_person || '',
        address: client?.address || '',
        city: client?.city || '',
        country: client?.country || '',
        email: client?.email || '',
        phone: client?.phone || '',
      });
    }
  }, [open, client, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    await onSubmit(data);
    form.reset();
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t.savedClients.editClient : t.savedClients.addNewClient}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.name}</FormLabel>
                  <FormControl>
                    <Input {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="vatNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.vatNumber}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.contactPerson}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.email}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.phone}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.address}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.city}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.client.country}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {t.savedClients.cancel}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
                  null
                }
                {isEditMode ? t.savedClients.updateClient : t.savedClients.createClient}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClientFormDialog;
