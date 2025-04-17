
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { TemplateStateReturnType } from './use-template-state';
import { generateUniqueId } from '@/lib/utils';

interface TemplateSettings {
  name?: string;
  description?: string;
  settings?: any;
}

export function useTemplateOperations(
  userId: string | undefined,
  state: TemplateStateReturnType,
  refreshTemplates: () => Promise<void>
) {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  // Create a new template
  const createTemplate = async (name: string, description: string = '', settings: any = {}) => {
    if (!userId) {
      toast({
        title: t.common.error,
        description: t.common.unauthorized,
        variant: 'destructive',
      });
      return;
    }
    
    state.setIsLoading(true);
    state.setSaveTemplateFailed(false);
    
    try {
      // Create new template
      const templateId = generateUniqueId();
      const { error: insertError } = await supabase
        .from('offer_templates')
        .insert({
          id: templateId,
          name,
          description,
          settings,
          user_id: userId,
          language: 'all'
        });
      
      if (insertError) throw insertError;
      
      // Refresh templates
      await refreshTemplates();
      
      // Set success flags
      state.setTemplateCreated(true);
      
      toast({
        title: t.common.success,
        description: t.settings.templateCreated,
      });
      
      return templateId;
    } catch (error) {
      console.error('Error creating template:', error);
      state.setSaveTemplateFailed(true);
      
      toast({
        title: t.common.error,
        description: t.settings.saveTemplateFailed,
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Edit an existing template
  const editTemplate = async (templateId: string, templateData: TemplateSettings) => {
    if (!userId) {
      toast({
        title: t.common.error,
        description: t.common.unauthorized,
        variant: 'destructive',
      });
      return;
    }
    
    state.setIsLoading(true);
    state.setSaveTemplateFailed(false);
    
    try {
      // Update template
      const { error: updateError } = await supabase
        .from('offer_templates')
        .update({
          ...templateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (updateError) throw updateError;
      
      // Refresh templates
      await refreshTemplates();
      
      // Set success flags
      state.setTemplateUpdated(true);
      
      return templateId;
    } catch (error) {
      console.error('Error updating template:', error);
      state.setSaveTemplateFailed(true);
      
      toast({
        title: t.common.error,
        description: t.settings.saveTemplateFailed,
        variant: 'destructive',
      });
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Delete a template
  const deleteTemplate = async (templateId: string) => {
    if (!userId) {
      toast({
        title: t.common.error,
        description: t.common.unauthorized,
        variant: 'destructive',
      });
      return;
    }
    
    state.setIsLoading(true);
    
    try {
      // Check if template is default
      const isDefault = state.userTemplates.find(template => template.id === templateId)?.is_default;
      
      // Delete template
      const { error: deleteError } = await supabase
        .from('offer_templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;
      
      // Refresh templates
      await refreshTemplates();
      
      // Set success flags
      state.setTemplateDeleted(true);
      
      // If deleted template was default, find a new default
      if (isDefault && state.userTemplates.length > 0) {
        const newDefaultId = state.userTemplates[0].id;
        await setDefaultTemplate(newDefaultId);
      }
      
      return true;
    } catch (error) {
      console.error('Error deleting template:', error);
      
      toast({
        title: t.common.error,
        description: t.settings.deleteTemplateFailed,
        variant: 'destructive',
      });
      return false;
    } finally {
      state.setIsLoading(false);
    }
  };
  
  // Set a template as default
  const setDefaultTemplate = async (templateId: string) => {
    if (!userId) {
      toast({
        title: t.common.error,
        description: t.common.unauthorized,
        variant: 'destructive',
      });
      return;
    }
    
    state.setIsLoading(true);
    state.setSetDefaultFailed(false);
    
    try {
      // First, reset all templates to non-default
      const { error: resetError } = await supabase
        .from('offer_templates')
        .update({ is_default: false })
        .eq('user_id', userId);
      
      if (resetError) throw resetError;
      
      // Then, set the selected template as default
      const { error: updateError } = await supabase
        .from('offer_templates')
        .update({ is_default: true })
        .eq('id', templateId)
        .eq('user_id', userId);
      
      if (updateError) throw updateError;
      
      // Refresh templates
      await refreshTemplates();
      
      // Set success flags
      state.setDefaultTemplateId(templateId);
      state.setDefaultTemplateSet(true);
      
      return true;
    } catch (error) {
      console.error('Error setting default template:', error);
      state.setSetDefaultFailed(true);
      
      toast({
        title: t.common.error,
        description: t.settings.setDefaultFailed,
        variant: 'destructive',
      });
      return false;
    } finally {
      state.setIsLoading(false);
    }
  };
  
  return {
    createTemplate,
    editTemplate,
    deleteTemplate,
    setDefaultTemplate,
    refreshTemplates
  };
}

