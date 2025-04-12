
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
  // Templates translations
  templates: {
    title: string;
    description?: string;
    useTemplate?: string;
    createFromCurrent?: string;
    templateName?: string;
    saveAsTemplate?: string;
    templateSaved?: string;
    noTemplates?: string;
    confirmDelete?: string;
    deleteTemplate?: string;
    templateDeleted?: string;
    defaultTemplates: string;
    userTemplates: string;
    createNew: string;
    availableTemplates: string;
    noTemplatesFound: string;
    noDescription: string;
  };
}

export interface SavedOffersTranslations {
  title: string;
  loadOffer: string;
  saveOffer: string;
  deleteOffer: string;
  offerSaved: string;
  offerDeleted: string;
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
  offerLoaded: string;
  viewOffer: string;
  recentOffers: string;
}

export interface ProductsTranslations {
  title: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  vat: string;
  vatIncluded: string;
  total: string;
  addProduct: string;
  removeProduct: string;
  noProducts: string;
  productName: string;
  partNumber: string;
  unitPrice: string;
  selectExisting: string;
  selectProduct: string;
  unit: string;
  unitPlaceholder: string;
}

export interface SavedProductsTranslations {
  title: string;
  addProduct: string;
  editProduct: string;
  deleteProduct: string;
  productDeleted: string;
  confirmDelete: string;
  noProductsFound: string;
  noProductsFoundSearch: string;
  search: string;
  searchPlaceholder: string;
  searchByName: string;
  searchByPartNumber: string;
  selectProduct: string;
  cancel: string;
  saveFromOffer: string;
  deleteConfirmation: string;
  backToOffer: string; // Added this line
}
