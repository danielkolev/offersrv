
import { Offer } from '@/types/offer';
import { DRAFT_OFFER_KEY } from './types';

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
