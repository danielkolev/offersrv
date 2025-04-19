
export interface Company {
  id?: string;
  name: string;
  nameEn?: string;
  vatNumber?: string;
  eikNumber?: string;
  address?: string;
  addressEn?: string;
  city?: string;
  cityEn?: string;
  country?: string;
  countryEn?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string | null;
  logo_url_en?: string | null;
  slogan?: string;
  slogan_en?: string;
  conclusion_text?: string;
  conclusion_text_en?: string;
}
