
import { OfferTranslations } from '@/types/language/offer';

export const offer: OfferTranslations = {
  createOffer: "Create Offer",
  saveOffer: "Save Offer",
  confirmSave: "Confirm",
  saveDescription: "Please enter a name for your offer and select how you would like to save it.",
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
  previewDescription: "Preview your offer before saving",
  partNo: "Part No.",
  
  // Status related translations
  status: "Status",
  draftStatus: "Status",
  draftStatusInfo: "Number will be assigned when saved",
  statuses: {
    draft: "Draft",
    saved: "Saved",
    sent: "Sent",
    accepted: "Accepted",
    rejected: "Rejected"
  },
  
  // Time related translations
  createdAt: "Created",
  lastEdited: "Last Edited",
  
  // Draft related translations
  draftLoaded: "Draft Loaded",
  draftRestoredDescription: "Your draft has been restored",
  draftSaved: "Draft Saved",
  draftSavedDescription: "Your draft has been saved successfully",
  draftSaveError: "Error saving draft",
  notSavedYet: "Not saved yet",
  lastSaved: "Last saved: {time}",
  saving: "Saving...",
  unsavedChanges: "Unsaved changes",
  saveManually: "Save manually",
  autoSaveEnabled: "Auto save enabled",
  autoSaveDisabled: "Auto save disabled",
  enableAutoSave: "Enable auto save",
  disableAutoSave: "Disable auto save",
  draftInProgress: "Draft in progress",
  returnToDraft: "Return to draft",
  noContentToSave: "Nothing to save",
  addContentToSave: "Add client or products to save as draft",
  
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
    description: "Create and manage offer templates",
    empty: "No templates available",
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
    createFromCurrent: "Create from current offer",
    saveAsTemplate: "Save as Template",
    noDescription: "No description",
    availableTemplates: "Available Templates",
    noTemplatesFound: "No templates found",
    templatePreview: "Template Preview",
    setAsDefault: "Set as Default",
    resetToDefault: "Reset to Default",
    defaultTemplate: "Default Template",
    sampleTemplates: "Sample Templates",
    textColor: "Text Color",
    backgroundColor: "Background Color",
    designTemplateType: "Design Template Type",
    designTemplates: {
      classic: "Classic",
      modernDark: "Modern Dark",
      gradient: "Gradient",
      businessPro: "Business Pro"
    }
  },
  
  // Preview related translations
  offerPreview: "Offer Preview"
};
