
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Copy, Trash2, Edit, CheckCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useRouter } from 'react-router-dom';

const OfferTemplatesSection = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('user');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  
  const {
    userTemplates,
    sampleTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    updateTemplate,
    getTemplateById,
    setDefaultTemplate,
    defaultTemplateId
  } = useTemplateManagement();
  
  const handleCreateTemplate = () => {
    setSelectedTemplateId(null);
    setIsSettingsOpen(true);
  };
  
  const handleEditTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setIsSettingsOpen(true);
  };
  
  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
    setSelectedTemplateId(null);
  };
  
  const handleSaveTemplate = async (settings: any) => {
    try {
      if (selectedTemplateId) {
        // Edit existing template
        await updateTemplate(selectedTemplateId, settings);
        toast({
          title: t.common.success,
          description: t.settings.templateSaved,
        });
      } else {
        // Create new template
        await createTemplate(
          settings.template.name,
          settings.template.description,
          {
            language: settings.template.language,
            settings
          }
        );
        toast({
          title: t.common.success,
          description: t.settings.templateSaved,
        });
      }
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: t.common.error,
        description: 'Failed to save template',
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (selectedTemplateId) {
      await deleteTemplate(selectedTemplateId);
      setIsDeleteDialogOpen(false);
      setSelectedTemplateId(null);
      toast({
        title: t.common.success,
        description: 'Template deleted successfully',
      });
    }
  };
  
  const handleSetAsDefault = async (id: string) => {
    await setDefaultTemplate(id);
    toast({
      title: t.common.success,
      description: 'Default template set successfully',
    });
  };
  
  const handleUseTemplate = (id: string) => {
    router.push(`/create-offer?template=${id}`);
  };
  
  const renderTemplateCard = (template: any, isUserTemplate: boolean) => {
    const isDefault = template.id === defaultTemplateId;
    
    return (
      <Card key={template.id} className="overflow-hidden">
        <div 
          className="h-3" 
          style={{ 
            backgroundColor: 
              template.settings?.appearance?.primaryColor || 
              '#0891B2' 
          }}
        ></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </div>
            {isDefault && (
              <Badge variant="outline" className="ml-2 bg-primary/10">
                {t.settings.default}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div 
            className="h-32 rounded-md overflow-hidden bg-gray-50 flex items-center justify-center"
            style={{ 
              backgroundColor: template.settings?.appearance?.secondaryColor || '#F0F9FF',
              color: template.settings?.appearance?.primaryColor || '#0891B2',
            }}
          >
            <div className="text-center p-4">
              <p className="text-sm opacity-70">
                {template.settings?.designTemplate === 'modern-dark' ? 'Modern Dark Template' :
                 template.settings?.designTemplate === 'gradient' ? 'Gradient Template' :
                 template.settings?.designTemplate === 'business-pro' ? 'Business Pro Template' :
                 'Classic Template'}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleUseTemplate(template.id)}
          >
            {t.settings.useTemplate}
          </Button>
          
          <div className="flex gap-1">
            {isUserTemplate && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditTemplate(template.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            
            {isUserTemplate && !isDefault && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleSetAsDefault(template.id)}
                title={t.settings.setAsDefault}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };
  
  const renderTemplatesGrid = (templates: any[], isUserTemplates: boolean) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-20" />
              </CardFooter>
            </Card>
          ))}
        </div>
      );
    }
    
    if (templates.length === 0 && isUserTemplates) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">{t.settings.noTemplates}</p>
          <Button onClick={handleCreateTemplate}>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.settings.createTemplate}
          </Button>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => renderTemplateCard(template, isUserTemplates))}
        
        {isUserTemplates && (
          <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:bg-accent/20 transition-colors"
            onClick={handleCreateTemplate}
          >
            <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
            <p className="text-muted-foreground font-medium">{t.settings.createNewTemplate}</p>
          </Card>
        )}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">{t.settings.offerTemplates}</h2>
        <Button onClick={handleCreateTemplate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t.settings.createTemplate}
        </Button>
      </div>
      
      <p className="text-muted-foreground">{t.settings.templatesDescription}</p>
      
      <Separator />
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="user">{t.settings.userTemplates}</TabsTrigger>
          <TabsTrigger value="sample">{t.settings.sampleTemplates}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="user">
          {renderTemplatesGrid(userTemplates, true)}
        </TabsContent>
        
        <TabsContent value="sample">
          {renderTemplatesGrid(sampleTemplates, false)}
        </TabsContent>
      </Tabs>
      
      {/* Template Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <TemplateSettings 
            initialSettings={selectedTemplateId ? getTemplateById(selectedTemplateId)?.settings : undefined}
            onSave={handleSaveTemplate}
            onCancel={handleCloseSettings}
            isEditing={!!selectedTemplateId}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Template Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.common.confirmDelete}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.settings.confirmDeleteTemplate}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OfferTemplatesSection;
