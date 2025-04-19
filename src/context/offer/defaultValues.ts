import { Offer } from '../../types/offer';

export const defaultCompany = {
  name: '',
  nameEn: '',
  address: '',
  addressEn: '',
  city: '',
  cityEn: '',
  country: '',
  countryEn: '',
  vatNumber: '',
  eikNumber: '',
  phone: '',
  email: '',
  website: '',
  logo_url: null,
  logo_url_en: null,
  slogan: '',
  slogan_en: '',
  conclusion_text: '',
  conclusion_text_en: ''
};

export const defaultClient = {
  name: '',
  contactPerson: '',
  address: '',
  city: '',
  country: '',
  vatNumber: '',
  eikNumber: '',
  email: '',
  phone: ''
};

export const defaultOfferDetails = {
  offerNumber: '',
  date: new Date().toISOString().substring(0, 10),
  validUntil: '',
  showPartNumber: false,
  includeVat: true,
  vatRate: 20,
  transportCost: 0,
  otherCosts: 0,
  notes: '',
  offerLanguage: 'bg' as 'bg' | 'en',
  currency: 'BGN' as 'BGN' | 'EUR' | 'USD',
  // New default values
  specialDiscounts: [],
  showDigitalSignature: false,
  customFooterText: ''
};

export const defaultOffer: Offer = {
  company: defaultCompany,
  client: defaultClient,
  products: [],
  details: defaultOfferDetails
};
