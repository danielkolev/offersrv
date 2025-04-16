
import { CompanyInfoTranslations } from '@/types/language/companyInfo';

export const enCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Company Information',
  description: 'Enter your company information',
  name: 'Company Name',
  vatNumber: 'VAT Number',
  eikNumber: 'EIK Number', // Added EIK field
  address: 'Address',
  city: 'City',
  country: 'Country',
  phone: 'Phone Number',
  email: 'Email Address',
  website: 'Website',
  logo: 'Company Logo',
  uploadLogo: 'Upload Logo',
  removeLogo: 'Remove Logo',
  slogan: 'Company Slogan',
  sloganPlaceholder: 'Enter a slogan or tagline for your company'
};

// Export for use in the main language file
export const companyInfo = enCompanyInfoTranslations;
