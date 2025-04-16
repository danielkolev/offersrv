import { SupportedLanguage } from './base';

export interface OfferTemplatesTranslations {
  templates: string;
  defaultTemplate: string;
  currentTemplate: string;
  chooseTemplate: string;
  templateName: string;
  noTemplates: string;
  createTemplate: string;
  saveAsTemplate: string;
  overwriteTemplate: string;
  deleteTemplate: string;
  deleteTemplateConfirm: string;
  templateSaved: string;
  templateDeleted: string;
  defaultTemplateSet: string;
  chooseDefaultTemplate: string;
  templateNameRequired: string;
  useTemplate: string;
  previewTemplate: string;
  editTemplate: string;
  emptyState: {
    title: string;
    description: string;
    createFirst: string;
  };
  designTemplates: {
    classic: string;
    modernDark: string;
    gradient: string;
    businessPro: string;
  };
  customizeTemplate: string;
  stylingOptions: string;
  layoutOptions: string;
  contentOptions: string;
  applyTemplate: string;
  makeDefault: string;
  // Add missing properties used in components
  title: string;
  description: string;
  confirmDelete: string;
  defaultTemplates: string;
  userTemplates: string;
  createFromCurrent: string;
}

export interface OfferPreviewTranslations {
  previewTitle: string;
  previewDescription: string;
  offerPreview: string;
  saveOffer: string;
  confirmSave: string;
  saveDescription: string;
  saveAsTemplate: string;
  saveAsDraft: string;
  saveAsFinalized: string;
  savedSuccessfully: string;
  saveFailed: string;
  generatePdf: string;
  clearConfirm: string;
  cancel: string;
  unauthorized: string;
  createFirstOffer: string;
  createNewOffer: string;
  returnToDashboard: string;
  noOffersFound: string;
  loadingOffers: string;
  generatingPdf: string;
  pdfGenerated: string;
  pdfError: string;
  contentCopied: string;
  printOptionsDescription: string;
  includeDateAndSignature: string;
}

export interface OfferStatusTranslations {
  status: string;
  draftStatus: string;
  draftStatusInfo: string;
  statuses: {
    draft: string;
    saved: string;
    sent: string;
    accepted: string;
    rejected: string;
  };
  createdAt: string;
  lastEdited: string;
  edit: string;
  delete: string;
  deleteConfirmation: string;
  yes: string;
  no: string;
  offerDeleted: string;
  offerUpdated: string;
  create: string;
}

export interface OfferDraftTranslations {
  draftInProgress: string;
  draftSaved: string;
  draftSavedDescription: string;
  draftSaveError: string;
  autoSaveDisabled: string;
  autoSaveEnabled: string;
  noContentToSave: string;
  addContentToSave: string;
  returnToDraft: string;
  draftLoaded: string;
  draftRestoredDescription: string;
  lastSaved: string;
  notSavedYet: string;
  saving: string;
  saved: string;
  unsavedChanges: string;
  saveManually: string;
  disableAutoSave: string;
  enableAutoSave: string;
  workflow: {
    continueFromDraft: string;
    createNewOffer: string;
    recentDrafts: string;
    quickStart: string;
    draftTip: string;
    stepByStep: string;
    quickMode: string;
    nextStep: string;
    previousStep: string;
    requiredField: string;
    saveAndContinue: string;
    quickTips: string;
    requiredFields: string;
  };
}

export interface OfferProductsTranslations {
  addProducts: string;
  addNewProduct: string;
  noProductsAdded: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  removeProduct: string;
  editProduct: string;
  productDetails: string;
  productNamePlaceholder: string;
  quantityPlaceholder: string;
  unitPricePlaceholder: string;
  saveProduct: string;
  showPartNumber: string;
  partNumber: string;
  includeVat: string;
  vatRate: string;
  transportCost: string;
  otherCosts: string;
  total: string;
  subtotal: string;
  vat: string;
  totalAmount: string;
  item: string;
  qty: string;
  productDescription: string;
  descriptionPlaceholder: string;
  unit: string;
  selectUnit: string;
  noUnit: string;
  productImage: string;
  uploadImage: string;
  imageUploaded: string;
  imageDeleted: string;
  noImage: string;
}

export interface OfferBaseTranslations {
  createOffer: string;
  offerDetails: string;
  companyInfo: string;
  clientInfo: string;
  productsAndServices: string;
  previewAndSave: string;
  previewAndFinish: string;
  offerName: string;
  offerNumber: string;
  offerDate: string;
  date: string;
  validUntil: string;
  currency: string;
  notes: string;
  offerLanguage: string;
  bulgarian: string;
  english: string;
  offerNamePlaceholder: string;
  header: string;
  fromCompany: string;
  toCompany: string;
  reference: string;
  toLabel: string;
  attention: string;
  bgn: string;
  eur: string;
  usd: string;
  cancel: string;
  previewTitle: string;
  previewDescription: string;
  saveOffer: string;
  confirmSave: string;
  saveDescription: string;
  saveAsTemplate: string;
  saveAsDraft: string;
  saveAsFinalized: string;
  savedSuccessfully: string;
  saveFailed: string;
  generatePdf: string;
  clearConfirm: string;
  fromTemplate: string;
  item: string;
  qty: string;
  total: string;
  subtotal: string;
  vat: string;
  totalAmount: string;
  languageOptions: {
    bulgarian: string;
    english: string;
  };
}

export interface OfferTranslations {
  offerPreview: OfferPreviewTranslations;
  templates: OfferTemplatesTranslations;
  [key: string]: any; // This allows for additional properties
  
  // These are the root-level properties
  createOffer: string;
  offerDetails: string;
  companyInfo: string;
  clientInfo: string;
  productsAndServices: string;
  previewAndSave: string;
  previewAndFinish: string;
  offerName: string;
  offerNumber: string;
  offerDate: string;
  date: string;
  validUntil: string;
  currency: string;
  notes: string;
  offerLanguage: string;
  bulgarian: string;
  english: string;
  offerNamePlaceholder: string;
  header: string;
  fromCompany: string;
  toCompany: string;
  reference: string;
  toLabel: string;
  attention: string;
  bgn: string;
  eur: string;
  usd: string;
  cancel: string;
  
  // Properties that should be maintained at the root level for backwards compatibility
  currentTemplate: string;
  chooseTemplate: string;
  noTemplates: string;
  overwriteTemplate: string;
  templateSaved: string;
  templateDeleted: string;
  chooseDefaultTemplate: string;
  templateNameRequired: string;
  useTemplate: string;
  
  // Status related
  status: string;
  draftStatus: string;
  draftStatusInfo: string;
  
  // Products related
  addProducts: string;
  addNewProduct: string;
  noProductsAdded: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  removeProduct: string;
  editProduct: string;
  productDetails: string;
  productNamePlaceholder: string;
  quantityPlaceholder: string;
  unitPricePlaceholder: string;
  saveProduct: string;
  showPartNumber: string;
  partNumber: string;
  includeVat: string;
  vatRate: string;
  transportCost: string;
  otherCosts: string;
  total: string;
  subtotal: string;
  vat: string;
  totalAmount: string;
  item: string;
  qty: string;
  
  // Draft related
  draftInProgress: string;
  draftSaved: string;
  draftSavedDescription: string;
  draftSaveError: string;
  autoSaveDisabled: string;
  autoSaveEnabled: string;
  noContentToSave: string;
  addContentToSave: string;
  returnToDraft: string;
  draftLoaded: string;
  draftRestoredDescription: string;
  lastSaved: string;
  notSavedYet: string;
  saving: string;
  saved: string;
  unsavedChanges: string;
  saveManually: string;
  disableAutoSave: string;
  enableAutoSave: string;
}
