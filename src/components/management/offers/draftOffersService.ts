
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

// Save draft to local storage for temporary storage
export const saveDraftToLocalStorage = (offer: Offer): void => {
  try {
    localStorage.setItem(DRAFT_OFFER_KEY, JSON.stringify(offer));
  } catch (error) {
    console.error('Error saving draft to local storage:', error);
  }
};

// Get draft from local storage
export const getDraftFromLocalStorage = (): Offer | null => {
  try {
    const draftString = localStorage.getItem(DRAFT_OFFER_KEY);
    if (!draftString) return null;
    return JSON.parse(draftString) as Offer;
  } catch (error) {
    console.error('Error retrieving draft from local storage:', error);
    return null;
  }
};

// Clear draft from local storage
export const clearDraftFromLocalStorage = (): void => {
  try {
    localStorage.removeItem(DRAFT_OFFER_KEY);
  } catch (error) {
    console.error('Error clearing draft from local storage:', error);
  }
};

// Save draft to database for persistent storage
export const saveDraftToDatabase = async (userId: string, offer: Offer): Promise<void> => {
  try {
    // No client or product saving for drafts
    
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
          // We'll set this to "DRAFT-XXX" in the display instead of using actual numbers
          name: `Draft: ${offer.client.name || 'Untitled'}`
        })
        .eq('id', existingDrafts[0].id);
        
      if (error) {
        console.error('Error updating draft:', error);
        throw error;
      }
    } else {
      // Insert new draft with a draft code
      const { error } = await supabase
        .from('saved_offers')
        .insert({
          user_id: userId,
          offer_data: offer as any,
          is_draft: true,
          draft_code: draftCode,
          status: 'draft' as SavedOffer['status'],
          name: `Draft: ${offer.client.name || 'Untitled'}`
        });
        
      if (error) {
        console.error('Error inserting draft:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error saving draft to database:', error);
    // Save to local storage as backup if database save fails
    saveDraftToLocalStorage(offer);
    throw error; // Re-throw for the caller to handle
  }
};

// Get latest draft from database
export const getLatestDraftFromDatabase = async (userId: string): Promise<Offer | null> => {
  try {
    const { data, error } = await supabase
      .from('saved_offers')
      .select('*')
      .eq('user_id', userId)
      .eq('is_draft', true)
      .order('updated_at', { ascending: false })
      .limit(1);
      
    if (error) {
      throw error;
    }
    
    if (data && data.length > 0) {
      // Explicit casting to handle type conversion from Json to Offer
      return (data[0].offer_data as unknown) as Offer;
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
    const { error } = await supabase
      .from('saved_offers')
      .delete()
      .eq('user_id', userId)
      .eq('is_draft', true);
      
    if (error) {
      throw error;
    }
    
    // Also clear from local storage
    clearDraftFromLocalStorage();
  } catch (error) {
    console.error('Error deleting draft from database:', error);
  }
};
