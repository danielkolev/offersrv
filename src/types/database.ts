
import { Offer, ClientInfo, Product } from './offer';

export interface SavedOffer {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  offer_data: Offer;
  meta_info?: any;
  is_template?: boolean;
  is_draft?: boolean; // Flag for draft offers
  name?: string;
  status?: 'draft' | 'saved' | 'sent' | 'accepted' | 'rejected'; // Added 'saved' status
  draft_code?: string; // Code for draft identification
  description?: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  contact_person: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  vat_number: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedProduct {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  part_number: string | null;
  unit_price: number;
  created_at: string;
  updated_at: string;
}
