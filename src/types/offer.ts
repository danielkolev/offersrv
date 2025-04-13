
export interface CompanyInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  eikNumber?: string; // Added EIK field
  phone: string;
  email: string;
  website: string;
  logo: string | null;
  slogan?: string; // Added company slogan field
}

export interface ClientInfo {
  name: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  eikNumber?: string; // Added EIK field
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
  unit?: string; // Field for measurement (pcs, hours, etc.)
  isBundle?: boolean; // Flag to indicate if this is a bundle
  bundledProducts?: BundledProduct[]; // Products included in a bundle
  showBundledPrices?: boolean; // Flag to control visibility of bundled product prices
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
  currency?: 'BGN' | 'EUR' | 'USD'; // Added currency field
}

export interface Offer {
  company: CompanyInfo;
  client: ClientInfo;
  products: Product[];
  details: OfferDetails;
  name?: string; // Added optional name field for the offer
  createdAt?: string; // Added creation timestamp
  lastEdited?: string; // Added last edited timestamp
  templateId?: string; // Added template ID
  templateSettings?: any; // Added template settings
}
