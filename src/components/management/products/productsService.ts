
import { supabase } from '@/integrations/supabase/client';
import { SavedProduct } from '@/types/database';
import { Product } from '@/types/offer';

export const fetchSavedProducts = async (userId: string) => {
  const { data, error } = await supabase
    .from('saved_products')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw error;
  }
  
  return data || [];
};

export const saveProduct = async (userId: string, product: Omit<Product, 'id'> & { id?: string }) => {
  const { data, error } = await supabase
    .from('saved_products')
    .insert({
      user_id: userId,
      name: product.name,
      description: product.description || null,
      part_number: product.partNumber || null,
      unit_price: product.unitPrice,
    })
    .select();
    
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const updateProduct = async (id: string, product: {
  name: string;
  description: string | null;
  part_number: string | null;
  unit_price: number;
}) => {
  const { data, error } = await supabase
    .from('saved_products')
    .update({
      name: product.name,
      description: product.description,
      part_number: product.part_number,
      unit_price: product.unit_price,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
    
  if (error) {
    throw error;
  }
  
  return data[0];
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('saved_products')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
  
  return true;
};

export const convertToOfferProduct = (savedProduct: SavedProduct): Omit<Product, 'id'> => {
  return {
    name: savedProduct.name,
    description: savedProduct.description || undefined,
    partNumber: savedProduct.part_number || undefined,
    quantity: 1,
    unitPrice: savedProduct.unit_price,
  };
};
