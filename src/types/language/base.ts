
export type Language = 'en' | 'bg';
export type SupportedLanguage = Language;
export type SupportedCurrency = 'BGN' | 'EUR' | 'USD';

export interface Translations {
  auth: any;
  client: any;
  common: any;
  company: any;
  offer: any;
  settings: any;
  user: any;
  home: any;
  savedOffers: any;
  products?: any; // Adding this for product-related translations
  savedProducts?: any; // Adding this for saved products translations
  savedClients?: any; // Adding this for saved clients translations
  dashboard?: any; // For dashboard translations
  clientInfo?: any; // For client info form translations
  companyInfo?: any; // For company info form translations
  offerDetails?: any; // For offer details form translations
  totals?: any; // For totals section translations
}
