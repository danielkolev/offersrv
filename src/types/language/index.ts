
import { AuthTranslations } from './auth';
import { ClientTranslations, SavedClientsTranslations, ClientInfoTranslations } from './client';
import { CommonTranslations } from './common';
import { CompanyTranslations } from './company';
import { OfferTranslations, SavedOffersTranslations, SavedProductsTranslations, ProductsTranslations } from './offer';
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

// Update this interface to match SavedOffersTranslations
export type SavedOffersType = SavedOffersTranslations;

export type AuthType = AuthTranslations;
export type ClientType = ClientTranslations;
export type CommonType = CommonTranslations;
export type CompanyType = CompanyTranslations;
export type OfferType = OfferTranslations;
export type SettingsType = SettingsTranslations;
export type UserType = UserTranslations;
export type CompanyInfoType = CompanyInfoTranslations;

export type {
  SupportedLanguage,
  SupportedCurrency,
  Translations,
  SavedClientsTranslations,
  ClientInfoTranslations,
  SavedOffersTranslations,
  SavedProductsTranslations,
  ProductsTranslations
};
