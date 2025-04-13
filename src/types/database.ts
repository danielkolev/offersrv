
import { Offer } from './offer';

export interface SavedOffer {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  offer_data: Offer;
  meta_info?: any;
  is_template?: boolean;
  is_draft?: boolean;
  is_default?: boolean; 
  name?: string;
  status?: 'draft' | 'saved' | 'sent' | 'accepted' | 'rejected';
  draft_code?: string;
  description?: string;
  settings?: any;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  vat_number?: string | null;
  eik_number?: string | null;
  contact_person?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  email?: string | null;
  phone?: string | null;
  created_at: string;
  updated_at: string;
}

export interface SavedProduct {
  id: string;
  user_id: string;
  name: string;
  description?: string | null;
  part_number?: string | null;
  unit_price: number;
  created_at: string;
  updated_at: string;
}
