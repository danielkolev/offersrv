export interface Company {
  id: string;
  // Basic Info - Bulgarian
  name: string;
  address?: string;
  city?: string;
  country?: string;
  slogan?: string;
  conclusion_text?: string;
  
  // Basic Info - English
  name_en?: string;
  address_en?: string;
  city_en?: string;
  country_en?: string;
  slogan_en?: string;
  conclusion_text_en?: string;
  
  // Common fields (language independent)
  vat_number?: string;
  company_id?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string | null;
  logo_url_en?: string | null;
  
  created_at?: string;
  updated_at?: string;
  owner_id?: string;
}

export interface CompanyMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'admin' | 'member';
  created_at?: string;
  updated_at?: string;
}

