import { 
  ClientTranslations, 
  ClientInfoTranslations, 
  CompanyInfoTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const enClientTranslations: ClientTranslations = {
  info: 'Client Information',
  name: 'Name',
  vatNumber: 'VAT Number',
  address: 'Address',
  email: 'Email',
  contactPerson: 'Contact Person',
  city: 'City',
  country: 'Country',
  phone: 'Phone'
};

export const enClientInfoTranslations: ClientInfoTranslations = {
  title: 'Client Information',
  name: 'Client Name',
  vatNumber: 'VAT Number',
  address: 'Address',
  contactPerson: 'Contact Person',
  city: 'City',
  country: 'Country',
  email: 'Email',
  phone: 'Phone'
};

export const enCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Company Information',
  name: 'Company Name',
  vatNumber: 'VAT Number',
  address: 'Address',
  city: 'City',
  country: 'Country',
  phone: 'Phone',
  email: 'Email',
  website: 'Website',
  logo: 'Logo',
  uploadLogo: 'Upload Logo'
};

export const enSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Saved Clients',
  searchPlaceholder: 'Search clients',
  noClientsFound: 'No saved clients found',
  addClient: 'Add Client',
  editClient: 'Edit Client',
  deleteClient: 'Delete Client',
  deleteConfirmation: 'Are you sure you want to delete this client?',
  searchByName: 'Search by name',
  searchByVat: 'Search by VAT number',
  importFromOffer: 'Import from offer',
  selectClient: 'Select',
  cancel: 'Cancel'
};
