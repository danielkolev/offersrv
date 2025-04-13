
export interface ClientTranslations {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  companyName: string;
  vatNumber: string;
  eikNumber?: string; // Added EIK field
  website?: string;
  additionalInfo?: string;
  recentClients: string;
  addNewClient?: string;
  updateClient?: string;
  clientDetails?: string;
  noClientsFound?: string;
  name: string;
  contactPerson: string;
}

export interface SavedClientsTranslations {
  title: string;
  createClient: string;
  noClientsFound: string;
  noClientsFoundSearch: string;
  searchPlaceholder: string;
  confirmDelete: string;
  clientDeleted: string;
  deleteConfirmation: string;
  selectClient: string;
  cancel: string;
  updateClient: string;
  addNewClient: string;
  editClient: string;
  importFromOffer: string;
  searchByName: string;
  searchByVat: string;
  searchByEik: string; // Added searchByEik property
  clientUpdatedSuccess: string;
  clientAddedSuccess: string;
  clientDeletedSuccess: string;
  clientLoaded: string;
  recentClients: string;
  createNew: string; // This might be required based on translations
  deleteClient: string; // This might be required based on translations
  search: string; // This might be required based on translations
}

export interface ClientInfoTranslations {
  title: string;
  description: string; // Added description property
  name: string;
  contactPerson: string;
  address: string;
  city: string;
  country: string;
  vatNumber: string;
  eikNumber: string;
  email: string;
  phone: string;
  website?: string;
  namePlaceholder: string;
  contactPersonPlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  countryPlaceholder: string;
  vatNumberPlaceholder: string;
  eikNumberPlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  websitePlaceholder?: string;
  selectClient: string;
  selectExisting: string;
  searchClients: string;
  nameRequired: string;
}
