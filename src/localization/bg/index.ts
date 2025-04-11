
import { Translations } from '@/types/language';
import { bgCommonTranslations } from './common';
import { bgAuthTranslations } from './auth';
import { bgUserTranslations } from './user';
import { bgCompanyTranslations } from './company';
import { 
  bgClientTranslations, 
  bgClientInfoTranslations, 
  bgCompanyInfoTranslations,
  bgSavedClientsTranslations
} from './client';
import { 
  bgOfferTranslations, 
  bgOfferDetailsTranslations, 
  bgProductsTranslations, 
  bgTotalsTranslations,
  bgSavedOffersTranslations,
  bgSavedProductsTranslations
} from './offer';
import { bgSettingsTranslations } from './settings';

export const bgTranslations: Translations = {
  offerTitle: 'Създай професионални оферти мигновено',
  common: bgCommonTranslations,
  auth: bgAuthTranslations,
  user: bgUserTranslations,
  company: bgCompanyTranslations,
  client: bgClientTranslations,
  clientInfo: bgClientInfoTranslations,
  companyInfo: bgCompanyInfoTranslations,
  offer: bgOfferTranslations,
  offerDetails: bgOfferDetailsTranslations,
  products: bgProductsTranslations,
  totals: bgTotalsTranslations,
  savedOffers: bgSavedOffersTranslations,
  savedClients: bgSavedClientsTranslations,
  savedProducts: bgSavedProductsTranslations,
  settings: bgSettingsTranslations
};
