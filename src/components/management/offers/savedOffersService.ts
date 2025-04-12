
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { Offer } from '@/types/offer';
import { ClientInfo, Product } from '@/types/offer';

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

export const saveOfferToDatabase = async (userId: string, offer: Offer & { name?: string }): Promise<SavedOffer> => {
  // Extract name from offer if available
  const offerName = offer.name || `${offer.client.name} - #${offer.details.offerNumber} - ${new Date().toLocaleDateString()}`;
  
  // First, check and save the client if it doesn't exist
  console.log('Checking and saving client:', offer.client);
  await saveClientIfNew(userId, offer.client);
  
  // Then, check and save any new products
  console.log('Checking and saving products:', offer.products);
  await saveProductsIfNew(userId, offer.products);
  
  // Finally, save the offer
  const { data, error } = await supabase
    .from('saved_offers')
    .insert({
      user_id: userId,
      offer_data: offer as any, // Cast to any to bypass type checking
      name: offerName // Store the name in the separate column
    })
    .select('*');
    
  if (error) {
    console.error('Error saving offer:', error);
    throw error;
  }
  
  // Convert the returned data to match our SavedOffer type
  const newOffer = {
    ...data[0],
    offer_data: data[0].offer_data as unknown as Offer
  };
  
  return newOffer;
};

// Function to check if client exists and save if it doesn't
const saveClientIfNew = async (userId: string, client: ClientInfo): Promise<void> => {
  console.log('Checking if client exists:', client.name);
  
  // Check if client with same name and VAT number exists
  const { data: existingClients, error: checkError } = await supabase
    .from('clients')
    .select('*')
    .eq('user_id', userId)
    .eq('name', client.name);
    
  if (checkError) {
    console.error('Error checking existing client:', checkError);
    return;
  }
  
  // If client doesn't exist, save it
  if (!existingClients || existingClients.length === 0) {
    console.log('Client does not exist, saving new client:', client.name);
    
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
        email: client.email,
        phone: client.phone
      });
      
    if (saveError) {
      console.error('Error saving new client:', saveError);
    } else {
      console.log('Client saved successfully:', client.name);
    }
  } else {
    console.log('Client already exists, skipping save:', client.name);
  }
};

// Function to check and save new products
const saveProductsIfNew = async (userId: string, products: Product[]): Promise<void> => {
  // Process each product
  for (const product of products) {
    // Skip bundle products as they're part of the main product
    if (product.isBundle) {
      console.log('Skipping bundle product:', product.name);
      continue;
    }
    
    console.log('Checking if product exists:', product.name);
    
    // Check if product with same name exists
    const { data: existingProducts, error: checkError } = await supabase
      .from('saved_products')
      .select('*')
      .eq('user_id', userId)
      .eq('name', product.name);
      
    if (checkError) {
      console.error('Error checking existing product:', checkError);
      continue;
    }
    
    // If product doesn't exist, save it
    if (!existingProducts || existingProducts.length === 0) {
      console.log('Product does not exist, saving new product:', product.name);
      
      const { error: saveError } = await supabase
        .from('saved_products')
        .insert({
          user_id: userId,
          name: product.name,
          description: product.description || '',
          part_number: product.partNumber || '',
          unit_price: product.unitPrice
        });
        
      if (saveError) {
        console.error('Error saving new product:', saveError);
      } else {
        console.log('Product saved successfully:', product.name);
      }
    } else {
      console.log('Product already exists, skipping save:', product.name);
    }
  }
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
