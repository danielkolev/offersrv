
export interface ClientInfoTranslations {
  title: string;
  name: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  email: string;
  phone: string;
  selectExisting: string;
  selectClient: string;
  searchClients: string;
}

export interface CompanyInfoTranslations {
  title: string;
  name: string;
  vatNumber: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  uploadLogo: string;
  removeLogo: string;
}

export interface ClientTranslations {
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  confirmDelete: string;
  clientAdded: string;
  clientUpdated: string;
  clientDeleted: string;
  // Add these fields that are being accessed in components:
  name: string;
  vatNumber: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone: string;
  // Add title property
  title: string;
}

export interface SavedClientsTranslations {
  title: string;
  loadClient: string;
  saveClient: string;
  deleteClient: string;
  clientSaved: string;
  clientDeleted: string;
  noClientsFound: string;
  noClientsFoundSearch: string;
  confirmDelete: string;
  date: string;
  name: string;
  vatNumber: string;
  actions: string;
  search: string;
  searchPlaceholder: string;
  createNew: string;
  clientLoaded: string;
  addNewClient: string;
  editClient: string;
  importFromOffer: string;
  searchByName: string;
  searchByVatNumber: string;
  // Add these missing properties:
  noClients: string;
  searchByVat: string;
  selectClient: string;
  deleteConfirmation: string;
  cancel: string;
  updateClient: string;
  createClient: string;
  clientUpdatedSuccess: string;
  clientAddedSuccess: string;
  clientDeletedSuccess: string;
}
