
import { supabase } from '@/integrations/supabase/client';
import { Client } from '@/types/database';
import { ClientInfo } from '@/types/offer';

export const fetchClients = async (): Promise<Client[]> => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw error;
  }
  
  return data || [];
};

export const saveClient = async (userId: string, clientInfo: ClientInfo) => {
  const { data, error } = await supabase
    .from('clients')
    .insert({
      user_id: userId,
      name: clientInfo.name,
      contact_person: clientInfo.contactPerson,
      address: clientInfo.address,
      city: clientInfo.city,
      country: clientInfo.country,
      vat_number: clientInfo.vatNumber,
      eik_number: clientInfo.eikNumber, // Added EIK field
      email: clientInfo.email,
      phone: clientInfo.phone,
    })
    .select();
    
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateClient = async (id: string, clientInfo: ClientInfo) => {
  const { error } = await supabase
    .from('clients')
    .update({
      name: clientInfo.name,
      contact_person: clientInfo.contactPerson,
      address: clientInfo.address,
      city: clientInfo.city,
      country: clientInfo.country,
      vat_number: clientInfo.vatNumber,
      eik_number: clientInfo.eikNumber, // Added EIK field
      email: clientInfo.email,
      phone: clientInfo.phone,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};

export const deleteClient = async (id: string) => {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
