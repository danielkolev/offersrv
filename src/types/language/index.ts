
import { AuthTranslations } from './auth';
import { ClientTranslations, SavedClientsTranslations, ClientInfoTranslations } from './client';
import { CommonTranslations } from './common';
import { CompanyTranslations } from './company';
import { OfferTranslations } from './offer';
import { SavedOffersTranslations } from './savedOffers';
import { SavedProductsTranslations } from './savedProducts';
import { ProductsTranslations } from './products';
import { SettingsTranslations } from './settings';
import { UserTranslations } from './user';
import { SupportedLanguage, SupportedCurrency, Translations } from './base';
import { CompanyInfoTranslations } from './companyInfo';

export interface HomeType {
  quickActions: string;
  createOfferDescription: string;
  createClientDescription: string;
  createProductDescription: string;
  templatesDescription: string;
  noRecentOffers: string;
  noRecentClients: string;
}

// Export all types for easy access
export type {
  SupportedLanguage,
  SupportedCurrency,
  Translations,
  AuthTranslations,
  ClientTranslations,
  CommonTranslations,
  CompanyTranslations,
  OfferTranslations,
  SettingsTranslations,
  UserTranslations,
  CompanyInfoTranslations,
  HomeType,
  SavedOffersTranslations,
  SavedClientsTranslations,
  ClientInfoTranslations,
  SavedProductsTranslations,
  ProductsTranslations
};
