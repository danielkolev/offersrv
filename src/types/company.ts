
export interface Company {
  id: string;
  name: string;
  vat_number?: string;
  company_id?: string; // Changed from eik_number
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string | null;
  logo_url_en?: string | null; // Added English logo
  created_at?: string;
  updated_at?: string;
  owner_id?: string;
  slogan?: string;
  slogan_en?: string; // Added English slogan
  conclusion_text?: string;
  conclusion_text_en?: string; // Added English conclusion text
  
  // English translations
  name_en?: string;
  address_en?: string;
  city_en?: string;
  country_en?: string;
}

export interface CompanyMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'admin' | 'member';
  created_at?: string;
  updated_at?: string;
}
