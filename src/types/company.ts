
export interface Company {
  id: string;
  name: string;
  vat_number?: string;
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
}

export interface CompanyMember {
  id: string;
  user_id: string;
  organization_id: string;
  role: 'admin' | 'member';
  created_at?: string;
  updated_at?: string;
}
