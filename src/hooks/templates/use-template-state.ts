
import { useState } from 'react';
import { TemplateState, TemplateType } from './types';

// Add this new type export
export type TemplateStateReturnType = ReturnType<typeof useTemplateState>;

export function useTemplateState(): TemplateState {
  const [userTemplates, setUserTemplates] = useState<TemplateType[]>([]);
  const [sampleTemplates, setSampleTemplates] = useState<TemplateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [templateCreated, setTemplateCreated] = useState(false);
  const [templateUpdated, setTemplateUpdated] = useState(false);
  const [templateDeleted, setTemplateDeleted] = useState(false);
  const [saveTemplateFailed, setSaveTemplateFailed] = useState(false);
  const [defaultTemplateSet, setDefaultTemplateSet] = useState(false);
  const [setDefaultFailed, setSetDefaultFailed] = useState(false);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string | null>(null);

  return {
    userTemplates,
    sampleTemplates,
    isLoading,
    templateCreated,
    templateUpdated,
    templateDeleted,
    saveTemplateFailed,
    defaultTemplateSet,
    setDefaultFailed,
    defaultTemplateId,
    
    // Include setter functions
    setUserTemplates,
    setSampleTemplates,
    setIsLoading,
    setTemplateCreated,
    setTemplateUpdated,
    setTemplateDeleted,
    setSaveTemplateFailed,
    setDefaultTemplateSet,
    setSetDefaultFailed,
    setDefaultTemplateId,
  };
}
