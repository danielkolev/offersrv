
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTemplateManagement } from '@/hooks/use-template-management';
import BackButton from '@/components/navigation/BackButton';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Settings } from 'lucide-react';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { userTemplates, isLoading, createTemplate, deleteTemplate, editTemplate } = useTemplateManagement();
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();

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

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton label={t.common.back} to="/" />
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.offer.templates.title}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => {
              setActiveTab('settings');
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            {t.common.settings}
          </Button>
          <Button onClick={() => createTemplate('New Template', '')}>
            {t.offer.templates.createNew}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            {t.offer.templates.title}
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            {t.common.settings}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>{t.offer.templates.availableTemplates}</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">{t.common.loading}</div>
              ) : userTemplates.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {t.offer.templates.noTemplatesFound}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userTemplates.map((template) => (
                    <Card key={template.id} className="border rounded-lg shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500 mb-4">
                          {template.description || t.offer.templates.noDescription}
                        </p>
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => {
                              setSelectedTemplateId(template.id);
                              setActiveTab('settings');
                            }}
                          >
                            {t.common.edit}
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => deleteTemplate(template.id)}
                          >
                            {t.common.delete}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <TemplateSettings selectedTemplateId={selectedTemplateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesPage;
