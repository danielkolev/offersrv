
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Offer, CompanyInfo, ClientInfo, Product, OfferDetails } from '../types/offer';
import { v4 as uuidv4 } from 'uuid';

interface OfferContextType {
  offer: Offer;
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
}

const defaultCompany: CompanyInfo = {
  name: 'Your Company Name',
  address: 'Company Address',
  city: 'City',
  country: 'Country',
  vatNumber: 'VAT123456789',
  phone: '+1 234 567 890',
  email: 'contact@company.com',
  website: 'www.company.com',
  logo: null,
};

const defaultClient: ClientInfo = {
  name: 'Client Company',
  contactPerson: 'Contact Person',
  address: 'Client Address',
  city: 'Client City',
  country: 'Client Country',
  vatNumber: 'VAT987654321',
  email: 'client@example.com',
  phone: '+1 987 654 321',
};

const defaultDetails: OfferDetails = {
  offerNumber: '00001',
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  showPartNumber: true,
  includeVat: true,
  vatRate: 20,
  transportCost: 0,
  otherCosts: 0,
  notes: 'Delivery time: 7-14 working days after order confirmation.\nPayment terms: 100% advance payment.',
  offerLanguage: 'bg', // Default to Bulgarian
};

const defaultOffer: Offer = {
  company: defaultCompany,
  client: defaultClient,
  products: [
    {
      id: uuidv4(),
      name: 'Product 1',
      description: 'Description of product 1',
      partNumber: 'PN001',
      quantity: 1,
      unitPrice: 100
    }
  ],
  details: defaultDetails,
};

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

  const calculateSubtotal = () => {
    return offer.products.reduce((sum, product) => {
      return sum + product.quantity * product.unitPrice;
    }, 0);
  };

  const calculateVat = () => {
    return offer.details.includeVat ? calculateSubtotal() * (offer.details.vatRate / 100) : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const vat = calculateVat();
    return subtotal + vat + offer.details.transportCost + offer.details.otherCosts;
  };

  const resetOffer = () => {
    setOffer(defaultOffer);
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
        updateCompanyInfo,
        updateClientInfo,
        updateOfferDetails,
        addProduct,
        updateProduct,
        removeProduct,
        clearProducts,
        resetProducts,
        calculateSubtotal,
        calculateVat,
        calculateTotal,
        resetOffer,
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
