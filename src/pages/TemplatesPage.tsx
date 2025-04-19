
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTemplateManagement } from '@/hooks/templates';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import TemplatePreview from '@/components/settings/offer-templates/TemplatePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, RotateCcw, Save } from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSettings, setSelectedSettings] = useState<any>({});
  const [originalSettings, setOriginalSettings] = useState<any>({});
  const [activeTab, setActiveTab] = useState('settings');
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  // Get template management hooks
  const {
    userTemplates,
    setDefaultTemplate,
    defaultTemplateId,
    editTemplate,
    isLoading,
    refreshTemplates
  } = useTemplateManagement();
  
  // Get the default template
  const defaultTemplate = userTemplates.find(template => template.id === defaultTemplateId);
  
  // Set initial settings from default template
  useEffect(() => {
    if (defaultTemplate?.settings) {
      setSelectedSettings(defaultTemplate.settings);
      setOriginalSettings(defaultTemplate.settings);
    } else {
      // Set default settings if no template is found
      const defaultSettings = {
        templateType: 'classic',
        appearance: {
          primaryColor: '#3B82F6',
          secondaryColor: '#F3F4F6',
          textColor: '#111827',
        },
        header: {
          showCompanyLogo: true,
          showCompanyName: true,
          showCompanySlogan: true,
          showOfferLabel: true,
        },
        content: {
          showLineNumbers: true,
          showProductDescription: true,
          showPartNumbers: false,
          showFooter: true,
        },
        footer: {
          showBankDetails: false,
          showSignatureArea: true,
        },
        layout: {
          compactMode: false,
        }
      };
      
      setSelectedSettings(defaultSettings);
      setOriginalSettings(defaultSettings);
    }
  }, [defaultTemplate]);
  
  // Handle settings change
  const handleSettingsChange = (newSettings: any) => {
    setSelectedSettings(newSettings);
  };
  
  // Handle save settings
  const handleSaveSettings = async (settings: any) => {
    if (defaultTemplateId) {
      try {
        await editTemplate(defaultTemplateId, {
          settings
        });
        
        toast({
          title: t.common.success,
          description: t.settings.templateUpdated,
        });
        
        // Update original settings after save
        setOriginalSettings(settings);
        
        // Refresh templates
        refreshTemplates();
      } catch (error) {
        toast({
          title: t.common.error,
          description: t.settings.saveTemplateFailed,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: t.common.warning,
        description: t.settings.noTemplateSelected,
        variant: 'destructive',
      });
    }
  };
  
  // Handle reset to default
  const handleResetToDefault = () => {
    setIsResetDialogOpen(true);
  };
  
  // Confirm reset to default
  const confirmResetToDefault = () => {
    setSelectedSettings(originalSettings);
    setIsResetDialogOpen(false);
    toast({
      title: t.common.success,
      description: t.settings.settingsSaved,
    });
  };
  
  // Handle back button click
  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {t.settings.offerTemplates}
          </h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'preview' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('preview')}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            {t.settings.preview}
          </Button>
          <Button 
            variant={activeTab === 'settings' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {t.settings.details}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="settings">
          <div className="flex flex-col h-full">
            <TemplateSettings 
              selectedTemplateId={defaultTemplateId || ''}
              onSettingsChange={handleSettingsChange}
              onSave={handleSaveSettings}
              initialSettings={selectedSettings}
              resetToDefault={handleResetToDefault}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <Card className="bg-white rounded-lg shadow-md p-6 min-h-[600px]">
            <TemplatePreview 
              settings={selectedSettings} 
              fullScreen={true} 
            />
          </Card>
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.settings.resetToDefault} {t.common.confirmationQuestion}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmResetToDefault}>
              {t.common.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TemplatesPage;
