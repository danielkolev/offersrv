import { supabase } from '@/integrations/supabase/client';
import { Offer } from '@/types/offer';
import { SavedOffer } from '@/types/database';
import { v4 as uuidv4 } from 'uuid';

const DRAFT_OFFER_KEY = 'draft_offer';

// Generate a unique draft code (alphanumeric)
const generateDraftCode = (): string => {
  // Create a shortened UUID-based code - first 8 chars
  return `DRAFT-${uuidv4().substring(0, 8)}`;
};

// Helper to check if an offer has meaningful content worth saving
const hasMeaningfulContent = (offer: Offer): boolean => {
  if (!offer || !offer.client || !offer.products || !offer.details) {
    console.log("Invalid offer structure for meaningful content check");
    return false;
  }
  
  // Check if client has at least a name
  const hasClientInfo = offer.client?.name && offer.client.name.trim() !== '';
  
  // Check if there are any products
  const hasProducts = offer.products && offer.products.length > 0;
  
  // Check if there are meaningful offer details (notes, custom number, etc.)
  const hasOfferDetails = 
    (offer.details?.notes && offer.details.notes.trim() !== '') || 
    (offer.details?.offerNumber && 
     offer.details.offerNumber !== '00000' && 
     offer.details.offerNumber.trim() !== '');
  
  return hasClientInfo || hasProducts || hasOfferDetails;
};

// Save draft to local storage for temporary storage and backup
export const saveDraftToLocalStorage = (offer: Offer): void => {
  try {
    localStorage.setItem(DRAFT_OFFER_KEY, JSON.stringify(offer));
    console.log("Draft saved to local storage successfully");
  } catch (error) {
    console.error('Error saving draft to local storage:', error);
  }
};

// Get draft from local storage
export const getDraftFromLocalStorage = (): Offer | null => {
  try {
    const draftString = localStorage.getItem(DRAFT_OFFER_KEY);
    if (!draftString) return null;
    
    const draft = JSON.parse(draftString) as Offer;
    return draft;
  } catch (error) {
    console.error('Error retrieving draft from local storage:', error);
    return null;
  }
};

// Clear draft from local storage
export const clearDraftFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(DRAFT_OFFER_KEY);
    console.log("Draft cleared from local storage");
  } catch (error) {
    console.error('Error clearing draft from local storage:', error);
  }
};

// Save draft to database for persistent storage
export const saveDraftToDatabase = async (userId: string, offer: Offer): Promise<void> => {
  // Skip saving if there's no meaningful content and we're not forcing the save
  if (!hasMeaningfulContent(offer)) {
    console.log('Skipping draft save to database - no meaningful content');
    return;
  }
  
  console.log('Saving draft to database for user:', userId);
  
  try {
    // First check if there's already a draft for this user
    const { data: existingDrafts, error: fetchError } = await supabase
      .from('saved_offers')
      .select('*')
      .eq('user_id', userId)
      .eq('is_draft', true);
      
    if (fetchError) {
      throw fetchError;
    }
    
    // Draft code to use - either existing or new
    let draftCode = generateDraftCode();
    
    if (existingDrafts && existingDrafts.length > 0) {
      // Use existing draft_code or generate a new one
      const existingDraft = existingDrafts[0];
      draftCode = existingDraft.draft_code || draftCode;
      
      console.log('Updating existing draft with ID:', existingDraft.id);
      
      // Update existing draft, keeping the draft_code
      const { error } = await supabase
        .from('saved_offers')
        .update({
          offer_data: offer as any,
          updated_at: new Date().toISOString(),
          draft_code: draftCode,
          // Set status to draft for filtering and sorting
          status: 'draft' as SavedOffer['status'],
          // Force a temporary placeholder for offer number in drafts
          name: `Draft: ${offer.client?.name || 'Untitled'}`
        })
        .eq('id', existingDrafts[0].id);
        
      if (error) {
        console.error('Error updating draft in database:', error);
        throw error;
      }
      
      console.log('Draft updated successfully in database');
    } else {
      console.log('Creating new draft in database');
      
      // Insert new draft with a draft code
      const { error } = await supabase
        .from('saved_offers')
        .insert({
          user_id: userId,
          offer_data: offer as any,
          is_draft: true,
          draft_code: draftCode,
          status: 'draft' as SavedOffer['status'],
          name: `Draft: ${offer.client?.name || 'Untitled'}`
        });
        
      if (error) {
        console.error('Error inserting draft into database:', error);
        throw error;
      }
      
      console.log('New draft created successfully in database');
    }
  } catch (error) {
    console.error('Error saving draft to database:', error);
    // Save to local storage as backup if database save fails
    saveDraftToLocalStorage(offer);
    throw error; // Re-throw for the caller to handle
  }
};

// Get latest draft from database with improved error handling
export const getLatestDraftFromDatabase = async (userId: string): Promise<Offer | null> => {
  try {
    console.log("Attempting to fetch draft for user:", userId);
    
    // Retry mechanism in case of temporary errors
    let attempts = 0;
    const maxAttempts = 2;
    
    while (attempts < maxAttempts) {
      try {
        const { data, error } = await supabase
          .from('saved_offers')
          .select('*')
          .eq('user_id', userId)
          .eq('is_draft', true)
          .order('updated_at', { ascending: false })
          .limit(1);
          
        if (error) {
          console.error(`Attempt ${attempts + 1} failed:`, error);
          throw error;
        }
        
        if (data && data.length > 0) {
          console.log("Draft found in database:", data[0]);
          
          // Explicit casting to handle type conversion from Json to Offer
          const offerData = (data[0].offer_data as unknown) as Offer;
          
          // All drafts saved to the database should have meaningful content
          return offerData;
        } else {
          console.log("No draft found for user in database");
        }
        
        // If we get here, we've successfully completed the query - exit the retry loop
        break;
      } catch (retryError) {
        attempts++;
        
        if (attempts >= maxAttempts) {
          // If we've exhausted our retries, rethrow the last error
          throw retryError;
        }
        
        // Wait a bit before retrying (200ms)
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    // Try from local storage as fallback
    const localDraft = getDraftFromLocalStorage();
    if (localDraft) {
      console.log("Found draft in local storage, using it as fallback");
      
      // Save to database for future retrievals
      try {
        await saveDraftToDatabase(userId, localDraft);
        console.log("Local storage draft saved to database");
      } catch (saveError) {
        console.error("Failed to save local storage draft to database:", saveError);
      }
      
      return localDraft;
    }
    
    return null;
  } catch (error) {
    console.error('Error retrieving draft from database:', error);
    // Attempt to get from local storage as fallback
    return getDraftFromLocalStorage();
  }
};

// Delete draft from database
export const deleteDraftFromDatabase = async (userId: string): Promise<void> => {
  try {
    console.log("Deleting draft from database for user:", userId);
    
    const { error } = await supabase
      .from('saved_offers')
      .delete()
      .eq('user_id', userId)
      .eq('is_draft', true);
      
    if (error) {
      throw error;
    }
    
    console.log("Draft deleted from database successfully");
    
    // Also clear from local storage
    clearDraftFromLocalStorage();
  } catch (error) {
    console.error('Error deleting draft from database:', error);
  }
};
