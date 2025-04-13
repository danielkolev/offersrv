
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Offer } from '@/types/offer';
import { OfferContextType } from './types';
import { defaultOffer } from './defaultValues';
import { calculateSubtotal, calculateVat, calculateTotal } from './calculations';
import { useDraftManagement } from './hooks/useDraftManagement';
import { useOfferActions } from './hooks/useOfferActions';

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offer, setOffer] = useState<Offer>(defaultOffer);

  const {
    isDirty,
    autoSaveEnabled,
    isAutoSaving,
    lastSaved,
    hasUserInteracted,
    createdAt,
    markUserInteraction,
    saveDraft,
    toggleAutoSave,
    resetDraftState
  } = useDraftManagement(offer, setOffer);

  const {
    updateCompanyInfo,
    updateClientInfo,
    updateOfferDetails,
    addProduct,
    updateProduct,
    removeProduct,
    clearProducts,
    resetProducts,
    applyTemplate
  } = useOfferActions(offer, setOffer, markUserInteraction);

  const calculateOfferSubtotal = () => calculateSubtotal(offer);
  const calculateOfferVat = () => calculateVat(offer);
  const calculateOfferTotal = () => calculateTotal(offer);

  const resetOffer = async () => {
    // Use resetDraftState which also sets offer to defaultOffer
    await resetDraftState();
  };

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
