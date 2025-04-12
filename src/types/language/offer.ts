
export interface OfferTranslations {
  details: string;
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
  offerPreview: string;
  createOffer: string;
  // Templates translations
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
  };
}

export interface OfferDetailsTranslations {
  title: string;
  offerNumber: string;
  offerNumberInfo: string;
  date: string;
  validUntil: string;
  validUntilPlaceholder: string;
  showPartNumber: string;
  includeVat: string;
  vatRate: string;
  transportCost: string;
  transportCostPlaceholder: string;
  otherCosts: string;
  otherCostsPlaceholder: string;
  notes: string;
  notesPlaceholder: string;
  language: string;
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

export interface TotalsTranslations {
  subtotal: string;
  vat: string;
  transport: string;
  otherCosts: string;
  totalAmount: string;
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
  deleteConfirmation?: string;
}
