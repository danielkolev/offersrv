
export interface Company {
  id: string;
  name: string;
  vat_number?: string;
  eik_number?: string; 
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string | null;
  created_at?: string;
  updated_at?: string;
  owner_id?: string;
  slogan?: string;
  conclusion_text?: string; // New field for conclusion text
  
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
