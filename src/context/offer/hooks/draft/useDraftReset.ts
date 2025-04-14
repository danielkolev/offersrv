
import { useCallback } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { defaultOffer } from '../../defaultValues';
import { deleteDraftFromDatabase } from '@/components/management/offers/draft';

export function useDraftReset(
  setOffer: React.Dispatch<React.SetStateAction<Offer>>,
  setHasUserInteracted: (value: boolean) => void,
  setIsDirty: (value: boolean) => void,
  setHasMeaningfulChanges: (value: boolean) => void,
  setLastSaved: (value: Date | null) => void,
  setCreatedAt: (value: Date) => void,
  setIsLoadingDraft: (value: boolean) => void
) {
  const { user } = useAuth();

  // Reset draft state completely
  const resetDraftState = useCallback(async () => {
    setHasUserInteracted(false);
    setIsDirty(false);
    setHasMeaningfulChanges(false);
    setLastSaved(null);
    setCreatedAt(new Date());
    setIsLoadingDraft(true);
    
    // Reset the offer to defaults
    setOffer(defaultOffer);
    
    // Clear any saved drafts when explicitly resetting
    if (user) {
      try {
        console.log("Deleting draft during reset");
        await deleteDraftFromDatabase(user.id);
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
    
    // Small delay to ensure reset is complete
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoadingDraft(false);
  }, [user, setOffer, setHasUserInteracted, setIsDirty, setHasMeaningfulChanges, setLastSaved, setCreatedAt, setIsLoadingDraft]);

  return { resetDraftState };
}
