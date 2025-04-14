
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Check, Trash, Pencil } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { TemplateType } from '@/types/template';
import TemplateCard from '@/components/settings/offer-templates/TemplateCard';
import { useToast } from '@/hooks/use-toast';
import CreateTemplateDialog from '@/components/settings/offer-templates/CreateTemplateDialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import EmptyTemplateState from '@/components/settings/offer-templates/EmptyTemplateState';

const OfferTemplatesSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('default');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  const [templateToEdit, setTemplateToEdit] = useState<TemplateType | null>(null);
  
  // Get complete template management hooks
  const {
    userTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    refreshTemplates
  } = useTemplateManagement();
  
  const handleSaveTemplate = async (name: string, description: string, settings?: any, isDefault?: boolean) => {
    await createTemplate(name, description, settings, isDefault);
  };
  
  const handleEditTemplate = (template: TemplateType) => {
    setTemplateToEdit(template);
    navigate(`/settings/templates/${template.id}`);
  };
  
  const handleDeleteTemplate = async () => {
    if (templateToDelete) {
      await deleteTemplate(templateToDelete);
      setTemplateToDelete(null);
    }
  };
  
  const handleConfirmDelete = (templateId: string) => {
    setTemplateToDelete(templateId);
  };
  
  const handleCancelDelete = () => {
    setTemplateToDelete(null);
  };
  
  const handleCreateNew = () => {
    navigate('/settings/templates/new');
  };
  
  const handleShowUserTemplatesOnly = (showOnlyUserTemplates: boolean) => {
    const queryParams = new URLSearchParams(location.search);
    if (showOnlyUserTemplates) {
      queryParams.set('filter', 'user');
    } else {
      queryParams.delete('filter');
    }
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  
  const showOnlyUserTemplates = location.search.includes('filter=user');
  
  return (
    <div className="mb-8 pb-8 border-b">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">{t.settings.offerTemplates}</h2>
        <CreateTemplateDialog 
          onSave={handleSaveTemplate}
          isLoading={isLoading}
        />
      </div>
      
      <p className="text-muted-foreground mb-4">{t.settings.templatesDescription}</p>
      
      <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="user">
            {t.settings.userTemplates}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="user">
          {isLoading ? (
            <div className="text-center py-8">{t.common.loading}</div>
          ) : userTemplates && userTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userTemplates.map(template => (
                <Card key={template.id} className="hover:border-offer-blue transition-colors cursor-pointer">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          {template.name}
                        </h4>
                        {template.language && (
                          <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                            {template.language === 'bg' ? 'Български' : 'English'}
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmDelete(template.id);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full justify-center mt-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditTemplate(template);
                      }}
                    >
                      {t.settings.editTemplate}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyTemplateState onCreateNew={handleCreateNew} />
          )}
        </TabsContent>
      </Tabs>
      
      <AlertDialog open={!!templateToDelete} onOpenChange={() => setTemplateToDelete(null)}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden"></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.settings.confirmDeleteTemplate}
          </AlertDialogDescription>
          <AlertDialogCancel onClick={handleCancelDelete}>{t.common.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTemplate} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            {t.common.delete}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OfferTemplatesSection;
