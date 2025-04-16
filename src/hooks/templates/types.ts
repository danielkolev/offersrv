
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
  
  // Setter functions
  setUserTemplates: (templates: TemplateType[] | ((prev: TemplateType[]) => TemplateType[])) => void;
  setSampleTemplates: (templates: TemplateType[] | ((prev: TemplateType[]) => TemplateType[])) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTemplateCreated: (created: boolean) => void;
  setTemplateUpdated: (updated: boolean) => void;
  setTemplateDeleted: (deleted: boolean) => void;
  setSaveTemplateFailed: (failed: boolean) => void;
  setDefaultTemplateSet: (set: boolean) => void;
  setSetDefaultFailed: (failed: boolean) => void;
  setDefaultTemplateId: (id: string | null) => void;
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
