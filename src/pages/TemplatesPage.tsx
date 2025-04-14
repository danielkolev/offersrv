
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { PlusCircle, Pencil, Trash2, CheckCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('templates');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [showUserTemplatesOnly, setShowUserTemplatesOnly] = useState(true);
  
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
  
  const allTemplates = showUserTemplatesOnly
    ? userTemplates
    : [...userTemplates, ...sampleTemplates];
  
  const handleCreateTemplate = () => {
    setSelectedTemplateId(null);
    setIsSettingsOpen(true);
  };
  
  const handleEditTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setIsSettingsOpen(true);
  };
  
  const handleDeleteTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!selectedTemplateId) return;
    
    try {
      await deleteTemplate(selectedTemplateId);
      toast({
        title: t.common.success,
        description: t.settings.templateDeleted
      });
    } catch (error) {
      console.error('Error deleting template:', error);
      toast({
        title: t.common.error,
        description: t.settings.deleteTemplateFailed,
        variant: 'destructive'
      });
    }
    
    setIsDeleteDialogOpen(false);
  };
  
  const handleSaveTemplate = async (settings: any) => {
    try {
      if (selectedTemplateId) {
        // Updating existing template
        await updateTemplate(selectedTemplateId, settings);
        toast({
          title: t.common.success,
          description: t.settings.templateUpdated
        });
      } else {
        // Creating new template
        await createTemplate(settings.template.name, settings.template.description, {
          language: settings.template.language,
          settings
        });
        toast({
          title: t.common.success,
          description: t.settings.templateCreated
        });
      }
      setIsSettingsOpen(false);
    } catch (error) {
      console.error('Error saving template:', error);
      toast({
        title: t.common.error,
        description: t.settings.saveTemplateFailed,
        variant: 'destructive'
      });
    }
  };
  
  const handleSetAsDefault = async (id: string) => {
    try {
      await setDefaultTemplate(id);
      toast({
        title: t.common.success,
        description: t.settings.defaultTemplateSet
      });
    } catch (error) {
      console.error('Error setting default template:', error);
      toast({
        title: t.common.error,
        description: t.settings.setDefaultFailed,
        variant: 'destructive'
      });
    }
  };
  
  const handleUseTemplate = (id: string) => {
    navigate(`/create-offer?template=${id}`);
  };
  
  const renderTemplateCard = (template: any) => {
    const isDefault = template.id === defaultTemplateId;
    const isUserTemplate = userTemplates.some(t => t.id === template.id);
    
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
                  <Pencil className="h-4 w-4" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleDeleteTemplate(template.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                {!isDefault && (
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleSetAsDefault(template.id)}
                    title={t.settings.setAsDefault}
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };
  
  const renderTemplates = () => {
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
    
    if (allTemplates.length === 0) {
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
        {allTemplates.map(renderTemplateCard)}
        
        <Card className="flex flex-col items-center justify-center p-6 border-dashed cursor-pointer hover:bg-accent/20 transition-colors"
          onClick={handleCreateTemplate}
        >
          <PlusCircle className="h-8 w-8 mb-2 text-muted-foreground" />
          <p className="text-muted-foreground font-medium">{t.settings.createNewTemplate}</p>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight">{t.settings.templates}</h1>
        <Button onClick={handleCreateTemplate} className="self-start">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t.settings.createTemplate}
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="templates">{t.settings.offerTemplates}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="mb-4 flex items-center justify-end">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-user-templates"
                checked={showUserTemplatesOnly}
                onCheckedChange={setShowUserTemplatesOnly}
              />
              <Label htmlFor="show-user-templates">
                {t.settings.showUserTemplatesOnly}
              </Label>
            </div>
          </div>
          
          {renderTemplates()}
        </TabsContent>
      </Tabs>
      
      {/* Template Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto">
          <TemplateSettings 
            initialSettings={selectedTemplateId ? getTemplateById(selectedTemplateId)?.settings : undefined}
            onSave={handleSaveTemplate}
            onCancel={() => setIsSettingsOpen(false)}
            isEditing={!!selectedTemplateId}
          />
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
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

export default TemplatesPage;
