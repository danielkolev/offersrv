import { 
  ClientTranslations, 
  ClientInfoTranslations, 
  CompanyInfoTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const enClientTranslations: ClientTranslations = {
  title: 'Clients',
  addClient: 'Add Client',
  editClient: 'Edit Client',
  deleteClient: 'Delete Client',
  deleteConfirmation: 'Are you sure you want to delete this client?',
  noClientsFound: 'No clients found',
  noClientsFoundSearch: 'No clients found matching your search',
  searchPlaceholder: 'Search clients',
  clientName: 'Client Name',
  vatNumber: 'VAT Number',
  contactPerson: 'Contact Person',
  actions: 'Actions',
  search: 'Search',
  createNew: 'Create New Client',
  clientCreated: 'Client created successfully',
  clientUpdated: 'Client updated successfully',
  clientDeleted: 'Client deleted successfully'
};

export const enCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Company Information',
  name: 'Company Name',
  address: 'Address',
  city: 'City',
  country: 'Country',
  vatNumber: 'VAT Number',
  phone: 'Phone',
  email: 'Email',
  website: 'Website',
  logo: 'Logo',
  selectLogo: 'Select Logo',
  changeLogo: 'Change Logo',
  removeLogo: 'Remove Logo',
  companyUpdated: 'Company information updated successfully'
};

export const enSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Saved Clients',
  loadClient: 'Load Client',
  saveClient: 'Save Client',
  deleteClient: 'Delete Client',
  clientSaved: 'Client saved successfully',
  clientDeleted: 'Client deleted successfully',
  noClientsFound: 'No saved clients found',
  noClientsFoundSearch: 'No clients found matching your search',
  confirmDelete: 'Are you sure you want to delete this client?',
  date: 'Date',
  client: 'Client',
  contact: 'Contact',
  actions: 'Actions',
  search: 'Search',
  searchPlaceholder: 'Search by client name, VAT number or contact person',
  clientName: 'Client Name',
  contactName: 'Contact Name',
  createNew: 'Create New Client',
  clientLoaded: 'Client loaded successfully',
  viewClient: 'View Client'
};

export const enClientInfoTranslations: ClientInfoTranslations = {
  title: 'Client Information',
  name: 'Client Name',
  namePlaceholder: 'Enter client name',
  contactPerson: 'Contact Person',
  contactPersonPlaceholder: 'Enter contact person name',
  address: 'Address',
  addressPlaceholder: 'Enter client address',
  city: 'City',
  cityPlaceholder: 'Enter city',
  country: 'Country',
  countryPlaceholder: 'Enter country',
  vatNumber: 'VAT Number',
  vatNumberPlaceholder: 'Enter VAT number',
  email: 'Email',
  emailPlaceholder: 'Enter email address',
  phone: 'Phone',
  phonePlaceholder: 'Enter phone number',
  selectExisting: 'Select Existing Client',
  selectClient: 'Select a Client',
  searchClients: 'Search clients...'
};
