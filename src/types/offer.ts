
export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  phone: string;
  email: string;
  website: string;
  logo: string | null;
}

export interface ClientInfo {
  name: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  email: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  partNumber?: string;
  quantity: number;
  unitPrice: number;
  unit?: string; // Added unit field for measurement (pcs, hours, etc.)
  isBundle?: boolean; // Flag to indicate if this is a bundle
  bundledProducts?: BundledProduct[]; // Products included in a bundle
  showBundledPrices?: boolean; // New flag to control visibility of bundled product prices
}

// New interface for products within a bundle
export interface BundledProduct {
  id: string;
  name: string;
  description?: string;
  partNumber?: string;
  quantity: number;
  unitPrice: number;
}

export interface OfferDetails {
  offerNumber: string;
  date: string;
  validUntil: string;
  showPartNumber: boolean;
  includeVat: boolean;
  vatRate: number;
  transportCost: number;
  otherCosts: number;
  notes: string;
  offerLanguage: 'bg' | 'en';
}

export interface Offer {
  company: CompanyInfo;
  client: ClientInfo;
  products: Product[];
  details: OfferDetails;
  name?: string; // Added optional name field for the offer
  createdAt?: string; // Added creation timestamp
  lastEdited?: string; // Added last edited timestamp
}
