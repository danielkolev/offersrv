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

  const { createNewOffer, saveOffer } = useOfferActions();

  // These functions should be implemented properly, but for now we'll keep stub implementations
  const updateCompanyInfo = (data: any) => {
    setOffer(prev => ({ ...prev, companyInfo: { ...prev.companyInfo, ...data } }));
    markUserInteraction();
  };

  const updateClientInfo = (data: any) => {
    setOffer(prev => ({ ...prev, clientInfo: { ...prev.clientInfo, ...data } }));
    markUserInteraction();
  };

  const updateOfferDetails = (data: any) => {
    setOffer(prev => ({ ...prev, details: { ...prev.details, ...data } }));
    markUserInteraction();
  };

  const addProduct = (product: any) => {
    setOffer(prev => ({ ...prev, products: [...prev.products, product] }));
    markUserInteraction();
  };

  const updateProduct = (index: number, product: any) => {
    setOffer(prev => {
      const products = [...prev.products];
      products[index] = product;
      return { ...prev, products };
    });
    markUserInteraction();
  };

  const removeProduct = (index: number) => {
    setOffer(prev => {
      const products = [...prev.products];
      products.splice(index, 1);
      return { ...prev, products };
    });
    markUserInteraction();
  };

  const clearProducts = () => {
    setOffer(prev => ({ ...prev, products: [] }));
    markUserInteraction();
  };

  const resetProducts = () => {
    setOffer(prev => ({ ...prev, products: defaultOffer.products }));
    markUserInteraction();
  };

  const applyTemplate = (template: any) => {
    // Implement this later
    console.log("Applying template:", template);
    markUserInteraction();
  };

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
        createdAt,
        createNewOffer,
        saveOffer
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
