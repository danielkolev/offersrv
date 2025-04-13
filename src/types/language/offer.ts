
export interface OfferTranslations {
  title: string;
  createOffer: string;
  offerDetails: string;
  offerPreview: string;
  details: string;
  backToOffer: string;
  number: string;
  date: string;
  validUntil: string;
  notes: string;
  terms: string;
  status: string;
  draftStatus: string;  // Added for the draft status display
  draftStatusInfo: string;  // Added for the draft status info text
  createdAt: string;  // Added for creation date display
  lastEdited: string;  // Added for last edited date display
  statuses: {
    draft: string;
    sent: string;
    accepted: string;
    rejected: string;
  };
  offerLabel: string;
  toLabel: string;
  attention: string;
  item: string;
  partNo: string;
  qty: string;
  unitPrice: string;
  total: string;
  vatIncluded: string;
  vatExcluded: string;
  thankYou: string;
  language: string;
  languageOptions: {
    bulgarian: string;
    english: string;
  };
  // Draft related translations
  saving: string;
  saved: string;
  unsavedChanges: string;
  lastSaved: string;
  notSavedYet: string;
  saveManually: string;
  enableAutoSave: string;
  disableAutoSave: string;
  autoSaveEnabled: string;
  autoSaveDisabled: string;
  draftSaved: string;
  draftSavedDescription: string;
  draftSaveError: string;
  draftLoaded: string;
  draftRestoredDescription: string;
  // Draft indicator translations
  draftInProgress: string;
  returnToDraft: string;
  templates: {
    title: string;
    description: string;
    useTemplate: string;
    createFromCurrent: string;
    templateName: string;
    saveAsTemplate: string;
    templateSaved: string;
    noTemplates: string;
    confirmDelete: string;
    deleteTemplate: string;
    templateDeleted: string;
    defaultTemplates: string;
    userTemplates: string;
    createNew: string;
    availableTemplates: string;
    noTemplatesFound: string;
    noDescription: string;
  };
}

// Define interfaces for all properties actually used in the code
export interface SavedOffersTranslations {
  title: string;
  saveOffer: string;
  recentOffers: string;
  loadOffer: string;
  deleteOffer: string;
  offerSaved: string;
  offerSavedWithDetails: string;
  offerDeleted: string;
  offerLoaded: string;
  noOffersFound: string;
  noOffersFoundSearch: string;
  confirmDelete: string;
  date: string;
  client: string;
  amount: string;
  actions: string;
  search: string;
  searchPlaceholder: string;
  clientName: string;
  offerNumber: string;
  createNew: string;
  viewOffer: string;
  // Additional properties required by interface
  noOffers: string;
  filter: string;
}

export interface SavedProductsTranslations {
  title: string;
  addProduct: string;
  editProduct: string;
  deleteProduct: string;
  productDeleted: string;
  confirmDelete: string;
  noProductsFound: string;
  search: string;
  searchPlaceholder: string;
  searchByName: string;
  searchByPartNumber: string;
  selectProduct: string;
  cancel: string;
  saveFromOffer: string;
  noProductsFoundSearch: string;
  deleteConfirmation: string;
  backToOffer: string;
  // Additional properties needed to satisfy TS errors
  noProducts: string;
}

export interface ProductsTranslations {
  title: string;
  name: string;
  description: string;
  partNumber: string;
  price: string;
  quantity: string;
  unit: string;
  unitPrice: string;
  total: string;
  vat: string;
  vatIncluded: string;
  addProduct: string;
  removeProduct: string;
  noProducts: string;
  selectProduct: string;
  selectExisting: string;
  productName: string;
  unitPlaceholder: string;
  items: string;
  // For SavedProductItem and product selectors
  partNo: string;
}
