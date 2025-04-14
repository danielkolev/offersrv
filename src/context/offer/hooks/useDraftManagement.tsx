
import { useState, useCallback, useEffect } from 'react';
import { Offer } from '@/types/offer';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { 
  saveDraftToDatabase, 
  getLatestDraftFromDatabase, 
  deleteDraftFromDatabase,
  saveDraftToLocalStorage 
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
  // Track if we're currently loading a draft to prevent double-saves
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);

  // Check for meaningful changes whenever the offer changes
  useEffect(() => {
    if (hasUserInteracted) {
      const meaningful = hasMeaningfulContent(offer);
      console.log("Checking if offer has meaningful changes:", meaningful);
      setHasMeaningfulChanges(meaningful);
    }
  }, [offer, hasUserInteracted]);

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
  }, [offer, user, autoSaveEnabled, isDirty, hasUserInteracted, createdAt, isLoadingDraft]);

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

  // Function to manually save draft
  const saveDraft = useCallback(async () => {
    if (!user) return;
    
    setIsAutoSaving(true);
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
    } finally {
      setIsAutoSaving(false);
    }
  }, [user, offer, t, toast, createdAt]);

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
