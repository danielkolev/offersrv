
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BookOpen, PlusCircle } from 'lucide-react';
import { useTemplateManagement } from '@/hooks/use-template-management';
import CreateTemplateDialog from './offer-templates/CreateTemplateDialog';
import TemplatesList from './offer-templates/TemplatesList';

const OfferTemplateSettings = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('default');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  
  const {
    userTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    updateTemplate
  } = useTemplateManagement();
  
  const handleSaveTemplate = async (name: string, description: string) => {
    await createTemplate(name, description);
  };

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
      
      <Tabs defaultValue="default" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="default">
            <BookOpen className="h-4 w-4 mr-2" />
            {t.offer.templates.defaultTemplates}
          </TabsTrigger>
          <TabsTrigger value="user">
            <PlusCircle className="h-4 w-4 mr-2" />
            {t.offer.templates.userTemplates}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="default">
          <TemplatesList 
            templates={[]}
            isLoading={false}
            isUserTemplates={false}
            onCreateNew={() => setSaveDialogOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="user">
          <TemplatesList 
            templates={userTemplates}
            isLoading={isLoading}
            isUserTemplates={true}
            onCreateNew={() => setSaveDialogOpen(true)}
            onDeleteTemplate={deleteTemplate}
            onEditTemplate={updateTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfferTemplateSettings;
