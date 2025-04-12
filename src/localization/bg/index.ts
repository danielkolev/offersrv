
import { auth } from './auth';
import { client } from './client';
import { common } from './common';
import { company } from './company';
import { offer } from './offer';
import { settings } from './settings';
import { user } from './user';
import { home } from './home';
import { savedOffers } from './savedOffers';

export const bg = {
  auth,
  client,
  common,
  company,
  offer,
  settings,
  user,
  home,
  savedOffers
};

// Export as a named export for consistency
export const bgTranslations = bg;
