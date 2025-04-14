
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/offer';
import { ProductSaveOptions } from './types';

/**
 * Check and save new products
 */
export const saveProductsIfNew = async (
  userId: string, 
  products: Product[], 
  options: ProductSaveOptions = {}
): Promise<void> => {
  // Process each product
  for (const product of products) {
    // Skip bundle products as they're part of the main product
    if (product.isBundle && options.skipBundles !== false) {
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
