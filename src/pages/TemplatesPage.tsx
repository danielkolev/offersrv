
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTemplateManagement } from '@/hooks/templates';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import TemplatePreview from '@/components/settings/offer-templates/TemplatePreview';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash, Eye } from 'lucide-react';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { Card } from '@/components/ui/card';

const TemplatesPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedSettings, setSelectedSettings] = useState<any>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  
  // Get template management hooks
  const {
    userTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    refreshTemplates,
    editTemplate
  } = useTemplateManagement();
  
  // Get the current template
  const selectedTemplate = userTemplates.find(template => template.id === templateId);
  
  // Handle template deletion
  const handleDeleteTemplate = async () => {
    if (!templateId) return;
    
    try {
      await deleteTemplate(templateId);
      toast({
        title: t.common.success,
        description: t.settings.templateDeleted,
      });
      navigate('/settings/templates');
    } catch (error) {
      toast({
        title: t.common.error,
        description: t.settings.deleteTemplateFailed,
        variant: 'destructive',
      });
    }
  };
  
  // Handle template update
  const handleUpdateTemplate = async (name: string, description: string, settings: any) => {
    if (!templateId || templateId === 'new') {
      // Create new template
      await createTemplate(name, description, settings);
      navigate('/settings/templates');
    } else {
      // Update existing template
      await editTemplate(templateId, {
        name,
        description,
        settings
      });
    }
  };
  
  // Handle settings change
  const handleSettingsChange = (newSettings: any) => {
    setSelectedSettings(newSettings);
  };
  
  // Handle back button click
  const handleBackClick = () => {
    navigate('/settings/templates');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {templateId === 'new' ? t.settings.newTemplate : selectedTemplate?.name || t.settings.editTemplate}
          </h1>
        </div>
        
        {templateId !== 'new' && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab('preview')}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {t.settings.preview}
            </Button>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  {t.common.delete}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.settings.confirmDeleteTemplate}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteTemplate}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t.common.delete}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
      
      <Tabs defaultValue="settings" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="settings">{t.settings.details}</TabsTrigger>
          <TabsTrigger value="preview">{t.settings.preview}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <div className="flex flex-col h-full">
            <TemplateSettings 
              selectedTemplateId={templateId || 'new'}
              onSettingsChange={handleSettingsChange}
              onSave={handleUpdateTemplate}
              initialSettings={selectedTemplate?.settings}
              initialName={selectedTemplate?.name}
              initialDescription={selectedTemplate?.description}
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
    </div>
  );
};

export default TemplatesPage;
