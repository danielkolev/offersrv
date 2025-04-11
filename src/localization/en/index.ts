
import { Translations } from '@/types/language';
import { enCommonTranslations } from './common';
import { enAuthTranslations } from './auth';
import { enUserTranslations } from './user';
import { enCompanyTranslations } from './company';
import { 
  enClientTranslations, 
  enClientInfoTranslations, 
  enCompanyInfoTranslations,
  enSavedClientsTranslations
} from './client';
import { 
  enOfferTranslations, 
  enOfferDetailsTranslations, 
  enProductsTranslations, 
  enTotalsTranslations,
  enSavedOffersTranslations,
  enSavedProductsTranslations
} from './offer';
import { enSettingsTranslations } from './settings';

export const enTranslations: Translations = {
  offerTitle: 'Create Professional Offers Instantly',
  common: enCommonTranslations,
  auth: enAuthTranslations,
  user: enUserTranslations,
  company: enCompanyTranslations,
  client: enClientTranslations,
  clientInfo: enClientInfoTranslations,
  companyInfo: enCompanyInfoTranslations,
  offer: enOfferTranslations,
  offerDetails: enOfferDetailsTranslations,
  products: enProductsTranslations,
  totals: enTotalsTranslations,
  savedOffers: enSavedOffersTranslations,
  savedClients: enSavedClientsTranslations,
  savedProducts: enSavedProductsTranslations,
  settings: enSettingsTranslations
};
