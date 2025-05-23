
import { useState, useCallback, useEffect } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { 
  saveDraftToDatabase, 
  getLatestDraftFromDatabase, 
  deleteDraftFromDatabase 
} from '@/components/management/offers/draftOffersService';
import { defaultOffer } from '../defaultValues';

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

// Helper to check if an offer has meaningful content
const hasMeaningfulContent = (offer: Offer): boolean => {
  // Ensure we have a valid offer object with all required properties
  if (!offer || !offer.client || !offer.products || !offer.details) {
    console.log("Invalid offer structure for meaningful content check");
    return false;
  }
  
  // Check if client has at least a name
  const hasClientInfo = offer.client.name && offer.client.name.trim() !== '';
  
  // Check if there are any products
  const hasProducts = offer.products && offer.products.length > 0;
  
  // Check if there are meaningful offer details (notes, custom number, etc.)
  const hasOfferDetails = 
    (offer.details.notes && offer.details.notes.trim() !== '') || 
    (offer.details.offerNumber && 
     offer.details.offerNumber !== '00000' && 
     offer.details.offerNumber.trim() !== '');
  
  return hasClientInfo || hasProducts || hasOfferDetails;
};

export function useDraftManagement(
  offer: Offer,
  setOffer: React.Dispatch<React.SetStateAction<Offer>>
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
  // New state to track if we have meaningful content
  const [hasMeaningfulChanges, setHasMeaningfulChanges] = useState(false);

  // Load draft on initial mount
  useEffect(() => {
    const loadDraft = async () => {
      if (user) {
        try {
          console.log("Attempting to load draft for user:", user.id);
          const draft = await getLatestDraftFromDatabase(user.id);
          
          if (draft) {
            console.log("Draft found, checking for meaningful content");
            // Only load drafts that have meaningful content
            if (hasMeaningfulContent(draft)) {
              console.log("useDraftManagement: Loading draft with data:", draft);
              setOffer(draft);
              setLastSaved(new Date());
              setHasUserInteracted(true);
              setHasMeaningfulChanges(true);
              // If the draft has a creation date, use it
              if (draft.createdAt) {
                setCreatedAt(new Date(draft.createdAt));
              }
              toast({
                title: t.offer.draftLoaded,
                description: t.offer.draftRestoredDescription,
              });
            } else {
              console.log("Draft has no meaningful content, deleting it");
              // If draft doesn't have meaningful content, delete it
              await deleteDraftFromDatabase(user.id);
            }
          } else {
            console.log("No draft found for user");
          }
        } catch (error) {
          console.error('Error loading draft:', error);
        }
      }
    };

    loadDraft();
  }, [user, setOffer, t, toast]);

  // Check for meaningful changes whenever the offer changes
  useEffect(() => {
    if (hasUserInteracted) {
      const meaningful = hasMeaningfulContent(offer);
      console.log("Checking if offer has meaningful changes:", meaningful);
      setHasMeaningfulChanges(meaningful);
    }
  }, [offer, hasUserInteracted]);

  // Autosave effect
  useEffect(() => {
    // Only auto-save if:
    // 1. User is logged in
    // 2. Auto-save is enabled
    // 3. We have unsaved changes
    // 4. User has interacted with the offer
    // 5. There are meaningful changes to save
    if (!user || !autoSaveEnabled || !isDirty || !hasUserInteracted || !hasMeaningfulChanges) return;

    const autoSaveDraft = async () => {
      setIsAutoSaving(true);
      try {
        console.log("Auto-saving draft");
        // Add creation and last edited timestamps to the draft
        const draftToSave = {
          ...offer,
          createdAt: createdAt.toISOString(),
          lastEdited: new Date().toISOString()
        };
        
        await saveDraftToDatabase(user.id, draftToSave);
        setLastSaved(new Date());
        setIsDirty(false);
        console.log("Draft auto-saved successfully");
      } catch (error) {
        console.error('Error auto-saving draft:', error);
        // Silent error handling for auto-save - don't show toast for every failed autosave
      } finally {
        setIsAutoSaving(false);
      }
    };

    const timer = setTimeout(autoSaveDraft, AUTO_SAVE_INTERVAL);
    return () => clearTimeout(timer);
  }, [offer, user, autoSaveEnabled, isDirty, hasUserInteracted, hasMeaningfulChanges, createdAt]);

  // Mark as dirty when offer changes, and set that user has interacted
  useEffect(() => {
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

  // Function to manually save draft
  const saveDraft = useCallback(async () => {
    if (!user) return;
    
    setIsAutoSaving(true);
    try {
      console.log("Manually saving draft");
      // Only save if user has interacted with the offer AND there are meaningful changes
      if (hasUserInteracted && hasMeaningfulChanges) {
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
        console.log("Draft saved successfully");
      } else if (hasUserInteracted && !hasMeaningfulChanges) {
        // If user interacted but no meaningful changes, show different message
        console.log("No meaningful changes to save");
        toast({
          title: t.offer.noContentToSave,
          description: t.offer.addContentToSave,
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
  }, [user, offer, t, toast, hasUserInteracted, hasMeaningfulChanges, createdAt]);

  // Function to toggle auto-save
  const toggleAutoSave = useCallback(() => {
    setAutoSaveEnabled(prev => !prev);
    toast({
      title: autoSaveEnabled ? t.offer.autoSaveDisabled : t.offer.autoSaveEnabled,
    });
  }, [autoSaveEnabled, t, toast]);

  // Reset draft state completely
  const resetDraftState = useCallback(async () => {
    setHasUserInteracted(false);
    setIsDirty(false);
    setHasMeaningfulChanges(false);
    setLastSaved(null);
    setCreatedAt(new Date());
    
    // Clear any saved drafts when explicitly resetting
    if (user) {
      try {
        console.log("Deleting draft during reset");
        await deleteDraftFromDatabase(user.id);
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    }
    
    // Reset the offer to defaults
    setOffer(defaultOffer);
  }, [user, setOffer]);

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
