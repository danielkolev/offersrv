
import { supabase } from '@/integrations/supabase/client';
import { Offer } from '@/types/offer';

const DRAFT_OFFER_KEY = 'draft_offer';

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
    const { error } = await supabase
      .from('offer_drafts')
      .upsert({
        user_id: userId,
        offer_data: offer as any,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      });
      
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Error saving draft to database:', error);
    // Save to local storage as backup if database save fails
    saveDraftToLocalStorage(offer);
  }
};

// Get latest draft from database
export const getLatestDraftFromDatabase = async (userId: string): Promise<Offer | null> => {
  try {
    const { data, error } = await supabase
      .from('offer_drafts')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      throw error;
    }
    
    if (data) {
      return data.offer_data as unknown as Offer;
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
      .from('offer_drafts')
      .delete()
      .eq('user_id', userId);
      
    if (error) {
      throw error;
    }
    
    // Also clear from local storage
    clearDraftFromLocalStorage();
  } catch (error) {
    console.error('Error deleting draft from database:', error);
  }
};
