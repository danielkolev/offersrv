
import { OfferBaseTranslations } from './base';
import { OfferDraftTranslations } from './draft';
import { OfferPreviewTranslations } from './preview';
import { OfferProductsTranslations } from './products';
import { OfferStatusTranslations } from './status';
import { OfferTemplatesTranslations } from './templates';

export interface OfferTranslations {
  // Nested translation objects
  offerPreview: OfferPreviewTranslations;
  templates: OfferTemplatesTranslations;
  
  // Properties exposed at the root level for backward compatibility
  currentTemplate: string;
  chooseTemplate: string;
  noTemplates: string;
  overwriteTemplate: string;
  templateSaved: string;
  templateDeleted: string;
  chooseDefaultTemplate: string;
  templateNameRequired: string;
  useTemplate: string;
  
  // Base offer properties
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
  fromTemplate: string;
  
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
  
  // Allow for additional properties
  [key: string]: any;
}

// Re-export all the interfaces
export type {
  OfferBaseTranslations,
  OfferDraftTranslations,
  OfferPreviewTranslations,
  OfferProductsTranslations,
  OfferStatusTranslations,
  OfferTemplatesTranslations
};
