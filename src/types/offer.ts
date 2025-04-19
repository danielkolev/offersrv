
export interface CompanyInfo {
  id?: string;
  name: string;
  nameEn?: string;
  address: string;
  addressEn?: string;
  city: string;
  cityEn?: string;
  country: string;
  countryEn?: string;
  vatNumber: string;
  eikNumber?: string;
  phone: string;
  email: string;
  website: string;
  logo_url?: string | null;
  logo_url_en?: string | null;
  slogan?: string;
  slogan_en?: string;
  conclusion_text?: string;
  conclusion_text_en?: string;
  // Adding aliases for backward compatibility
  logo?: string | null; // Alias for logo_url
  conclusionText?: string; // Alias for conclusion_text
  // Russian language fields
  name_ru?: string;
  address_ru?: string;
  city_ru?: string;
  country_ru?: string;
  logo_url_ru?: string | null;
  slogan_ru?: string;
  conclusion_text_ru?: string;
}

export interface ClientInfo {
  name: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  eikNumber?: string;
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
  offerLanguage: 'bg' | 'en' | 'ru'; // Added Russian
  currency?: 'BGN' | 'EUR' | 'USD'; // Currency field
  // New fields for payment and delivery terms
  paymentTerms?: string;
  customPaymentTerms?: string;
  deliveryTerms?: string;
  customDeliveryTerms?: string;
  discount?: number; // Discount percentage
  version?: number; // Version tracking
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
  version?: number; // Version number of the offer
  previousVersions?: string[]; // IDs of previous versions
}
