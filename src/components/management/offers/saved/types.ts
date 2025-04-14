
import { SavedOffer } from '@/types/database';
import { Offer } from '@/types/offer';
import { ClientInfo, Product } from '@/types/offer';

// Constants
export const SAVED_OFFER_KEY = 'saved_offer';

// Types
export interface SaveOptions {
  name?: string;
  status?: 'saved' | 'draft' | 'sent' | 'accepted' | 'rejected';
}

export interface ClientSaveOptions {
  checkExisting?: boolean;
}

export interface ProductSaveOptions {
  skipBundles?: boolean;
}
