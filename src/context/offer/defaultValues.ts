
import { Offer } from '../../types/offer';

export const defaultCompany = {
  name: '',
  address: '',
  city: '',
  country: '',
  vatNumber: '',
  eikNumber: '',
  phone: '',
  email: '',
  website: '',
  logo: null
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
  currency: 'BGN'
};

export const defaultOffer: Offer = {
  company: defaultCompany,
  client: defaultClient,
  products: [],
  details: defaultOfferDetails
};
