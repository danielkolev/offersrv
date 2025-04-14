
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { Offer } from '@/types/offer';
import { SaveOptions } from './types';
import { normalizeOfferStatus, generateDefaultOfferName } from './utils';
import { saveClientIfNew } from './clientService';
import { saveProductsIfNew } from './productService';

/**
 * Fetch all saved offers for a user
 */
export const fetchSavedOffers = async (): Promise<SavedOffer[]> => {
  const { data, error } = await supabase
    .from('saved_offers')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw error;
  }
  
  // Convert the data to match our SavedOffer type with proper type validation
  const typedOffers: SavedOffer[] = data?.map(item => {
    // Normalize the status
    const status = normalizeOfferStatus(item.status);
    
    return {
      ...item,
      status,
      offer_data: item.offer_data as unknown as Offer
    };
  }) || [];
  
  return typedOffers;
};

/**
 * Save an offer to the database
 */
export const saveOfferToDatabase = async (
  userId: string, 
  offer: Offer & { name?: string },
  options: SaveOptions = {}
): Promise<SavedOffer> => {
  // Validate that client name exists before saving
  if (!offer.client.name || offer.client.name.trim() === '') {
    throw new Error('Client name is required');
  }
  
  // Extract or generate name from offer
  const offerName = options.name || 
                    offer.name || 
                    generateDefaultOfferName(
                      offer.client.name, 
                      offer.details.offerNumber
                    );
  
  // First, check and save the client if it doesn't exist
  console.log('Checking and saving client:', offer.client);
  await saveClientIfNew(userId, offer.client);
  
  // Then, check and save any new products
  console.log('Checking and saving products:', offer.products);
  await saveProductsIfNew(userId, offer.products);
  
  // Determine the status
  const status = options.status || 'saved';
  
  // Finally, save the offer
  const { data, error } = await supabase
    .from('saved_offers')
    .insert({
      user_id: userId,
      offer_data: offer as any, // Cast to any to bypass type checking
      name: offerName, // Store the name in the separate column
      status: status
    })
    .select('*');
    
  if (error) {
    console.error('Error saving offer:', error);
    throw error;
  }
  
  // Convert the returned data to match our SavedOffer type with status validation
  const rawOffer = data[0];
  const normalizedStatus = normalizeOfferStatus(rawOffer.status);
  
  const newOffer: SavedOffer = {
    ...rawOffer,
    status: normalizedStatus,
    offer_data: rawOffer.offer_data as unknown as Offer
  };
  
  return newOffer;
};

/**
 * Delete an offer from the database
 */
export const deleteOfferFromDatabase = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('saved_offers')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
