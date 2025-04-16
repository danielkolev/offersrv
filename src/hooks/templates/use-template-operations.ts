
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { TemplateOperations, TemplateType } from './types';

export function useTemplateOperations(
  userId: string | undefined,
  state: any,
  fetchTemplates: () => Promise<void>
): TemplateOperations {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Create a new template
  const createTemplate = async (name: string, description: string, settings?: any, isDefault?: boolean) => {
    if (!userId) return;
    
    state.setIsLoading(true);
    state.setSaveTemplateFailed(false);
    state.setTemplateCreated(false);
    
    try {
      // Create the template
      const { data, error } = await supabase
        .from('offer_templates')
        .insert([
          {
            name,
            description,
            settings,
            user_id: userId,
            is_default: isDefault || false,
            language: settings?.template?.language || 'all'
          }
        ])
        .select();
      
      if (error) throw error;
      
      state.setTemplateCreated(true);
      await fetchTemplates(); // Refresh the templates list
      
      return data?.[0];
    } catch (error) {
      console.error('Error creating template:', error);
      state.setSaveTemplateFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to create template',
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Edit an existing template
  const editTemplate = async (templateId: string, updates: Partial<TemplateType>) => {
    if (!userId) return;
    
    state.setIsLoading(true);
    state.setSaveTemplateFailed(false);
    state.setTemplateUpdated(false);
    
    try {
      const { error } = await supabase
        .from('offer_templates')
        .update({
          name: updates.name,
          description: updates.description,
          settings: updates.settings,
          language: updates.settings?.template?.language || 'all'
        })
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      state.setTemplateUpdated(true);
      await fetchTemplates(); // Refresh the templates list
    } catch (error) {
      console.error('Error updating template:', error);
      state.setSaveTemplateFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to update template',
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Delete a template
  const deleteTemplate = async (templateId: string) => {
    if (!userId) return;
    
    state.setIsLoading(true);
    state.setTemplateDeleted(false);
    
    try {
      const { error } = await supabase
        .from('offer_templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (error) throw error;
      
      state.setTemplateDeleted(true);
      state.setUserTemplates(prev => prev.filter(template => template.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to delete template',
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Set a template as default
  const setDefaultTemplate = async (templateId: string) => {
    if (!userId) return;
    
    state.setIsLoading(true);
    state.setDefaultTemplateSet(false);
    state.setSetDefaultFailed(false);
    
    try {
      // First, clear any existing default templates
      const { error: clearError } = await supabase
        .from('offer_templates')
        .update({ is_default: false })
        .eq('user_id', userId)
        .eq('is_default', true);
      
      if (clearError) throw clearError;
      
      // Then set the new default template
      const { error: setError } = await supabase
        .from('offer_templates')
        .update({ is_default: true })
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (setError) throw setError;
      
      state.setDefaultTemplateSet(true);
      state.setDefaultTemplateId(templateId);
      await fetchTemplates(); // Refresh the templates list
    } catch (error) {
      console.error('Error setting default template:', error);
      state.setSetDefaultFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to set default template',
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Refresh templates helper
  const refreshTemplates = async () => {
    await fetchTemplates();
  };

  return {
    createTemplate,
    editTemplate,
    deleteTemplate,
    setDefaultTemplate,
    refreshTemplates,
  };
}
