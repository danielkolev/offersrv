
import { TemplateType as BaseTemplateType } from '@/types/template';

// Re-export the base template type
export type TemplateType = BaseTemplateType;

export interface TemplateState {
  userTemplates: TemplateType[];
  sampleTemplates: TemplateType[];
  isLoading: boolean;
  templateCreated: boolean;
  templateUpdated: boolean;
  templateDeleted: boolean;
  saveTemplateFailed: boolean;
  defaultTemplateSet: boolean;
  setDefaultFailed: boolean;
  defaultTemplateId: string | null;
}

export interface TemplateOperations {
  createTemplate: (name: string, description: string, settings?: any, isDefault?: boolean) => Promise<any>;
  editTemplate: (templateId: string, updates: Partial<TemplateType>) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  setDefaultTemplate: (templateId: string) => Promise<void>;
  refreshTemplates: () => Promise<void>;
}

export interface TemplateQueries {
  getTemplateById: (id: string) => TemplateType | null;
  getDefaultTemplate: () => TemplateType | null;
}
