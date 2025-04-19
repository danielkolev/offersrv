import { AuthTranslations } from './auth';
import { CommonTranslations } from './common';
import { CompanyTranslations } from './company';
import { OfferTranslations } from './offer';
import { SettingsTranslations } from './settings';
import { UserTranslations } from './user';
import { ClientTranslations } from './client';
import { HomeTranslations } from './home';
import { SavedOffersTranslations } from './savedOffers';
import { ClientInfoTranslations } from './clientInfo';
import { SavedClientsTranslations } from './savedClients';
import { SavedProductsTranslations } from './savedProducts';
import { ProductsTranslations } from './products';
import { OfferDetailsTranslations } from './offerDetails';
import { TotalsTranslations } from './totals';
import { CompanyInfoTranslations } from './companyInfo';
import { NavigationTranslations } from './navigation';

export type SupportedLanguage = 'bg' | 'en';
export type SupportedCurrency = 'BGN' | 'EUR' | 'USD';

export interface Translations {
  auth: AuthTranslations;
  common: CommonTranslations;
  company: CompanyTranslations;
  offer: OfferTranslations;
  settings: SettingsTranslations;
  user: UserTranslations;
  client: ClientTranslations;
  home: HomeTranslations;
  savedOffers: SavedOffersTranslations;
  clientInfo: ClientInfoTranslations;
  savedClients: SavedClientsTranslations;
  savedProducts: SavedProductsTranslations;
  products: ProductsTranslations;
  offerDetails: OfferDetailsTranslations;
  totals: TotalsTranslations;
  companyInfo: CompanyInfoTranslations;
  navigation: NavigationTranslations;
}
