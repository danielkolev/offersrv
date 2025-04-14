
import { useState, useCallback, useEffect } from 'react';
import { Offer } from '@/types/offer';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { hasMeaningfulContent } from './draft/draftContentUtils';
import { useAutoSave } from './draft/useAutoSave';
import { useManualSave } from './draft/useManualSave';
import { useDraftReset } from './draft/useDraftReset';
import { DraftState, DraftActions } from './draft/types';

export function useDraftManagement(
  offer: Offer,
  setOffer: React.Dispatch<React.SetStateAction<Offer>>
): DraftState & DraftActions {
  const { toast } = useToast();
  const { t } = useLanguage();

  // Draft state
  const [isDirty, setIsDirty] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());
  
  // Tracking states
  const [hasMeaningfulChanges, setHasMeaningfulChanges] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);

  // Use our smaller hooks
  const { isAutoSaving } = useAutoSave(
    offer, 
    isDirty, 
    autoSaveEnabled, 
    hasUserInteracted, 
    isLoadingDraft, 
    createdAt,
    setIsDirty,
    setLastSaved
  );

  const { saveDraft } = useManualSave(
    offer,
    createdAt,
    setLastSaved,
    setIsDirty,
    setHasUserInteracted
  );

  const { resetDraftState } = useDraftReset(
    setOffer,
    setHasUserInteracted,
    setIsDirty,
    setHasMeaningfulChanges,
    setLastSaved,
    setCreatedAt,
    setIsLoadingDraft
  );

  // Check for meaningful changes whenever the offer changes
  useEffect(() => {
    if (hasUserInteracted) {
      const meaningful = hasMeaningfulContent(offer);
      console.log("Checking if offer has meaningful changes:", meaningful);
      setHasMeaningfulChanges(meaningful);
    }
  }, [offer, hasUserInteracted]);

  // Mark as dirty when offer changes, and set that user has interacted
  useEffect(() => {
    // Only mark as dirty if this isn't the first render and hasUserInteracted is true
    if (hasUserInteracted && !isLoadingDraft) {
      setIsDirty(true);
    }
  }, [offer, hasUserInteracted, isLoadingDraft]);

  // Helper function for all update functions to set hasUserInteracted flag
  const markUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  }, [hasUserInteracted]);

  // Function to toggle auto-save
  const toggleAutoSave = useCallback(() => {
    setAutoSaveEnabled(prev => !prev);
    toast({
      title: autoSaveEnabled ? t.offer.autoSaveDisabled : t.offer.autoSaveEnabled,
    });
  }, [autoSaveEnabled, t, toast]);

  return {
    isDirty,
    autoSaveEnabled,
    isAutoSaving,
    lastSaved,
    hasUserInteracted,
    createdAt,
    setIsDirty,
    markUserInteraction,
    saveDraft,
    toggleAutoSave,
    resetDraftState
  };
}
