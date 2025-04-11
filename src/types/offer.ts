
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
  description: string;
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
}

export interface Offer {
  company: CompanyInfo;
  client: ClientInfo;
  products: Product[];
  details: OfferDetails;
}
