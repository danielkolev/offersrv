
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Offer, CompanyInfo, ClientInfo, Product, OfferDetails } from '../../types/offer';
import { v4 as uuidv4 } from 'uuid';
import { OfferContextType } from './types';
import { defaultOffer } from './defaultValues';
import { calculateSubtotal, calculateVat, calculateTotal } from './calculations';

const OfferContext = createContext<OfferContextType | undefined>(undefined);

export function OfferProvider({ children }: { children: ReactNode }) {
  const [offer, setOffer] = useState<Offer>(defaultOffer);

  const updateCompanyInfo = (info: Partial<CompanyInfo>) => {
    setOffer((prev) => ({
      ...prev,
      company: { ...prev.company, ...info },
    }));
  };

  const updateClientInfo = (info: Partial<ClientInfo>) => {
    setOffer((prev) => ({
      ...prev,
      client: { ...prev.client, ...info },
    }));
  };

  const updateOfferDetails = (details: Partial<OfferDetails>) => {
    setOffer((prev) => ({
      ...prev,
      details: { ...prev.details, ...details },
    }));
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: uuidv4() };
    setOffer((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  };

  const updateProduct = (id: string, product: Partial<Product>) => {
    setOffer((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
    }));
  };

  const removeProduct = (id: string) => {
    setOffer((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  };
  
  const clearProducts = () => {
    setOffer((prev) => ({
      ...prev,
      products: [],
    }));
  };
  
  const resetProducts = (products: Product[]) => {
    setOffer((prev) => ({
      ...prev,
      products: products,
    }));
  };

  const calculateOfferSubtotal = () => {
    return calculateSubtotal(offer);
  };

  const calculateOfferVat = () => {
    return calculateVat(offer);
  };

  const calculateOfferTotal = () => {
    return calculateTotal(offer);
  };

  const resetOffer = () => {
    setOffer(defaultOffer);
  };

  // New function to apply a template to the current offer
  const applyTemplate = (template: Partial<Offer>) => {
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
  };

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
        setOffer, // Add setOffer to the context value
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
        applyTemplate
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
