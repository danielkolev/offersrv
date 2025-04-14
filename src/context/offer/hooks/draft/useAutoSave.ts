import { useState, useEffect } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { 
  saveDraftToDatabase, 
  saveDraftToLocalStorage 
} from '@/components/management/offers/draft';

// Auto-save interval in milliseconds (5 seconds)
const AUTO_SAVE_INTERVAL = 5000;

export function useAutoSave(
  offer: Offer,
  isDirty: boolean,
  autoSaveEnabled: boolean,
  hasUserInteracted: boolean,
  isLoadingDraft: boolean,
  createdAt: Date,
  setIsDirty: (value: boolean) => void,
  setLastSaved: (date: Date) => void
) {
  const { user } = useAuth();
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Autosave effect with improved database persistence
  useEffect(() => {
    // Only auto-save if:
    // 1. User is logged in
    // 2. Auto-save is enabled
    // 3. We have unsaved changes
    // 4. User has interacted with the offer
    // 5. We're not currently loading a draft
    if (!user || !autoSaveEnabled || !isDirty || !hasUserInteracted || isLoadingDraft) return;

    const autoSaveDraft = async () => {
      setIsAutoSaving(true);
      try {
        console.log("Auto-saving draft to database");
        // Add creation and last edited timestamps to the draft
        const draftToSave = {
          ...offer,
          createdAt: createdAt.toISOString(),
          lastEdited: new Date().toISOString()
        };
        
        // First save to database for persistence
        await saveDraftToDatabase(user.id, draftToSave);
        
        // Also save to local storage as a backup
        saveDraftToLocalStorage(draftToSave);
        
        setLastSaved(new Date());
        setIsDirty(false);
        console.log("Draft auto-saved successfully to database");
      } catch (error) {
        console.error('Error auto-saving draft to database:', error);
        // Try to save to local storage as fallback
        try {
          saveDraftToLocalStorage(offer);
          console.log("Draft auto-saved to local storage as fallback");
          setLastSaved(new Date());
          setIsDirty(false);
        } catch (localStorageError) {
          console.error('Error auto-saving to local storage:', localStorageError);
        }
      } finally {
        setIsAutoSaving(false);
      }
    };

    const timer = setTimeout(autoSaveDraft, AUTO_SAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [offer, user, autoSaveEnabled, isDirty, hasUserInteracted, createdAt, isLoadingDraft, setIsDirty, setLastSaved]);

  return { isAutoSaving };
}
