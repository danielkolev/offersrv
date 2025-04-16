
export interface OfferTranslations {
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
  notes: string;
  transportCost: string;
  otherCosts: string;
  productName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  addNewProduct: string;
  noProductsAdded: string;
  removeProduct: string;
  editProduct: string;
  productDetails: string;
  productNamePlaceholder: string;
  quantityPlaceholder: string;
  unitPricePlaceholder: string;
  saveProduct: string;
  cancel: string;
  showPartNumber: string;
  partNumber: string;
  includeVat: string;
  vatRate: string;
  offerLanguage: string;
  bulgarian: string;
  english: string;
  createTemplate: string;
  templateName: string;
  templateDescription: string;
  templateSaved: string;
  templateSaveError: string;
  templateNamePlaceholder: string;
  templateDescriptionPlaceholder: string;
  applyTemplate: string;
  noTemplatesFound: string;
  applyThisTemplate: string;
  productDescription: string;
  descriptionPlaceholder: string;
  unit: string;
  selectUnit: string;
  noUnit: string;
  currency: string;
  bgn: string;
  eur: string;
  usd: string;
  offerNamePlaceholder: string;
  draftInProgress: string;
  notSavedYet: string;
  lastSaved: string;
  saving: string;
  unsavedChanges: string;
  saveManually: string;
  disableAutoSave: string;
  enableAutoSave: string;
  saved: string;
  draftSaved: string;
  draftSavedDescription: string;
  autoSaveDisabled: string;
  autoSaveEnabled: string;
  draftSaveError: string;
  noContentToSave: string;
  addContentToSave: string;
  draftLoaded: string;
  draftRestoredDescription: string;
  returnToDraft: string;
  
  // Additional required fields
  saveOffer: string;
  confirmSave: string;
  saveDescription: string;
  saveAsTemplate: string;
  saveAsDraft: string;
  saveAsFinalized: string;
  savedSuccessfully: string;
  saveFailed: string;
  clearConfirm: string;
  fromTemplate: string;
  header: string;
  fromCompany: string;
  toCompany: string;
  reference: string;
  item: string;
  qty: string;
  total: string;
  subtotal: string;
  vat: string;
  totalAmount: string;
  previewTitle: string;
  previewDescription: string;
  
  // Status related translations
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
  
  // Time related translations
  createdAt: string;
  lastEdited: string;
  
  // Client info related translations
  toLabel: string;
  attention: string;
  
  // Language options
  languageOptions: {
    bulgarian: string;
    english: string;
  };
  
  // Templates related translations
  templates: {
    title: string;
    description: string;
    empty: string;
    create: string;
    delete: string;
    confirmDelete: string;
    templateDeleted: string;
    apply: string;
    createNew: string;
    name: string;
    namePlaceholder: string;
    descriptionPlaceholder: string;
    save: string;
    cancel: string;
    saved: string;
    error: string;
    defaultTemplates: string;
    userTemplates: string;
    templateName: string;
    noTemplates: string;
    templateSaved: string;
    useTemplate: string;
    createFromCurrent: string;
    saveAsTemplate: string;
    noDescription: string;
    availableTemplates: string;
    noTemplatesFound: string;
    templatePreview: string;
    setAsDefault: string;
    resetToDefault: string;
    defaultTemplate: string;
    sampleTemplates: string;
    textColor: string;
    backgroundColor: string;
    designTemplateType: string;
    designTemplates: {
      classic: string;
      modernDark: string;
      gradient: string;
      businessPro: string;
    }
  };
  
  // Preview related translations
  offerPreview: {
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
  };
  
  // Workflow related translations
  workflow: {
    stepByStep: string;
    quickMode: string;
    nextStep: string;
    previousStep: string;
    requiredField: string;
    saveAndContinue: string;
    quickTips: string;
    requiredFields: string;
    
    // Draft workflow
    continueFromDraft: string;
    createNewOffer: string;
    recentDrafts: string;
    quickStart: string;
    draftTip: string;
  };
}
