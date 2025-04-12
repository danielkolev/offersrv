
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
  website?: string;
  additionalInfo?: string;
  recentClients: string;
  addNewClient?: string;
  updateClient?: string;
  clientDetails?: string;
  noClientsFound?: string;
}

export interface SavedClientsTranslations {
  title: string;
  createClient: string;
  noClientsFound: string;
  searchPlaceholder: string;
  confirmDelete: string;
  clientDeleted: string;
}

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
  website?: string;
  namePlaceholder: string;
  contactPersonPlaceholder: string;
  addressPlaceholder: string;
  cityPlaceholder: string;
  countryPlaceholder: string;
  vatNumberPlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  websitePlaceholder?: string;
  selectClient: string;
}
