
import { auth } from './auth';
import { client } from './client';
import { common } from './common';
import { company } from './company';
import { offer } from './offer';
import { settings } from './settings';
import { user } from './user';
import { home } from './home';
import { savedOffers } from './savedOffers';
import { clientInfo } from './clientInfo';
import { savedClients } from './savedClients';
import { savedProducts } from './savedProducts';
import { products } from './products';
import { offerDetails } from './offerDetails';

export const bg = {
  auth,
  client,
  common,
  company,
  offer,
  settings,
  user,
  home,
  savedOffers,
  clientInfo,
  savedClients,
  savedProducts,
  products,
  offerDetails
};

// Export as a named export for consistency
export const bgTranslations = bg;
