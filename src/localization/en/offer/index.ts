
import { offerBase } from './offerBase';
import { offerProducts } from './offerProducts';
import { offerTemplates } from './offerTemplates';
import { offerStatus } from './offerStatus';
import { offerDraft } from './offerDraft';
import { offerPreview } from './offerPreview';

// Make sure all the required properties exist in offerTemplates.templates
const templates = {
  ...offerTemplates.templates,
  // Add any missing properties if they weren't present in the original file
  currentTemplate: offerTemplates.templates.currentTemplate || "Current Template",
  chooseTemplate: offerTemplates.templates.chooseTemplate || "Choose Template",
  noTemplates: offerTemplates.templates.noTemplates || "No templates found",
  overwriteTemplate: offerTemplates.templates.overwriteTemplate || "Overwrite Template",
  templateDeleted: offerTemplates.templates.templateDeleted || "Template Deleted",
  chooseDefaultTemplate: offerTemplates.templates.chooseDefaultTemplate || "Choose Default Template",
  templateNameRequired: offerTemplates.templates.templateNameRequired || "Template name is required",
  useTemplate: offerTemplates.templates.useTemplate || "Use Template",
  createFromCurrent: offerTemplates.templates.createFromCurrent || "Create from current"
};

// Combine all offer translation sections
export const offer = {
  ...offerBase,
  ...offerProducts,
  ...offerStatus,
  ...offerDraft,
  offerPreview, // Keep as a nested property
  templates, // Add templates as a nested property
  
  // Add additional properties that are referenced directly from offer.templates in components
  // but need to be kept at the root level for backward compatibility
  currentTemplate: templates.currentTemplate,
  chooseTemplate: templates.chooseTemplate,
  noTemplates: templates.noTemplates,
  overwriteTemplate: templates.overwriteTemplate,
  templateSaved: templates.templateSaved,
  templateDeleted: templates.templateDeleted,
  chooseDefaultTemplate: templates.chooseDefaultTemplate,
  templateNameRequired: templates.templateNameRequired,
  useTemplate: templates.useTemplate,
  saveAsTemplate: offerTemplates.saveAsTemplate,
  createTemplate: offerTemplates.createTemplate,
  deleteTemplate: offerTemplates.deleteTemplate, 
  deleteTemplateConfirm: offerTemplates.deleteTemplateConfirm,
  createFromCurrent: templates.createFromCurrent
};
