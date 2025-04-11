
import { CommonTranslations } from './common';
import { AuthTranslations } from './auth';
import { UserTranslations } from './user';
import { CompanyTranslations } from './company';
import { ClientTranslations, ClientInfoTranslations, CompanyInfoTranslations, SavedClientsTranslations } from './client';
import { 
  OfferTranslations, 
  OfferDetailsTranslations, 
  ProductsTranslations, 
  TotalsTranslations,
  SavedOffersTranslations,
  SavedProductsTranslations 
} from './offer';

export interface Translations {
  offerTitle: string;
  common: CommonTranslations;
  auth: AuthTranslations;
  user: UserTranslations;
  company: CompanyTranslations;
  client: ClientTranslations;
  clientInfo: ClientInfoTranslations;
  companyInfo: CompanyInfoTranslations;
  offer: OfferTranslations;
  offerDetails: OfferDetailsTranslations;
  products: ProductsTranslations;
  totals: TotalsTranslations;
  savedOffers: SavedOffersTranslations;
  savedClients: SavedClientsTranslations;
  savedProducts: SavedProductsTranslations;
}

// Re-export the types with proper syntax for isolatedModules
export type { Language, SupportedLanguage, SupportedCurrency } from './base';
