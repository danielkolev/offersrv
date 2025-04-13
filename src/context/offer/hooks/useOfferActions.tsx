
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Offer, CompanyInfo, ClientInfo, OfferDetails, Product } from '@/types/offer';

export interface OfferActions {
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updateClientInfo: (info: Partial<ClientInfo>) => void;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
  resetProducts: (products: Product[]) => void;
  applyTemplate: (template: Partial<Offer>) => void;
}

export function useOfferActions(
  offer: Offer,
  setOffer: React.Dispatch<React.SetStateAction<Offer>>,
  markUserInteraction: () => void
): OfferActions {
  const updateCompanyInfo = useCallback((info: Partial<CompanyInfo>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      company: { ...prev.company, ...info },
    }));
  }, [markUserInteraction, setOffer]);

  const updateClientInfo = useCallback((info: Partial<ClientInfo>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      client: { ...prev.client, ...info },
    }));
  }, [markUserInteraction, setOffer]);

  const updateOfferDetails = useCallback((details: Partial<OfferDetails>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      details: { ...prev.details, ...details },
    }));
  }, [markUserInteraction, setOffer]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    markUserInteraction();
    const newProduct = { ...product, id: uuidv4() };
    setOffer((prev) => ({
      ...prev,
      products: [...prev.products, newProduct],
    }));
  }, [markUserInteraction, setOffer]);

  const updateProduct = useCallback((id: string, product: Partial<Product>) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...product } : p)),
    }));
  }, [markUserInteraction, setOffer]);

  const removeProduct = useCallback((id: string) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, [markUserInteraction, setOffer]);
  
  const clearProducts = useCallback(() => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: [],
    }));
  }, [markUserInteraction, setOffer]);
  
  const resetProducts = useCallback((products: Product[]) => {
    markUserInteraction();
    setOffer((prev) => ({
      ...prev,
      products: products,
    }));
  }, [markUserInteraction, setOffer]);

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
  }, [markUserInteraction, setOffer]);

  return {
    updateCompanyInfo,
    updateClientInfo,
    updateOfferDetails,
    addProduct,
    updateProduct,
    removeProduct,
    clearProducts,
    resetProducts,
    applyTemplate
  };
}
