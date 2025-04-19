
import { offerBase } from './offerBase';
import { offerProducts } from './offerProducts';
import { offerTemplates } from './templates';
import { offerStatus } from './offerStatus';
import { offerDraft } from './offerDraft';
import { offerPreview } from './offerPreview';

// Combine all offer translation sections
export const offer = {
  ...offerBase,
  ...offerProducts,
  ...offerStatus,
  ...offerDraft,
  offerPreview, // Keep as a nested property
  templates: offerTemplates.templates, // Add templates as a nested property
  
  // Add additional properties directly
  createTemplate: offerTemplates.createTemplate,
  saveAsTemplate: offerTemplates.saveAsTemplate,
  deleteTemplate: offerTemplates.deleteTemplate,
  templateDeleted: offerTemplates.templateDeleted,
  deleteTemplateConfirm: offerTemplates.deleteTemplateConfirm,
  
  // These need to be here for backward compatibility
  currentTemplate: offerTemplates.templates.currentTemplate,
  chooseTemplate: offerTemplates.templates.chooseTemplate,
  noTemplates: offerTemplates.templates.noTemplates,
  overwriteTemplate: offerTemplates.templates.overwriteTemplate,
  templateSaved: offerTemplates.templates.templateSaved,
  chooseDefaultTemplate: offerTemplates.templates.chooseDefaultTemplate,
  templateNameRequired: offerTemplates.templates.templateNameRequired,
  useTemplate: offerTemplates.templates.useTemplate,
  createFromCurrent: offerTemplates.templates.createFromCurrent
};
