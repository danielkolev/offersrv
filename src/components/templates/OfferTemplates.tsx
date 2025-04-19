import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Offer } from '@/types/offer';
import { TemplateType } from '@/types/template';

// Import new components
import SaveTemplateDialog from './template-components/SaveTemplateDialog';
import TemplatesTabs from './template-components/TemplatesTabs';

// Basic templates to get started with
const DEFAULT_TEMPLATES: any[] = [
  {
    id: 'basic',
    name: 'Basic Offer / Основна оферта',
    description: 'A simple offer with standard terms / Проста оферта със стандартни условия',
    language: 'all',
    isDefault: true,
    settings: {
      primaryColor: '#0891B2',
      tableHeaderColor: '#F3F4F6',
      orientation: 'portrait'
    },
    template: {
      details: {
        offerNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        includeVat: true,
        vatRate: 20,
        showPartNumber: true,
        transportCost: 0,
        otherCosts: 0,
        notes: 'Payment terms: 100% advance payment.\nDelivery time: 7-14 working days after order confirmation.',
        offerLanguage: 'en'
      }
    }
  },
  {
    id: 'basic_bg',
    name: 'Основна оферта',
    description: 'Проста оферта със стандартни условия на български',
    language: 'bg',
    isDefault: true,
    settings: {
      primaryColor: '#0891B2',
      tableHeaderColor: '#F3F4F6',
      orientation: 'portrait'
    },
    template: {
      details: {
        offerNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        includeVat: true,
        vatRate: 20,
        showPartNumber: true,
        transportCost: 0,
        otherCosts: 0,
        notes: 'Условия на плащане: 100% авансово плащане.\nСрок на доставка: 7-14 работни дни след потвърждение на поръчката.',
        offerLanguage: 'bg'
      }
    }
  }
];

const OfferTemplates = () => {
  const { applyTemplate, offer } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('default');
  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter templates based on the current language
  const filteredDefaultTemplates = DEFAULT_TEMPLATES.filter(
    template => template.language === 'all' || template.language === offer.details.offerLanguage
  );
  
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
        const templates: any[] = data.map(item => ({
          id: item.id,
          name: item.name || 'Unnamed Template',
          description: item.description || '',
          settings: {
            primaryColor: '#0891B2',
            tableHeaderColor: '#F3F4F6',
            orientation: 'portrait'
          },
          language: ((item.offer_data as any)?.details?.offerLanguage || 'all'),
          template: item.offer_data as unknown as Partial<Offer>
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
  
  const handleSelectTemplate = (template: Partial<Offer>) => {
    // Instead of passing the template directly, we need to create a temporary ID
    // and apply it to the offer context
    const tempId = `temp-${Date.now()}`;
    window.localStorage.setItem(`temp-template-${tempId}`, JSON.stringify(template));
    applyTemplate(tempId);
    
    toast({
      title: t.common.success,
      description: 'Template applied successfully',
    });
  };
  
  const handleSaveAsTemplate = async (templateName: string) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive'
      });
      return;
    }
    
    if (!templateName.trim()) {
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
          name: templateName,
          offer_data: offer as any,
          is_template: true
        });
        
      if (error) {
        throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.offer.templates.templateSaved
      });
      
      setSaveDialogOpen(false);
      fetchUserTemplates();
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
  
  const handleDeleteTemplate = async (templateId: string) => {
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

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{t.offer.templates.title}</CardTitle>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setSaveDialogOpen(true)}
        >
          <Save className="h-4 w-4" />
          {t.offer.createTemplate}
        </Button>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{t.offer.templates.description}</p>
        
        <TemplatesTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          defaultTemplates={filteredDefaultTemplates}
          userTemplates={userTemplates}
          isLoading={isLoading}
          onSelectTemplate={handleSelectTemplate}
          onDeleteTemplate={handleDeleteTemplate}
          onCreateTemplate={() => setSaveDialogOpen(true)}
          isAuthenticated={!!user}
        />
      </CardContent>

      <SaveTemplateDialog 
        open={saveDialogOpen}
        onOpenChange={setSaveDialogOpen}
        onSave={handleSaveAsTemplate}
        isLoading={isLoading}
      />
    </Card>
  );
};

export default OfferTemplates;
