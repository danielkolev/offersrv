
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
  draftStatus: string;
  draftStatusInfo: string;
  createdAt: string;
  lastEdited: string;
  statuses: {
    draft: string;
    saved: string;
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
