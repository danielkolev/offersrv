
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

export interface TemplateType {
  id: string;
  name: string;
  description: string;
  language: 'bg' | 'en' | 'all';
  isDefault?: boolean;
  isSample?: boolean;
  settings?: any;
}

// Sample templates with different designs
const sampleTemplates: TemplateType[] = [
  {
    id: 'sample-classic',
    name: 'Classic Template',
    description: 'Clean professional layout with classic styling',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#1E88E5',
        secondaryColor: '#f8f9fa',
        textColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'medium',
        roundedCorners: true,
      },
      layout: {
        showLogo: true,
        logoPosition: 'left',
        compactMode: false,
      },
      content: {
        boldPrices: true,
        showFooter: true,
        footerText: 'Thank you for your business!'
      },
      header: {
        showCompanySlogan: true,
        companyNameSize: 'large',
        showOfferLabel: true,
      },
      footer: {
        showBankDetails: true,
        showSignatureArea: true,
        signatureText: 'Signature and stamp:',
      },
      designTemplate: 'classic'
    }
  },
  {
    id: 'sample-modern-dark',
    name: 'Modern Dark',
    description: 'Contemporary dark mode design with vibrant accents',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#6366F1', // Indigo
        secondaryColor: '#1F2937', // Dark background
        textColor: '#F9FAFB', // Light text
        fontFamily: 'Poppins, sans-serif',
        fontSize: 'medium',
        roundedCorners: true,
      },
      layout: {
        showLogo: true,
        logoPosition: 'left',
        compactMode: false,
        fullWidth: true,
      },
      content: {
        boldPrices: true,
        showFooter: true,
        footerText: 'Thank you for your business!',
        useCards: true,
        showLineNumbers: true,
      },
      header: {
        showCompanySlogan: true,
        companyNameSize: 'large',
        showOfferLabel: true,
        useGradient: true,
      },
      footer: {
        showBankDetails: true,
        showSignatureArea: true,
        signatureText: 'Digital Signature:',
        includeSocialMedia: true,
      },
      designTemplate: 'modern-dark'
    }
  },
  {
    id: 'sample-gradient',
    name: 'Gradient Elegance',
    description: 'Sleek design with beautiful gradient accents',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#EC4899', // Pink
        secondaryColor: '#F9FAFB', // Light background
        textColor: '#ffffff',
        gradient: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 'medium',
        roundedCorners: true,
      },
      layout: {
        showLogo: true,
        logoPosition: 'right',
        compactMode: false,
        fullWidth: false,
      },
      content: {
        boldPrices: true,
        showFooter: true,
        footerText: 'We appreciate your trust in our services!',
        useCards: true,
        showLineNumbers: false,
        highlightTotals: true,
      },
      header: {
        showCompanySlogan: true,
        companyNameSize: 'large',
        showOfferLabel: true,
        useGradient: true,
      },
      footer: {
        showBankDetails: true,
        showSignatureArea: true,
        signatureText: 'Approved by:',
        includeSocialMedia: true,
      },
      designTemplate: 'gradient'
    }
  },
  {
    id: 'sample-business-pro',
    name: 'Business Pro',
    description: 'Clean professional layout with modern typography',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#0891B2', // Cyan
        secondaryColor: '#F0F9FF', // Light blue bg
        textColor: '#ffffff',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'medium',
        roundedCorners: true,
      },
      layout: {
        showLogo: true,
        logoPosition: 'center',
        compactMode: false,
        fullWidth: true,
        borderless: true,
      },
      content: {
        boldPrices: true,
        showFooter: true,
        footerText: 'Thank you for choosing our company!',
        useCards: false,
        showLineNumbers: true,
        alternateRowColors: true,
      },
      header: {
        showCompanySlogan: true,
        companyNameSize: 'large',
        showOfferLabel: true,
        useGradient: false,
        shadow: true,
      },
      footer: {
        showBankDetails: true,
        showSignatureArea: true,
        signatureText: 'Authorized by:',
        includeSocialMedia: false,
        useQRCode: true,
      },
      designTemplate: 'business-pro'
    }
  }
];

export const useTemplateManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { language, t } = useLanguage();
  const [userTemplates, setUserTemplates] = useState<TemplateType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string | null>(null);

  // Fetch user templates from Supabase
  const fetchUserTemplates = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data: templatesData, error } = await supabase
        .from('templates')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Get default template from user settings
      const { data: defaultData } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check if user has a default template set in their settings
      let defaultId = null;
      if (defaultData && defaultData.offer_settings) {
        const offerSettings = defaultData.offer_settings as Record<string, any>;
        if (offerSettings && offerSettings.default_template_id) {
          defaultId = offerSettings.default_template_id;
          setDefaultTemplateId(defaultId);
        }
      }

      // If no default template is set, use first sample template
      if (!defaultId) {
        setDefaultTemplateId(sampleTemplates[0].id);
      }

      // Format templates
      const formattedTemplates: TemplateType[] = templatesData.map(template => ({
        id: template.id,
        name: template.name || 'Unnamed Template',
        description: template.description || '',
        language: 'all', // Default to 'all' since it's not in the DB schema
        isDefault: defaultId === template.id,
        settings: {}, // Default to empty settings since it's not in the DB schema
      }));

      setUserTemplates(formattedTemplates);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToLoadTemplates || 'Failed to load templates',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch templates on component mount
  useEffect(() => {
    if (user) {
      fetchUserTemplates();
    }
  }, [user]);

  // Create a new template
  const createTemplate = async (
    name: string, 
    description: string = '',
    extraData: { language?: string, settings?: any } = {}
  ) => {
    if (!user) return null;

    setIsLoading(true);
    try {
      // Map the template data to match the actual database schema
      const newTemplate = {
        user_id: user.id,
        name: name,
        description,
        is_default: false,
        premium: false,
        colors: JSON.stringify({
          primary: '#1E88E5',
          secondary: '#f8f9fa'
        }), // Required field 
        font_family: 'Inter, sans-serif',
        show_logo: true,
        show_header: true,
        show_footer: true
      };

      const { data, error } = await supabase
        .from('templates')
        .insert(newTemplate)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Add the new template to the state
      setUserTemplates(prev => [
        {
          id: data.id,
          name: data.name || 'Unnamed Template',
          description: data.description || '',
          language: 'all',
          settings: {},
        },
        ...prev
      ]);
      
      // Return the new template ID
      return data.id;
    } catch (error) {
      console.error('Error creating template:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToCreateTemplate || 'Failed to create template',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a template
  const deleteTemplate = async (templateId: string) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Remove the template from the state
      setUserTemplates(prev => prev.filter(template => template.id !== templateId));
      
      // If this was the default template, reset the default
      if (defaultTemplateId === templateId) {
        setDefaultTemplateId(null);
        
        // Get current user settings
        const { data: settingsData } = await supabase
          .from('user_settings')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        // Update settings with new default_template_id set to null
        if (settingsData) {
          const offerSettings = settingsData.offer_settings as Record<string, any> || {};
          offerSettings.default_template_id = null;
          
          await supabase
            .from('user_settings')
            .update({ offer_settings: offerSettings })
            .eq('user_id', user.id);
        }
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToDeleteTemplate || 'Failed to delete template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update a template
  const updateTemplate = async (templateId: string, updates: Partial<TemplateType>): Promise<string | null> => {
    if (!user || !templateId) return null;

    setIsLoading(true);
    try {
      // If it's a sample template, create a new one instead
      if (templateId.startsWith('sample-')) {
        return await createTemplate(
          updates.name || 'Copy of Sample Template',
          updates.description || '',
          {
            language: updates.language as string,
            settings: updates.settings
          }
        );
      }

      // Map updates to match the database schema
      const dbUpdates = {
        name: updates.name,
        description: updates.description,
        // We can't update language and settings directly as they don't exist in the DB schema
      };

      const { error } = await supabase
        .from('templates')
        .update(dbUpdates)
        .eq('id', templateId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating template:', error);
        throw error;
      }

      // Update the template in the state
      setUserTemplates(prev => prev.map(template => 
        template.id === templateId 
          ? { ...template, ...updates } 
          : template
      ));

      return templateId;
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToUpdateTemplate || 'Failed to update template',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a template by ID
  const getTemplateById = (templateId: string): TemplateType | null => {
    if (!templateId) return null;
    
    // Check user templates
    const userTemplate = userTemplates.find(template => template.id === templateId);
    if (userTemplate) return userTemplate;
    
    // Check sample templates
    const sampleTemplate = sampleTemplates.find(template => template.id === templateId);
    if (sampleTemplate) return sampleTemplate;
    
    return null;
  };

  // Set a template as default
  const setAsDefaultTemplate = async (templateId: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if user settings exist
      const { data: existingSettings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (existingSettings) {
        // Update existing settings
        const offerSettings = existingSettings.offer_settings as Record<string, any> || {};
        offerSettings.default_template_id = templateId;
        
        await supabase
          .from('user_settings')
          .update({ offer_settings: offerSettings })
          .eq('user_id', user.id);
      } else {
        // Create new settings
        await supabase
          .from('user_settings')
          .insert({ 
            user_id: user.id, 
            offer_settings: { default_template_id: templateId }
          });
      }
      
      // Update state
      setDefaultTemplateId(templateId);
      
      // Update isDefault flag in templates
      setUserTemplates(prev => prev.map(template => ({
        ...template,
        isDefault: template.id === templateId
      })));
      
      toast({
        title: t.common.success,
        description: t.offer.templates.defaultTemplateSet || 'Default template set',
      });
    } catch (error) {
      console.error('Error setting default template:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToSetDefaultTemplate || 'Failed to set default template',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset to the default template
  const resetToDefaultTemplate = (): TemplateType | null => {
    const defaultTemplate = defaultTemplateId 
      ? getTemplateById(defaultTemplateId)
      : sampleTemplates[0];
      
    return defaultTemplate;
  };

  // Refresh templates
  const refreshTemplates = () => {
    fetchUserTemplates();
  };

  // Get the default template
  const getDefaultTemplate = () => {
    if (defaultTemplateId) {
      return getTemplateById(defaultTemplateId);
    }
    return sampleTemplates[0];
  };

  return {
    userTemplates,
    sampleTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    updateTemplate,
    getTemplateById,
    refreshTemplates,
    setAsDefaultTemplate,
    defaultTemplateId,
    resetToDefaultTemplate,
    getDefaultTemplate
  };
};
