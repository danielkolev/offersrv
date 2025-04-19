
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
  conclusion_text_en: '',
  // Russian language fields
  name_ru: '',
  address_ru: '',
  city_ru: '',
  country_ru: '',
  logo_url_ru: null,
  slogan_ru: '',
  conclusion_text_ru: ''
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
  offerLanguage: 'bg' as 'bg' | 'en' | 'ru',
  currency: 'BGN' as 'BGN' | 'EUR' | 'USD',
  // New payment and delivery terms fields
  paymentTerms: 'advance',
  customPaymentTerms: '',
  deliveryTerms: 'immediate',
  customDeliveryTerms: '',
  discount: 0,
  version: 1
};

export const defaultOffer: Offer = {
  company: defaultCompany,
  client: defaultClient,
  products: [],
  details: defaultOfferDetails,
  version: 1,
  previousVersions: []
};
