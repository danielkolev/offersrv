import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTemplateManagement } from '@/hooks/use-template-management';
import OfferTemplateSettings from '@/components/settings/OfferTemplateSettings';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { useToast } from '@/hooks/use-toast';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const {
    userTemplates,
    isLoading,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    setDefaultTemplate,
    refreshTemplates
  } = useTemplateManagement();
  const { toast } = useToast();
  
  useEffect(() => {
    refreshTemplates();
  }, [refreshTemplates]);
  
  const handleCreateTemplate = async (name: string, description: string, settings?: any, isDefault?: boolean) => {
    try {
      await createTemplate(name, description, settings, isDefault);
      setIsCreating(false);
      toast({
        title: t.common.success,
        description: t.settings.templateCreated,
      });
    } catch (error) {
      console.error("Error creating template:", error);
      toast({
        title: t.common.error,
        description: t.settings.saveTemplateFailed,
        variant: "destructive",
      });
    }
  };
  
  const handleUpdateTemplate = async (id: string, settings: any) => {
    try {
      await updateTemplate(id, settings);
      setIsEditing(false);
      setSelectedTemplateId(null);
      toast({
        title: t.common.success,
        description: t.settings.templateUpdated,
      });
    } catch (error) {
      console.error("Error updating template:", error);
      toast({
        title: t.common.error,
        description: t.settings.saveTemplateFailed,
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteTemplate = async (id: string) => {
    if (!window.confirm(t.settings.confirmDeleteTemplate)) {
      return;
    }
    
    try {
      await deleteTemplate(id);
      toast({
        title: t.common.success,
        description: t.settings.templateDeleted,
      });
    } catch (error) {
      console.error("Error deleting template:", error);
      toast({
        title: t.common.error,
        description: t.settings.deleteTemplateFailed,
        variant: "destructive",
      });
    }
  };
  
  const handleSetDefaultTemplate = async (id: string) => {
    try {
      await setDefaultTemplate(id);
      toast({
        title: t.common.success,
        description: t.settings.defaultTemplateSet,
      });
    } catch (error) {
      console.error("Error setting default template:", error);
      toast({
        title: t.common.error,
        description: t.settings.setDefaultFailed,
        variant: "destructive",
      });
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedTemplateId(null);
  };
  
  const handleUseTemplate = (templateId: string) => {
    navigate(`/new-offer?template=${templateId}`);
  };

  const templateOptions = t.settings.templates;
  const templateOptionsNode = React.useMemo(() => (
    <>
      <span>{templateOptions.classic}</span>
      <span>{templateOptions.modernDark}</span>
      <span>{templateOptions.gradient}</span>
      <span>{templateOptions.businessPro}</span>
      <span>{templateOptions.selectDesign}</span>
    </>
  ), [templateOptions]);
  
  const handleCreateNew = () => {
    setIsCreating(true);
  };
  
  const handleEditTemplate = (id: string) => {
    setSelectedTemplateId(id);
    setIsEditing(true);
  };
  
  const handleShowUserTemplatesOnly = (showOnlyUserTemplates: boolean) => {
    // Implement logic to filter templates based on user preference
    console.log("Show User Templates Only:", showOnlyUserTemplates);
  };
  
  return (
    <div>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6">{t.settings.offerTemplates}</h1>
        
        {isLoading ? (
          <div className="text-center py-4">{t.common.loading}</div>
        ) : (
          <>
            <OfferTemplateSettings />
          </>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage;
