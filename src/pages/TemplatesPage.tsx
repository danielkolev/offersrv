
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useTemplateManagement } from '@/hooks/use-template-management';
import CreateTemplateDialog from '@/components/settings/offer-templates/CreateTemplateDialog';
import TemplatesList from '@/components/settings/offer-templates/TemplatesList';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('default');
  
  const {
    userTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    editTemplate
  } = useTemplateManagement();

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  const handleSaveTemplate = async (name: string, description: string) => {
    await createTemplate(name, description);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.offer.templates.title}
        </h1>
        <CreateTemplateDialog 
          onSave={handleSaveTemplate}
          isLoading={isLoading}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.templatesDescription}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="default" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="default">
                {t.offer.templates.defaultTemplates}
              </TabsTrigger>
              <TabsTrigger value="user">
                {t.offer.templates.userTemplates}
              </TabsTrigger>
              <TabsTrigger value="bundle">
                Bundle Offers
              </TabsTrigger>
              <TabsTrigger value="services">
                Service Offers
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="default">
              <TemplatesList 
                templates={[]}
                isLoading={false}
                isUserTemplates={false}
                onCreateNew={() => {}}
              />
            </TabsContent>
            
            <TabsContent value="user">
              <TemplatesList 
                templates={userTemplates}
                isLoading={isLoading}
                isUserTemplates={true}
                onCreateNew={() => {}}
                onDeleteTemplate={deleteTemplate}
                onEditTemplate={editTemplate}
              />
            </TabsContent>
            
            <TabsContent value="bundle">
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t.common.comingSoon}</p>
                <p className="text-sm mt-2">{t.common.featureInDevelopment}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="services">
              <div className="text-center py-8">
                <p className="text-muted-foreground">{t.common.comingSoon}</p>
                <p className="text-sm mt-2">{t.common.featureInDevelopment}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesPage;
