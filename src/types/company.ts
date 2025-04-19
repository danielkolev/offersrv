
export interface Company {
  id?: string;
  name: string;
  nameEn?: string;
  name_ru?: string;
  vatNumber?: string;
  eikNumber?: string;
  address?: string;
  addressEn?: string;
  address_ru?: string;
  city?: string;
  cityEn?: string;
  city_ru?: string;
  country?: string;
  countryEn?: string;
  country_ru?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo_url?: string | null;
  logo_url_en?: string | null;
  logo_url_ru?: string | null;
  slogan?: string;
  slogan_en?: string;
  slogan_ru?: string;
  conclusion_text?: string;
  conclusion_text_en?: string;
  conclusion_text_ru?: string;
}
