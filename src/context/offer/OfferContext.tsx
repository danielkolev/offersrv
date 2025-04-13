import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { Offer, CompanyInfo, ClientInfo, Product, OfferDetails } from '../../types/offer';
import { v4 as uuidv4 } from 'uuid';
import { OfferContextType } from './types';
import { defaultOffer } from './defaultValues';
import { calculateSubtotal, calculateVat, calculateTotal } from './calculations';
import { useAuth } from '@/context/AuthContext';
import { saveDraftToDatabase, getLatestDraftFromDatabase, deleteDraftFromDatabase } from '@/components/management/offers/draftOffersService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const OfferContext = createContext<OfferContextType | undefined>(undefined);

// Auto-save interval in milliseconds (5 seconds)
const AUTO_SAVE_INTERVAL = 5000;

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offer, setOffer] = useState<Offer>(defaultOffer);
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
  }, [user]);

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

  const updateCompanyInfo = useCallback((info: Partial<CompanyInfo>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      company: { ...prev.company, ...info },
    }));
  }, [markUserInteraction]);

  const updateClientInfo = useCallback((info: Partial<ClientInfo>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      client: { ...prev.client, ...info },
    }));
  }, [markUserInteraction]);

  const updateOfferDetails = useCallback((details: Partial<OfferDetails>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      details: { ...prev.details, ...details },
    }));
  }, [markUserInteraction]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    markUserInteraction();
    const newProduct = { ...product, id: uuidv4() };
    setOffer((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  }, [markUserInteraction]);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
    }));
  }, [markUserInteraction]);

  const removeProduct = useCallback((id: string) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, [markUserInteraction]);
  
  const clearProducts = useCallback(() => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: [],
    }));
  }, [markUserInteraction]);
  
  const resetProducts = useCallback((products: Product[]) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: products,
    }));
  }, [markUserInteraction]);

  const calculateOfferSubtotal = useCallback(() => {
    return calculateSubtotal(offer);
  }, [offer]);

  const calculateOfferVat = useCallback(() => {
    return calculateVat(offer);
  }, [offer]);

  const calculateOfferTotal = useCallback(() => {
    return calculateTotal(offer);
  }, [offer]);

  const resetOffer = useCallback(async () => {
    setOffer(defaultOffer);
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

  // New function to apply a template to the current offer
  const applyTemplate = useCallback((template: Partial<Offer>) => {
    markUserInteraction();
    setOffer((prev) => {
      const updatedOffer = { ...prev };
      
      // Apply template details if provided
      if (template.details) {
        updatedOffer.details = {
          ...prev.details,
          ...template.details
        };
      }
      
      // Apply template products if provided
      if (template.products && template.products.length > 0) {
        updatedOffer.products = template.products;
      }
      
      return updatedOffer;
    });
  }, [markUserInteraction]);

  // Add functions to window for global access
  if (typeof window !== 'undefined') {
    window.updateCompanyInfo = updateCompanyInfo;
    window.updateClientInfo = updateClientInfo;
    window.updateOfferDetails = updateOfferDetails;
    window.addProduct = addProduct;
    window.clearProducts = clearProducts;
    window.resetProducts = resetProducts;
  }

  return (
    <OfferContext.Provider
      value={{
        offer,
        setOffer,
        updateCompanyInfo,
        updateClientInfo,
        updateOfferDetails,
        addProduct,
        updateProduct,
        removeProduct,
        clearProducts,
        resetProducts,
        calculateSubtotal: calculateOfferSubtotal,
        calculateVat: calculateOfferVat,
        calculateTotal: calculateOfferTotal,
        resetOffer,
        applyTemplate,
        isDirty,
        isAutoSaving,
        lastSaved,
        autoSaveEnabled,
        saveDraft,
        toggleAutoSave,
        hasUserInteracted,
        createdAt
      }}
    >
      {children}
    </OfferContext.Provider>
  );
}

export function useOffer() {
  const context = useContext(OfferContext);
  if (context === undefined) {
    throw new Error('useOffer must be used within an OfferProvider');
  }
  return context;
}
