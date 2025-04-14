
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

// Define the TemplateType interface
export interface TemplateType {
  id: string;
  name: string;
  description: string;
  settings?: any;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  is_default?: boolean;
  language?: string;
}

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
      setUserTemplates(userTemplatesData || []);
      
      // Fetch sample templates (if any)
      const { data: sampleTemplatesData, error: sampleTemplatesError } = await supabase
        .from('sample_offer_templates')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (sampleTemplatesError) throw sampleTemplatesError;
      setSampleTemplates(sampleTemplatesData || []);
      
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
            is_default: isDefault || false
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
        .update(updates)
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
    refreshTemplates
  };
}
