
import { TemplateQueries, TemplateType } from './types';

export function useTemplateQueries(
  userTemplates: TemplateType[],
  sampleTemplates: TemplateType[]
): TemplateQueries {
  // Helper function to get template by ID
  const getTemplateById = (id: string): TemplateType | null => {
    // Look in user templates first
    const userTemplate = userTemplates.find(template => template.id === id);
    if (userTemplate) return userTemplate;
    
    // Then look in sample templates
    const sampleTemplate = sampleTemplates.find(template => template.id === id);
    if (sampleTemplate) return sampleTemplate;
    
    return null;
  };
  
  // Helper function to get default template
  const getDefaultTemplate = (): TemplateType | null => {
    const defaultTemplate = userTemplates.find(template => template.is_default);
    return defaultTemplate || null;
  };

  return {
    getTemplateById,
    getDefaultTemplate,
  };
}
