
export interface SavedOffer {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  offer_data: Offer;
  meta_info?: any;
  is_template?: boolean;
  is_draft?: boolean;
  is_default?: boolean; // Add this line
  name?: string;
  status?: 'draft' | 'saved' | 'sent' | 'accepted' | 'rejected';
  draft_code?: string;
  description?: string;
  settings?: any; // Add this line for template settings
}
