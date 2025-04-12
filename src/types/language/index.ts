
import { AuthType } from './auth';
import { ClientType } from './client';
import { CommonType } from './common';
import { CompanyType } from './company';
import { OfferType } from './offer';
import { SettingsType } from './settings';
import { UserType } from './user';

export interface HomeType {
  quickActions: string;
  createOfferDescription: string;
  createClientDescription: string;
  createProductDescription: string;
  templatesDescription: string;
  noRecentOffers: string;
  noRecentClients: string;
}

export interface SavedOffersType {
  title: string;
  saveOffer: string;
  recentOffers: string;
}

export interface LanguageType {
  auth: AuthType;
  client: ClientType;
  common: CommonType;
  company: CompanyType;
  offer: OfferType;
  settings: SettingsType;
  user: UserType;
  home: HomeType;
  savedOffers: SavedOffersType;
}
