
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
  offerLanguage: 'bg',
  currency: 'BGN'
};

export const defaultOffer: Offer = {
  company: {
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
  },
  client: {
    name: '',
    contactPerson: '',
    address: '',
    city: '',
    country: '',
    vatNumber: '',
    eikNumber: '',
    email: '',
    phone: ''
  },
  products: [],
  details: {
    offerNumber: '',
    date: new Date().toISOString().substring(0, 10),
    validUntil: '',
    showPartNumber: false,
    includeVat: true,
    vatRate: 20,
    transportCost: 0,
    otherCosts: 0,
    notes: '',
    offerLanguage: 'bg',
    currency: 'BGN'
  }
};
