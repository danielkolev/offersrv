import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';

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
    id: 'sample-1',
    name: 'Modern Blue',
    description: 'Clean modern design with blue accents',
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
    id: 'sample-2',
    name: 'Corporate Purple',
    description: 'Professional corporate design with purple theme',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#7E69AB',
        secondaryColor: '#f1f0fb',
        textColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'medium',
        roundedCorners: false,
      },
      layout: {
        showLogo: true,
        logoPosition: 'center',
        compactMode: false,
      },
      content: {
        boldPrices: true,
        showFooter: true,
        footerText: 'Thank you for choosing our services!'
      },
      header: {
        showCompanySlogan: true,
        companyNameSize: 'large',
        showOfferLabel: true,
      },
      footer: {
        showBankDetails: true,
        showSignatureArea: true,
        signatureText: 'Signature:',
      },
      designTemplate: 'classic'
    }
  },
  {
    id: 'sample-3',
    name: 'Minimalist Green',
    description: 'Clean minimalist design with green accents',
    language: 'all',
    isSample: true,
    settings: {
      appearance: {
        primaryColor: '#4CAF50',
        secondaryColor: '#f2fce2',
        textColor: '#ffffff',
        fontFamily: 'Inter, sans-serif',
        fontSize: 'small',
        roundedCorners: true,
      },
      layout: {
        showLogo: true,
        logoPosition: 'right',
        compactMode: true,
      },
      content: {
        boldPrices: false,
        showFooter: true,
        footerText: 'Environmentally friendly company'
      },
      header: {
        showCompanySlogan: false,
        companyNameSize: 'medium',
        showOfferLabel: true,
      },
      footer: {
        showBankDetails: false,
        showSignatureArea: true,
        signatureText: 'Authorized by:',
      },
      designTemplate: 'classic'
    }
  },
  // Modern Design Templates
  {
    id: 'modern-1',
    name: 'Ultra Modern Dark',
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
    id: 'modern-2',
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
        floatingHeader: true,
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
    id: 'modern-3',
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
        signatureText: 'Authorized signature:',
        includeSocialMedia: false,
        useQRCode: true,
      },
      designTemplate: 'business-pro'
    }
  },
  {
    id: 'default',
    name: 'Default Template',
    description: 'Standard offer template',
    language: 'all',
    isDefault: true,
    isSample: false,
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
        showBankDetails: false,
        showSignatureArea: false,
        signatureText: 'Signature and stamp:',
      },
      designTemplate: 'classic'
    }
  }
];

export function useTemplateManagement() {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [userTemplates, setUserTemplates] = useState<TemplateType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultTemplateId, setDefaultTemplateId] = useState<string>('default');

  useEffect(() => {
    if (user) {
      fetchUserTemplates();
    } else {
      // When not logged in, just show sample templates
      setUserTemplates([...sampleTemplates]);
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
          language: ((item.offer_data as any)?.details?.offerLanguage || 'all') as 'bg' | 'en' | 'all',
          isDefault: item.is_default || false,
          settings: item.settings || null
        }));
        
        // Find default template
        const defaultTemplate = templates.find(t => t.isDefault);
        if (defaultTemplate) {
          setDefaultTemplateId(defaultTemplate.id);
        }
        
        // Merge user templates with sample templates
        setUserTemplates([...templates, ...sampleTemplates]);
      } else {
        // If no templates found, just use the sample templates
        setUserTemplates([...sampleTemplates]);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: t.common.error,
        description: 'Failed to load templates',
        variant: 'destructive'
      });
      
      // Fallback to sample templates
      setUserTemplates([...sampleTemplates]);
    } finally {
      setIsLoading(false);
    }
  };

  const createTemplate = async (
    name: string, 
    description: string, 
    settings?: any, 
    isDefault?: boolean
  ) => {
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
      const { error, data } = await supabase
        .from('saved_offers')
        .insert({
          user_id: user.id,
          name: name,
          description: description,
          is_template: true,
          is_default: isDefault || false,
          settings: settings || null,
          offer_data: {} // Empty template to be customized later
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.settings.templateCreated
      });
      
      await fetchUserTemplates();
      
      // Return the newly created template
      return data?.[0]?.id;
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
    
    // Can't delete sample templates
    const template = userTemplates.find(t => t.id === templateId);
    if (template?.isSample) {
      toast({
        title: t.common.error,
        description: 'Sample templates cannot be deleted',
        variant: 'destructive'
      });
      return;
    }
    
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

  const setAsDefaultTemplate = async (templateId: string) => {
    if (!user) return;
    
    // Can't set sample templates as default via database
    const template = userTemplates.find(t => t.id === templateId);
    if (template?.isSample) {
      // Just set it as default locally
      setDefaultTemplateId(templateId);
      
      toast({
        title: t.common.success,
        description: language === 'bg' 
          ? 'Шаблонът е зададен като основен' 
          : 'Template set as default'
      });
      return;
    }
    
    setIsLoading(true);
    try {
      // First, reset all templates to non-default
      await supabase
        .from('saved_offers')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('is_template', true);
      
      // Then set the selected one as default
      const { error } = await supabase
        .from('saved_offers')
        .update({ is_default: true })
        .eq('id', templateId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      setDefaultTemplateId(templateId);
      
      toast({
        title: t.common.success,
        description: language === 'bg' 
          ? 'Шаблонът е зададен като основен' 
          : 'Template set as default'
      });
      
      await fetchUserTemplates();
    } catch (error) {
      console.error('Error setting default template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to set default template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaultTemplate = () => {
    // Check if we have a default template
    const defaultTemplate = userTemplates.find(t => t.id === defaultTemplateId);
    if (!defaultTemplate) {
      toast({
        title: t.common.error,
        description: 'No default template found',
        variant: 'destructive'
      });
      return null;
    }
    
    toast({
      title: t.common.success,
      description: language === 'bg' 
        ? 'Възстановен е основният шаблон' 
        : 'Reset to default template'
    });
    
    return defaultTemplate;
  };

  const saveTemplateSettings = async (templateId: string, settings: any) => {
    if (!user) return;
    
    // Can't modify sample templates in the database
    const template = userTemplates.find(t => t.id === templateId);
    if (template?.isSample) {
      // Just update locally
      const updatedTemplates = userTemplates.map(t => 
        t.id === templateId ? { ...t, settings } : t
      );
      setUserTemplates(updatedTemplates);
      
      toast({
        title: t.common.success,
        description: t.offer.templates.saved
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .update({ settings })
        .eq('id', templateId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedTemplates = userTemplates.map(t => 
        t.id === templateId ? { ...t, settings } : t
      );
      setUserTemplates(updatedTemplates);
      
      toast({
        title: t.common.success,
        description: t.offer.templates.saved
      });
    } catch (error) {
      console.error('Error saving template settings:', error);
      toast({
        title: t.common.error,
        description: 'Failed to save template settings',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTemplateById = (templateId: string) => {
    return userTemplates.find(t => t.id === templateId) || null;
  };

  const getDefaultTemplate = () => {
    return userTemplates.find(t => t.id === defaultTemplateId) || 
           userTemplates.find(t => t.isDefault) ||
           userTemplates.find(t => t.id === 'default') || null;
  };

  const editTemplate = async (templateId: string, newData: Partial<TemplateType> = {}) => {
    if (!user) return;
    
    // Can't edit sample templates
    const template = userTemplates.find(t => t.id === templateId);
    if (template?.isSample) {
      toast({
        title: t.common.info,
        description: 'Sample templates cannot be edited',
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('saved_offers')
        .update({ 
          name: newData.name,
          description: newData.description,
          settings: newData.settings
        })
        .eq('id', templateId)
        .eq('user_id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      const updatedTemplates = userTemplates.map(t => 
        t.id === templateId ? { ...t, ...newData } : t
      );
      setUserTemplates(updatedTemplates);
      
      toast({
        title: t.common.success,
        description: t.offer.templates.saved
      });
    } catch (error) {
      console.error('Error updating template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to update template',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userTemplates,
    sampleTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    editTemplate,
    setAsDefaultTemplate,
    resetToDefaultTemplate,
    getTemplateById,
    getDefaultTemplate,
    defaultTemplateId,
    saveTemplateSettings,
    refreshTemplates: fetchUserTemplates
  };
}
