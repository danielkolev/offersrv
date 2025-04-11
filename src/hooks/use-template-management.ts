
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface TemplateType {
  id: string;
  name: string;
  description: string;
  language: 'bg' | 'en' | 'all';
  isDefault?: boolean;
}

export function useTemplateManagement() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [userTemplates, setUserTemplates] = useState<TemplateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserTemplates();
    }
  }, [user]);

  const fetchUserTemplates = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_offers')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_template', true);
        
      if (error) {
        throw error;
      }
      
      if (data) {
        const templates: TemplateType[] = data.map(item => ({
          id: item.id,
          name: item.name || 'Unnamed Template',
          description: item.description || '',
          language: ((item.offer_data as any)?.details?.offerLanguage || 'all') as 'bg' | 'en' | 'all'
        }));
        
        setUserTemplates(templates);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: 'Failed to load templates',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createTemplate = async (name: string, description: string) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive'
      });
      return;
    }
    
    if (!name.trim()) {
      toast({
        title: t.common.error,
        description: 'Please enter a template name',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .insert({
          user_id: user.id,
          name: name,
          description: description,
          is_template: true,
          offer_data: {} // Empty template to be customized later
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.settings.templateCreated
      });
      
      await fetchUserTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to save template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTemplate = async (templateId: string) => {
    if (!user) return;
    
    if (!window.confirm(t.offer.templates.confirmDelete)) {
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .delete()
        .eq('id', templateId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      setUserTemplates(userTemplates.filter(template => template.id !== templateId));
      
      toast({
        title: t.common.success,
        description: t.offer.templates.templateDeleted
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to delete template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editTemplate = (templateId: string) => {
    // This will be implemented later when template editor is ready
    console.log('Edit template:', templateId);
    // For now, just show a toast
    toast({
      title: t.common.success, // Changed from 'info' to 'success' since 'info' doesn't exist
      description: 'Template editor will be available soon',
    });
  };

  return {
    userTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    editTemplate,
    refreshTemplates: fetchUserTemplates
  };
}
