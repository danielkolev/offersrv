
import { useCallback } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { 
  saveDraftToDatabase, 
  saveDraftToLocalStorage 
} from '@/components/management/offers/draft';

export function useManualSave(
  offer: Offer,
  createdAt: Date,
  setLastSaved: (date: Date) => void,
  setIsDirty: (value: boolean) => void,
  setHasUserInteracted: (value: boolean) => void
) {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  // Function to manually save draft
  const saveDraft = useCallback(async () => {
    if (!user) return;
    
    try {
      console.log("Manually saving draft to database");
      
      // Add creation and last edited timestamps
      const draftToSave = {
        ...offer,
        createdAt: createdAt.toISOString(),
        lastEdited: new Date().toISOString()
      };
      
      // Save to database first for persistence
      await saveDraftToDatabase(user.id, draftToSave);
      
      // Also save to local storage as a backup
      saveDraftToLocalStorage(draftToSave);
      
      setLastSaved(new Date());
      setIsDirty(false);
      setHasUserInteracted(true); // Ensure we mark that user has interacted
      
      toast({
        title: t.offer.draftSaved,
        description: t.offer.draftSavedDescription,
      });
      console.log("Draft saved successfully to database");
    } catch (error) {
      console.error('Error saving draft to database:', error);
      
      // Try to save to local storage as fallback
      try {
        saveDraftToLocalStorage(offer);
        setLastSaved(new Date());
        setIsDirty(false);
        toast({
          title: t.offer.draftSaved,
          description: t.offer.draftSavedToLocalStorage,
        });
      } catch (localStorageError) {
        console.error('Error saving to local storage:', localStorageError);
        toast({
          title: t.common.error,
          description: t.offer.draftSaveError,
          variant: 'destructive',
        });
      }
    }
  }, [user, offer, t, toast, createdAt, setLastSaved, setIsDirty, setHasUserInteracted]);

  return { saveDraft };
}
