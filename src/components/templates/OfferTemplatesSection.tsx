
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash, Pencil } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTemplateManagement } from '@/hooks/templates';
import { TemplateType } from '@/types/template';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';
import EmptyTemplateState from '@/components/settings/offer-templates/EmptyTemplateState';

const OfferTemplatesSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null);
  
  // Get complete template management hooks
  const {
    userTemplates,
    isLoading,
    deleteTemplate,
  } = useTemplateManagement();
  
  const handleEditTemplate = (template: TemplateType) => {
    navigate(`/settings/templates/${template.id}`);
  };
  
  const handleDeleteTemplate = async () => {
    if (templateToDelete) {
      try {
        await deleteTemplate(templateToDelete);
        toast({
          title: t.common.success,
          description: t.settings.templateDeleted,
        });
        setTemplateToDelete(null);
      } catch (error) {
        toast({
          title: t.common.error,
          description: t.settings.deleteTemplateFailed,
          variant: 'destructive',
        });
      }
    }
  };
  
  const handleConfirmDelete = (templateId: string) => {
    setTemplateToDelete(templateId);
  };
  
  const handleCreateNew = () => {
    navigate('/settings/templates/new');
  };

  return (
    <div className="mb-8 pb-8 border-b">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">{t.settings.offerTemplates}</h2>
        <Button 
          onClick={handleCreateNew}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t.offer.templates.create}
        </Button>
      </div>
      
      <p className="text-muted-foreground mb-4">{t.settings.templatesDescription}</p>
      
      {isLoading ? (
        <div className="text-center py-8">{t.common.loading}</div>
      ) : userTemplates && userTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userTemplates.map(template => (
            <Card 
              key={template.id} 
              className="hover:border-offer-blue transition-colors cursor-pointer"
              onClick={() => handleEditTemplate(template)}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium flex items-center gap-2 mb-2">
                      {template.name}
                      {template.is_default && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                          {t.offer.templates.defaultTemplate}
                        </span>
                      )}
                    </h4>
                    {template.language && template.language !== 'all' && (
                      <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                        {template.language === 'bg' ? 'Български' : 'English'}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
                      {template.description || t.offer.templates.noDescription}
                    </p>
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
                
                <div className="flex justify-between mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditTemplate(template);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    {t.settings.editTemplate}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyTemplateState onCreateNew={handleCreateNew} />
      )}
      
      <AlertDialog open={!!templateToDelete} onOpenChange={() => setTemplateToDelete(null)}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="hidden"></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.settings.confirmDeleteTemplate}
          </AlertDialogDescription>
          <div className="flex justify-end gap-2 mt-4">
            <AlertDialogCancel onClick={() => setTemplateToDelete(null)}>
              {t.common.cancel}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteTemplate} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {t.common.delete}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OfferTemplatesSection;
