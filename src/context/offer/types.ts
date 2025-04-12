
import { Offer, CompanyInfo, ClientInfo, Product, OfferDetails } from '../../types/offer';

export interface OfferContextType {
  offer: Offer;
  setOffer: (offer: Offer) => void;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  updateClientInfo: (info: Partial<ClientInfo>) => void;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  removeProduct: (id: string) => void;
  clearProducts: () => void;
  resetProducts: (products: Product[]) => void;
  calculateSubtotal: () => number;
  calculateVat: () => number;
  calculateTotal: () => number;
  resetOffer: () => void;
  applyTemplate: (template: Partial<Offer>) => void;
  // Draft-related properties and methods
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
  saveDraft: () => Promise<void>;
  toggleAutoSave: () => void;
}

// Extend Window interface
declare global {
  interface Window {
    updateCompanyInfo?: (info: Partial<CompanyInfo>) => void;
    updateClientInfo?: (info: Partial<ClientInfo>) => void;
    updateOfferDetails?: (details: Partial<OfferDetails>) => void;
    addProduct?: (product: Omit<Product, 'id'>) => void;
    clearProducts?: () => void;
    resetProducts?: (products: Product[]) => void;
  }
}
