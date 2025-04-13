
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Client } from '@/types/database';
import { ClientFormData } from '../ClientFormDialog';

interface UseClientFormProps {
  client?: Client;
  open: boolean;
}

export const useClientForm = ({ client, open }: UseClientFormProps) => {
  const form = useForm<ClientFormData>({
    defaultValues: {
      name: client?.name || '',
      vatNumber: client?.vat_number || '',
      eikNumber: client?.eik_number || '',
      contactPerson: client?.contact_person || '',
      address: client?.address || '',
      city: client?.city || '',
      country: client?.country || '',
      email: client?.email || '',
      phone: client?.phone || '',
    }
  });

  // Reset form when client changes or dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset({
        name: client?.name || '',
        vatNumber: client?.vat_number || '',
        eikNumber: client?.eik_number || '',
        contactPerson: client?.contact_person || '',
        address: client?.address || '',
        city: client?.city || '',
        country: client?.country || '',
        email: client?.email || '',
        phone: client?.phone || '',
      });
    }
  }, [open, client, form]);

  return form;
};
