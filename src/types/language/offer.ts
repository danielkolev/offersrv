
export interface OfferTranslations {
  createOffer: string;
  saveOffer: string;
  confirmSave: string;
  saveDescription: string;
  offerName: string;
  saveAsTemplate: string;
  saveAsDraft: string;
  saveAsFinalized: string;
  savedSuccessfully: string;
  saveFailed: string;
  clearConfirm: string;
  currency: string;
  fromTemplate: string;
  header: string;
  fromCompany: string;
  toCompany: string;
  date: string;
  validUntil: string;
  reference: string;
  notes: string;
  item: string;
  qty: string;
  unit: string;
  unitPrice: string;
  total: string;
  saved: string;
  subtotal: string;
  vat: string;
  totalAmount: string;
  includeVat: string;
  previewTitle: string;
  previewDescription: string;
  partNo: string;
  
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
  
  // Draft related translations
  draftLoaded: string;
  draftRestoredDescription: string;
  draftSaved: string;
  draftSavedDescription: string;
  draftSaveError: string;
  notSavedYet: string;
  lastSaved: string;
  saving: string;
  unsavedChanges: string;
  saveManually: string;
  autoSaveEnabled: string;
  autoSaveDisabled: string;
  enableAutoSave: string;
  disableAutoSave: string;
  draftInProgress: string;
  returnToDraft: string;
  noContentToSave: string;
  addContentToSave: string;
  
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
    };
    // Additional template translations
    editTemplate: string;
    createTemplate: string;
    settingsDescription: string;
    templateNamePlaceholder: string;
    templateDescriptionPlaceholder: string;
    designAndSettings: string;
    design: string;
    appearance: string;
    layout: string;
    content: string;
    header: string;
    footer: string;
    templateDesign: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    fontSize: string;
    roundedCorners: string;
    roundedCornersDesc: string;
    showLogo: string;
    logoPosition: string;
    compactMode: string;
    compactModeDesc: string;
    borderless: string;
    borderlessDesc: string;
    showCompanySlogan: string;
    companyNameSize: string;
    showOfferLabel: string;
    useGradient: string;
    useShadow: string;
    boldPrices: string;
    showLineNumbers: string;
    alternateRowColors: string;
    highlightTotals: string;
    showFooter: string;
    footerText: string;
    footerTextPlaceholder: string;
    showBankDetails: string;
    showSignatureArea: string;
    signatureText: string;
    signatureTextPlaceholder: string;
    includeSocialMedia: string;
    useQRCode: string;
    settingsSaved: string;
    templateCreated: string;
    failedToSaveSettings: string;
    failedToLoadTemplates: string;
    failedToCreateTemplate: string;
    failedToDeleteTemplate: string;
    failedToUpdateTemplate: string;
    failedToSetDefaultTemplate: string;
    defaultTemplateSet: string;
  };
  
  // Preview related translations
  offerPreview: string;
}
