import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { useTemplateState } from './use-template-state';
import { useTemplateQueries } from './use-template-queries';
import { useTemplateOperations } from './use-template-operations';
import { TemplateType } from './types';

export function useTemplateManagement() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Get template state
  const state = useTemplateState();
  
  // Define fetch templates function
  const fetchTemplates = async () => {
    if (!user) return;
    
    state.setIsLoading(true);
    try {
      const { data: userTemplatesData, error: userTemplatesError } = await supabase
        .from('offer_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (userTemplatesError) throw userTemplatesError;
      
      const formattedUserTemplates = (userTemplatesData || []).map((template: any) => ({
        id: template.id,
        name: template.name,
        description: template.description || '',
        settings: {
          primaryColor: template.settings?.primaryColor || '#0891B2',
          tableHeaderColor: template.settings?.tableHeaderColor || '#F3F4F6',
          orientation: template.settings?.orientation || 'portrait'
        },
        created_at: template.created_at,
        updated_at: template.updated_at,
        user_id: template.user_id,
        is_default: template.is_default,
        language: template.language || 'all'
      }));
      
      state.setUserTemplates(formattedUserTemplates);
      
      const defaultTemplate = formattedUserTemplates.find(template => template.is_default);
      if (defaultTemplate) {
        state.setDefaultTemplateId(defaultTemplate.id);
      }
      
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: 'Failed to fetch templates',
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Get template operations
  const operations = useTemplateOperations(
    user?.id, 
    state, 
    fetchTemplates
  );
  
  // Get template queries
  const queries = useTemplateQueries(
    state.userTemplates,
    state.sampleTemplates
  );
  
  // Call fetchTemplates when the hook is first used
  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);
  
  // Return all template management functionality
  return {
    // State
    userTemplates: state.userTemplates,
    sampleTemplates: state.sampleTemplates,
    isLoading: state.isLoading,
    templateCreated: state.templateCreated,
    templateUpdated: state.templateUpdated,
    templateDeleted: state.templateDeleted,
    saveTemplateFailed: state.saveTemplateFailed,
    defaultTemplateSet: state.defaultTemplateSet,
    setDefaultFailed: state.setDefaultFailed,
    defaultTemplateId: state.defaultTemplateId,
    
    // Operations
    createTemplate: operations.createTemplate,
    editTemplate: operations.editTemplate,
    deleteTemplate: operations.deleteTemplate,
    setDefaultTemplate: operations.setDefaultTemplate,
    refreshTemplates: operations.refreshTemplates,
    
    // Queries
    getTemplateById: queries.getTemplateById,
    getDefaultTemplate: queries.getDefaultTemplate,
  };
}
