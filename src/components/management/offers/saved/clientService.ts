
import { supabase } from '@/integrations/supabase/client';
import { ClientInfo } from '@/types/offer';
import { ClientSaveOptions } from './types';

/**
 * Check if client exists and save if it doesn't
 */
export const saveClientIfNew = async (
  userId: string, 
  client: ClientInfo, 
  options: ClientSaveOptions = {}
): Promise<void> => {
  // Validate client name
  if (!client.name || client.name.trim() === '') {
    console.error('Cannot save client without a name');
    return;
  }
  
  console.log('Checking if client exists:', client.name);
  
  if (options.checkExisting !== false) {
    // Check if client with same name exists
    const { data: existingClients, error: checkError } = await supabase
      .from('clients')
      .select('*')
      .eq('user_id', userId)
      .eq('name', client.name);
      
    if (checkError) {
      console.error('Error checking existing client:', checkError);
      return;
    }
    
    // If client exists, don't save again
    if (existingClients && existingClients.length > 0) {
      console.log('Client already exists, skipping save:', client.name);
      return;
    }
  }
  
  console.log('Saving new client:', client.name);
  
  // Save new client
  const { error: saveError } = await supabase
    .from('clients')
    .insert({
      user_id: userId,
      name: client.name,
      contact_person: client.contactPerson,
      address: client.address,
      city: client.city,
      country: client.country,
      vat_number: client.vatNumber,
      eik_number: client.eikNumber,
      email: client.email,
      phone: client.phone
    });
    
  if (saveError) {
    console.error('Error saving new client:', saveError);
  } else {
    console.log('Client saved successfully:', client.name);
  }
};
