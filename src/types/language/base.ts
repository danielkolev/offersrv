
import { AuthType, ClientType, CommonType, CompanyType, OfferType, SettingsType, UserType, HomeType, SavedOffersType, SavedClientsTranslations, ClientInfoTranslations, SavedProductsTranslations, ProductsTranslations, CompanyInfoType } from './index';

export type SupportedLanguage = 'en' | 'bg';
export type SupportedCurrency = 'USD' | 'EUR' | 'BGN';

export interface Translations {
  auth: AuthType;
  client: ClientType;
  common: CommonType;
  company: CompanyType;
  offer: OfferType;
  settings: SettingsType;
  user: UserType;
  home: HomeType;
  savedOffers: SavedOffersType;
  clientInfo: ClientInfoTranslations;
  savedClients: SavedClientsTranslations;
  savedProducts: SavedProductsTranslations;
  products: ProductsTranslations;
  offerDetails: any; // Using any until we create a proper type
  totals: any; // Using any until we create a proper type
  companyInfo: CompanyInfoType;
}
