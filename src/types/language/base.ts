
import { 
  AuthTranslations,
  ClientTranslations,
  CommonTranslations,
  CompanyTranslations,
  OfferTranslations,
  SettingsTranslations,
  UserTranslations,
  HomeType,
  SavedOffersTranslations,
  SavedClientsTranslations,
  ClientInfoTranslations,
  SavedProductsTranslations,
  ProductsTranslations,
  CompanyInfoTranslations
} from './index';

export type SupportedLanguage = 'en' | 'bg';
export type SupportedCurrency = 'USD' | 'EUR' | 'BGN';

export interface Translations {
  auth: AuthTranslations;
  client: ClientTranslations;
  common: CommonTranslations;
  company: CompanyTranslations;
  offer: OfferTranslations;
  settings: SettingsTranslations;
  user: UserTranslations;
  home: HomeType;
  savedOffers: SavedOffersTranslations;
  clientInfo: ClientInfoTranslations;
  savedClients: SavedClientsTranslations;
  savedProducts: SavedProductsTranslations;
  products: ProductsTranslations;
  offerDetails: any; // Using any until we create a proper type
  totals: any; // Using any until we create a proper type
  companyInfo: CompanyInfoTranslations;
}
