import { CompanyTranslations } from '@/types/language/company';

export const enCompanyTranslations: CompanyTranslations = {
  createCompany: 'Create Company',
  editCompany: 'Edit Company',
  updateCompany: 'Update Company',
  companyName: 'Company Name',
  companyAddress: 'Address',
  companyCity: 'City',
  companyCountry: 'Country',
  companyVatNumber: 'VAT Number',
  companyPhone: 'Phone',
  companyEmail: 'Email',
  companyWebsite: 'Website',
  companyLogo: 'Logo',
  uploadLogo: 'Upload Logo',
  removeLogo: 'Remove Logo',
  selectCompany: 'Select Company',
  noCompanies: 'No companies found',
  createFirst: 'Create your first company',
  companyCreated: 'Company created successfully',
  companyUpdated: 'Company updated successfully',
  selectFirst: 'Please select a company to continue',
  companySettings: 'Company Settings',
  deleteCompany: 'Delete Company',
  confirmDelete: 'Are you sure you want to delete this company? This action cannot be undone.',
  companyDeleted: 'Company deleted successfully',
  manageCompanies: 'Manage Companies',
  
  // Adding new properties
  create: 'Create Company',
  createButton: 'Create Company Profile',
  updateButton: 'Update Company',
  manage: 'Manage Companies',
  info: 'Manage your company information',
  error: 'Error',
  success: 'Success',
  nameRequired: 'Company name is required',
  createdSuccessfully: 'Company created successfully',
  useSelector: 'Use the company selector above to continue',
  
  // Placeholder texts
  namePlaceholder: 'Enter company name',
  vatPlaceholder: 'Enter VAT number',
  eikPlaceholder: 'Enter EIK number', // Added EIK placeholder
  addressPlaceholder: 'Enter company address',
  cityPlaceholder: 'Enter city',
  countryPlaceholder: 'Enter country',
  phonePlaceholder: 'Enter phone number',
  emailPlaceholder: 'Enter email address',
  websitePlaceholder: 'Enter website URL',
  selectPlaceholder: 'Select a company',
  createNew: 'Create New Company',
  
  // Adding title translation
  title: 'Company',
  
  welcome: "Welcome to Offersrv",
  noCompanyFound: "No company found. Please create a company first.",
};

// Export for use in the main language file
export const company = enCompanyTranslations;
