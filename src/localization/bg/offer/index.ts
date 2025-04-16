
import { offerBase } from './offerBase';
import { offerProducts } from './offerProducts';
import { offerTemplates } from './offerTemplates';
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
  
  // Add additional properties that are referenced directly from offer.templates in components
  // but need to be kept at the root level for backward compatibility
  currentTemplate: offerTemplates.templates.currentTemplate,
  chooseTemplate: offerTemplates.templates.chooseTemplate,
  noTemplates: offerTemplates.templates.noTemplates,
  overwriteTemplate: offerTemplates.templates.overwriteTemplate,
  templateSaved: offerTemplates.templates.templateSaved,
  templateDeleted: offerTemplates.templates.templateDeleted,
  chooseDefaultTemplate: offerTemplates.templates.chooseDefaultTemplate,
  templateNameRequired: offerTemplates.templates.templateNameRequired,
  useTemplate: offerTemplates.templates.useTemplate,
};
