
import { SupportedLanguage } from '../base';

export interface OfferTemplatesTranslations {
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
  currentTemplate: string;
  chooseTemplate: string;
  overwriteTemplate: string;
  chooseDefaultTemplate: string;
  templateNameRequired: string;
  
  // We'll add optional properties for emptyState since it exists in some components
  emptyState?: {
    title: string;
    description: string;
    createFirst: string;
  };
}
