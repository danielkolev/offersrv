
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { TemplateType } from '@/types/template';

export type { TemplateType };

export function useTemplateManagement() {
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
  
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const fetchTemplates = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Fetch user templates
      const { data: userTemplatesData, error: userTemplatesError } = await supabase
        .from('offer_templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (userTemplatesError) throw userTemplatesError;
      
      // Convert database rows to TemplateType
      const formattedUserTemplates: TemplateType[] = (userTemplatesData || []).map((template: any) => ({
        id: template.id,
        name: template.name,
        description: template.description || '',
        settings: template.settings,
        created_at: template.created_at,
        updated_at: template.updated_at,
        user_id: template.user_id,
        is_default: template.is_default,
        language: template.language || 'all'
      }));
      
      setUserTemplates(formattedUserTemplates);
      
      // Get default template ID
      const defaultTemplate = formattedUserTemplates.find(template => template.is_default);
      if (defaultTemplate) {
        setDefaultTemplateId(defaultTemplate.id);
      }
      
      // Fetch sample templates (if any)
      // Note: You might want to implement a way to store sample templates in the future
      setSampleTemplates([]);
      
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: 'Failed to fetch templates',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const createTemplate = async (name: string, description: string, settings?: any, isDefault?: boolean) => {
    if (!user) return;
    
    setIsLoading(true);
    setSaveTemplateFailed(false);
    setTemplateCreated(false);
    
    try {
      // Create the template
      const { data, error } = await supabase
        .from('offer_templates')
        .insert([
          {
            name,
            description,
            settings,
            user_id: user.id,
            is_default: isDefault || false,
            language: settings?.template?.language || 'all'
          }
        ])
        .select();
      
      if (error) throw error;
      
      setTemplateCreated(true);
      await fetchTemplates(); // Refresh the templates list
      
      return data?.[0];
    } catch (error) {
      console.error('Error creating template:', error);
      setSaveTemplateFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to create template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const editTemplate = async (templateId: string, updates: Partial<TemplateType>) => {
    if (!user) return;
    
    setIsLoading(true);
    setSaveTemplateFailed(false);
    setTemplateUpdated(false);
    
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
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setTemplateUpdated(true);
      await fetchTemplates(); // Refresh the templates list
    } catch (error) {
      console.error('Error updating template:', error);
      setSaveTemplateFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to update template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const deleteTemplate = async (templateId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setTemplateDeleted(false);
    
    try {
      const { error } = await supabase
        .from('offer_templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      setTemplateDeleted(true);
      setUserTemplates(prev => prev.filter(template => template.id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to delete template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const setDefaultTemplate = async (templateId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setDefaultTemplateSet(false);
    setSetDefaultFailed(false);
    
    try {
      // First, clear any existing default templates
      const { error: clearError } = await supabase
        .from('offer_templates')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('is_default', true);
      
      if (clearError) throw clearError;
      
      // Then set the new default template
      const { error: setError } = await supabase
        .from('offer_templates')
        .update({ is_default: true })
        .eq('id', templateId)
        .eq('user_id', user.id);
      
      if (setError) throw setError;
      
      setDefaultTemplateSet(true);
      setDefaultTemplateId(templateId);
      await fetchTemplates(); // Refresh the templates list
    } catch (error) {
      console.error('Error setting default template:', error);
      setSetDefaultFailed(true);
      toast({
        title: t.common.error,
        description: 'Failed to set default template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Add helper functions for get templates by ID and get default template
  const getTemplateById = (id: string): TemplateType | null => {
    // Look in user templates first
    const userTemplate = userTemplates.find(template => template.id === id);
    if (userTemplate) return userTemplate;
    
    // Then look in sample templates
    const sampleTemplate = sampleTemplates.find(template => template.id === id);
    if (sampleTemplate) return sampleTemplate;
    
    return null;
  };
  
  const getDefaultTemplate = (): TemplateType | null => {
    const defaultTemplate = userTemplates.find(template => template.is_default);
    return defaultTemplate || null;
  };
  
  const refreshTemplates = async () => {
    await fetchTemplates();
  };
  
  // Call fetchTemplates when the hook is first used
  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);
  
  return {
    userTemplates,
    sampleTemplates,
    isLoading,
    createTemplate,
    editTemplate,
    deleteTemplate,
    setDefaultTemplate,
    templateCreated,
    templateUpdated,
    templateDeleted,
    saveTemplateFailed,
    defaultTemplateSet,
    setDefaultFailed,
    defaultTemplateId,
    getTemplateById,
    getDefaultTemplate,
    refreshTemplates
  };
}
