
import { useState, useCallback, useEffect } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { saveDraftToDatabase, getLatestDraftFromDatabase, deleteDraftFromDatabase } from '@/components/management/offers/draftOffersService';

// Auto-save interval in milliseconds (5 seconds)
const AUTO_SAVE_INTERVAL = 5000;

export interface DraftState {
  isDirty: boolean;
  autoSaveEnabled: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  hasUserInteracted: boolean;
  createdAt: Date;
}

export interface DraftActions {
  setIsDirty: (value: boolean) => void;
  markUserInteraction: () => void;
  saveDraft: () => Promise<void>;
  toggleAutoSave: () => void;
  resetDraftState: () => Promise<void>;
}

export function useDraftManagement(
  offer: Offer,
  setOffer: (offer: Offer) => void
): DraftState & DraftActions {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();

  const [isDirty, setIsDirty] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [createdAt, setCreatedAt] = useState<Date>(new Date());

  // Load draft on initial mount
  useEffect(() => {
    const loadDraft = async () => {
      if (user) {
        try {
          const draft = await getLatestDraftFromDatabase(user.id);
          if (draft) {
            setOffer(draft);
            setLastSaved(new Date());
            setHasUserInteracted(true);
            // If the draft has a creation date, use it
            if (draft.createdAt) {
              setCreatedAt(new Date(draft.createdAt));
            }
            toast({
              title: t.offer.draftLoaded,
              description: t.offer.draftRestoredDescription,
            });
          }
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    };

    loadDraft();
  }, [user, setOffer, t, toast]);

  // Autosave effect
  useEffect(() => {
    // Only auto-save if the user has actually interacted with the offer
    if (!user || !autoSaveEnabled || !isDirty || !hasUserInteracted) return;

    const autoSaveDraft = async () => {
      setIsAutoSaving(true);
      try {
        // Add creation and last edited timestamps to the draft
        const draftToSave = {
          ...offer,
          createdAt: createdAt.toISOString(),
          lastEdited: new Date().toISOString()
        };
        
        await saveDraftToDatabase(user.id, draftToSave);
        setLastSaved(new Date());
        setIsDirty(false);
      } catch (error) {
        console.error('Error auto-saving draft:', error);
        // Silent error handling for auto-save - don't show toast for every failed autosave
      } finally {
        setIsAutoSaving(false);
      }
    };

    const timer = setTimeout(autoSaveDraft, AUTO_SAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [offer, user, autoSaveEnabled, isDirty, hasUserInteracted, createdAt]);

  // Mark as dirty when offer changes, and set that user has interacted
  useEffect(() => {
    // We use a custom equality check to prevent triggering on initial load
    // Only mark as dirty if this isn't the first render and hasUserInteracted is true
    if (hasUserInteracted) {
      setIsDirty(true);
    }
  }, [offer, hasUserInteracted]);

  // Helper function for all update functions to set hasUserInteracted flag
  const markUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }
  }, [hasUserInteracted]);

  // New function to manually save draft
  const saveDraft = useCallback(async () => {
    if (!user) return;
    
    setIsAutoSaving(true);
    try {
      // Only save if user has interacted with the offer
      if (hasUserInteracted) {
        // Add creation and last edited timestamps
        const draftToSave = {
          ...offer,
          createdAt: createdAt.toISOString(),
          lastEdited: new Date().toISOString()
        };
        
        await saveDraftToDatabase(user.id, draftToSave);
        setLastSaved(new Date());
        setIsDirty(false);
        toast({
          title: t.offer.draftSaved,
          description: t.offer.draftSavedDescription,
        });
      }
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: t.common.error,
        description: t.offer.draftSaveError,
        variant: 'destructive',
      });
    } finally {
      setIsAutoSaving(false);
    }
  }, [user, offer, t, toast, hasUserInteracted, createdAt]);

  // New function to toggle auto-save
  const toggleAutoSave = useCallback(() => {
    setAutoSaveEnabled(prev => !prev);
    toast({
      title: autoSaveEnabled ? t.offer.autoSaveDisabled : t.offer.autoSaveEnabled,
    });
  }, [autoSaveEnabled, t, toast]);

  // Reset draft state
  const resetDraftState = useCallback(async () => {
    setHasUserInteracted(false);
    setIsDirty(false);
    // Clear any saved drafts when explicitly resetting
    if (user) {
      try {
        await deleteDraftFromDatabase(user.id);
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
  }, [user]);

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
