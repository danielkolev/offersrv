
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { Offer } from '@/types/offer';

export const fetchSavedOffers = async (): Promise<SavedOffer[]> => {
  const { data, error } = await supabase
    .from('saved_offers')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw error;
  }
  
  // Convert the data to match our SavedOffer type
  const typedOffers: SavedOffer[] = data?.map(item => ({
    ...item,
    offer_data: item.offer_data as unknown as Offer
  })) || [];
  
  return typedOffers;
};

export const saveOfferToDatabase = async (userId: string, offer: Offer): Promise<SavedOffer> => {
  const { data, error } = await supabase
    .from('saved_offers')
    .insert({
      user_id: userId,
      offer_data: offer as any, // Cast to any to bypass type checking
    })
    .select();
    
  if (error) {
    throw error;
  }
  
  // Convert the returned data to match our SavedOffer type
  const newOffer = {
    ...data[0],
    offer_data: data[0].offer_data as unknown as Offer
  };
  
  return newOffer;
};

export const deleteOfferFromDatabase = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('saved_offers')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
