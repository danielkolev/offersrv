
import { CommonTranslations } from './common';
import { AuthTranslations } from './auth';
import { UserTranslations } from './user';
import { CompanyTranslations } from './company';
import { ClientTranslations, ClientInfoTranslations, CompanyInfoTranslations } from './client';
import { OfferTranslations, OfferDetailsTranslations, ProductsTranslations, TotalsTranslations } from './offer';
import { Language, SupportedLanguage, SupportedCurrency } from './base';

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
}

// Re-export everything from base.ts
export { Language, SupportedLanguage, SupportedCurrency };
