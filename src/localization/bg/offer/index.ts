
import { offerBase } from './offerBase';
import { offerProducts } from './offerProducts';
import { offerTemplates } from './templates';
import { offerStatus } from './offerStatus';
import { offerDraft } from './offerDraft';
import { offerPreview } from './offerPreview';

// Make sure all the required properties exist in offerTemplates.templates
const templates = {
  ...offerTemplates.templates,
  // Add any missing properties if they weren't present in the original file
  currentTemplate: offerTemplates.templates.currentTemplate || "Текущ шаблон",
  chooseTemplate: offerTemplates.templates.chooseTemplate || "Избери шаблон",
  noTemplates: offerTemplates.templates.noTemplates || "Няма намерени шаблони",
  overwriteTemplate: offerTemplates.templates.overwriteTemplate || "Презаписване на шаблон",
  templateDeleted: offerTemplates.templates.templateDeleted || "Шаблонът е изтрит",
  chooseDefaultTemplate: offerTemplates.templates.chooseDefaultTemplate || "Избери стандартен шаблон",
  templateNameRequired: offerTemplates.templates.templateNameRequired || "Името на шаблона е задължително",
  useTemplate: offerTemplates.templates.useTemplate || "Използвай",
  createFromCurrent: offerTemplates.templates.createFromCurrent || "Създай от текущата оферта",
  saveAsTemplate: offerTemplates.templates.saveAsTemplate || "Запази като шаблон",
  createTemplate: offerTemplates.templates.createTemplate || "Създай шаблон",
  deleteTemplate: offerTemplates.templates.deleteTemplate || "Изтрий шаблон",
  deleteTemplateConfirm: offerTemplates.templates.deleteTemplateConfirm || "Сигурни ли сте, че искате да изтриете този шаблон?"
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
  saveAsTemplate: templates.saveAsTemplate || offerTemplates.saveAsTemplate,
  createTemplate: templates.createTemplate || offerTemplates.createTemplate,
  deleteTemplate: templates.deleteTemplate || offerTemplates.deleteTemplate,
  deleteTemplateConfirm: templates.deleteTemplateConfirm || offerTemplates.deleteTemplateConfirm,
  createFromCurrent: templates.createFromCurrent
};
