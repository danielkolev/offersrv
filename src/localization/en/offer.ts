
import { OfferTranslations } from '@/types/language/offer';

export const offer: OfferTranslations = {
  createOffer: "Create Offer",
  saveOffer: "Save Offer",
  confirmSave: "Confirm Save",
  saveDescription: "Please enter a name for your offer and choose how you want to save it.",
  offerName: "Offer Name",
  saveAsTemplate: "Save as Template",
  saveAsDraft: "Save as Draft",
  saveAsFinalized: "Save as Finalized",
  savedSuccessfully: "Offer saved successfully",
  saveFailed: "Failed to save offer",
  clearConfirm: "Are you sure you want to clear this offer? All data will be lost.",
  currency: "Currency",
  fromTemplate: "From Template",
  header: "Offer",
  fromCompany: "From",
  toCompany: "To",
  date: "Date",
  validUntil: "Valid Until",
  reference: "Reference",
  notes: "Notes",
  item: "Item",
  qty: "Qty",
  unit: "Unit",
  unitPrice: "Unit Price",
  total: "Total",
  saved: "Saved",
  subtotal: "Subtotal",
  vat: "VAT",
  totalAmount: "Total Amount",
  includeVat: "Include VAT",
  previewTitle: "Offer Preview",
  previewDescription: "Review your offer before saving",
  partNo: "Part No.",
  
  // Status related translations
  status: "Status",
  draftStatus: "Status",
  draftStatusInfo: "A number will be assigned when saved",
  statuses: {
    draft: "Draft",
    saved: "Saved",
    sent: "Sent",
    accepted: "Accepted",
    rejected: "Rejected"
  },
  
  // Time related translations
  createdAt: "Created",
  lastEdited: "Last edited",
  
  // Draft related translations
  draftLoaded: "Draft loaded",
  draftRestoredDescription: "Your draft has been restored",
  draftSaved: "Draft saved",
  draftSavedDescription: "Your draft has been saved successfully",
  draftSaveError: "Failed to save draft",
  notSavedYet: "Not saved yet",
  lastSaved: "Last saved {time}",
  saving: "Saving...",
  unsavedChanges: "Unsaved changes",
  saveManually: "Save manually",
  autoSaveEnabled: "Auto-save enabled",
  autoSaveDisabled: "Auto-save disabled",
  enableAutoSave: "Enable auto-save",
  disableAutoSave: "Disable auto-save",
  draftInProgress: "Draft in progress",
  returnToDraft: "Return to draft",
  
  // Client info related translations
  toLabel: "To",
  attention: "Attention:",
  
  // Language options
  languageOptions: {
    bulgarian: "Bulgarian",
    english: "English"
  },
  
  // Templates related translations
  templates: {
    title: "Offer Templates",
    description: "Create and manage your offer templates",
    empty: "No templates yet",
    create: "Create Template",
    delete: "Delete",
    confirmDelete: "Are you sure you want to delete this template?",
    templateDeleted: "Template deleted successfully",
    apply: "Apply Template",
    createNew: "Create New Template",
    name: "Template Name",
    namePlaceholder: "Enter template name",
    descriptionPlaceholder: "Enter template description",
    save: "Save Template",
    cancel: "Cancel",
    saved: "Template saved",
    error: "Error saving template",
    defaultTemplates: "Default Templates",
    userTemplates: "Your Templates",
    templateName: "Template Name",
    noTemplates: "No templates available",
    templateSaved: "Template saved successfully",
    useTemplate: "Use Template",
    createFromCurrent: "Create from Current Offer",
    saveAsTemplate: "Save as Template",
    noDescription: "No description provided",
    availableTemplates: "Available Templates",
    noTemplatesFound: "No templates found",
    templatePreview: "Template Preview",
    setAsDefault: "Set as Default",
    resetToDefault: "Reset to Default",
    defaultTemplate: "Default Template",
    sampleTemplates: "Sample Templates",
    textColor: "Text Color",
    backgroundColor: "Background Color"
  },
  
  // Preview related translations
  offerPreview: "Offer Preview"
};
