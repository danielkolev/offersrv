
import { 
  ClientInfoTranslations,
  CompanyInfoTranslations,
  ClientTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const enClientInfoTranslations: ClientInfoTranslations = {
  title: 'Client Information',
  name: 'Client Name',
  contactPerson: 'Contact Person',
  address: 'Address',
  city: 'City',
  country: 'Country',
  vatNumber: 'VAT Number',
  email: 'Email',
  phone: 'Phone',
  selectExisting: 'Select Existing Client',
  selectClient: 'Select a Client',
  searchClients: 'Search clients by name or VAT number'
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
  uploadLogo: 'Upload Logo',
  removeLogo: 'Remove Logo'
};

export const enClientTranslations: ClientTranslations = {
  add: 'Add Client',
  edit: 'Edit Client',
  delete: 'Delete Client',
  save: 'Save Client',
  cancel: 'Cancel',
  confirmDelete: 'Are you sure you want to delete this client?',
  clientAdded: 'Client added successfully',
  clientUpdated: 'Client updated successfully',
  clientDeleted: 'Client deleted successfully'
};

export const enSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Saved Clients',
  loadClient: 'Load Client',
  saveClient: 'Save Client',
  deleteClient: 'Delete Client',
  clientSaved: 'Client saved successfully',
  clientDeleted: 'Client deleted successfully',
  noClientsFound: 'No clients found',
  noClientsFoundSearch: 'No clients found matching your search',
  confirmDelete: 'Are you sure you want to delete this client?',
  date: 'Date',
  name: 'Name',
  vatNumber: 'VAT Number',
  actions: 'Actions',
  search: 'Search',
  searchPlaceholder: 'Search by name or VAT number',
  createNew: 'Create New Client',
  clientLoaded: 'Client loaded successfully',
  addNewClient: 'Add New Client',
  editClient: 'Edit Client',
  importFromOffer: 'Import From Offer',
  searchByName: 'Search by name',
  searchByVatNumber: 'Search by VAT number'
};
