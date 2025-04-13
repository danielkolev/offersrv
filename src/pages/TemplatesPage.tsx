import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTemplateManagement } from '@/hooks/use-template-management';
import BackButton from '@/components/navigation/BackButton';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Settings, Eye, Edit, Trash2, Plus, Star, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const TemplatesPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const { 
    userTemplates, 
    sampleTemplates, 
    isLoading, 
    createTemplate, 
    deleteTemplate, 
    editTemplate,
    setAsDefaultTemplate,
    defaultTemplateId
  } = useTemplateManagement();
  
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();
  const [previewMode, setPreviewMode] = useState(false);
  const [sampleTemplatesOpen, setSampleTemplatesOpen] = useState(false);

  // Filter out sample templates for the user templates list
  const filteredUserTemplates = userTemplates.filter(template => !template.isSample);

  useEffect(() => {
    // Auto-open sample templates if there are no user templates
    if (filteredUserTemplates.length === 0 && !isLoading) {
      setSampleTemplatesOpen(true);
    }
  }, [filteredUserTemplates, isLoading]);

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

  const handleCreateTemplate = () => {
    setSelectedTemplateId(undefined);
    setActiveTab('settings');
    setPreviewMode(false);
  };

  const handleEditTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setActiveTab('settings');
    setPreviewMode(false);
  };

  const handleViewTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setPreviewMode(true);
  };

  const handleClosePreview = () => {
    setPreviewMode(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    if (window.confirm(t.offer.templates.confirmDelete)) {
      deleteTemplate(templateId);
      toast({
        title: t.common.success,
        description: t.offer.templates.templateDeleted
      });
    }
  };
  
  const handleSetAsDefault = (templateId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setAsDefaultTemplate(templateId);
  };

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
              setSelectedTemplateId(undefined);
            }}
          >
            <Settings className="h-4 w-4 mr-2" />
            {t.common.settings}
          </Button>
          <Button onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
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
              ) : (
                <>
                  {/* User Templates */}
                  {filteredUserTemplates.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">{t.offer.templates.userTemplates}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredUserTemplates.map((template) => (
                          <Card key={template.id} className="border rounded-lg shadow-sm">
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center gap-1">
                                {template.name}
                                {template.id === defaultTemplateId && 
                                  <Star className="h-4 w-4 text-amber-500 ml-1" aria-label={t.offer.templates.defaultTemplate} />
                                }
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-500 mb-4">
                                {template.description || t.offer.templates.noDescription}
                              </p>
                              <div className="flex justify-between gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewTemplate(template.id)}
                                  className="gap-1"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  {t.common.view}
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleEditTemplate(template.id)}
                                  className="gap-1"
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                  {t.common.edit}
                                </Button>
                                {template.id !== defaultTemplateId ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={(e) => handleSetAsDefault(template.id, e)}
                                    className="gap-1"
                                    title={t.offer.templates.setAsDefault}
                                  >
                                    <Star className="h-3.5 w-3.5" />
                                  </Button>
                                ) : null}
                                <Button 
                                  variant="destructive" 
                                  size="sm" 
                                  onClick={() => handleDeleteTemplate(template.id)}
                                  className="gap-1"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  {t.common.delete}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Sample Templates */}
                  <Collapsible open={sampleTemplatesOpen} onOpenChange={setSampleTemplatesOpen}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-medium">{t.offer.templates.sampleTemplates}</h3>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {sampleTemplatesOpen 
                            ? (language === 'bg' ? 'Скрий' : 'Hide') 
                            : (language === 'bg' ? 'Покажи' : 'Show')}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {sampleTemplates.map((template) => (
                          <Card 
                            key={template.id} 
                            className="border rounded-lg shadow-sm"
                            style={{
                              borderLeftColor: template.settings?.appearance?.primaryColor || '#1E88E5',
                              borderLeftWidth: '4px'
                            }}
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg flex items-center gap-1">
                                {template.name}
                                {template.id === defaultTemplateId && 
                                  <Star className="h-4 w-4 text-amber-500 ml-1" aria-label={t.offer.templates.defaultTemplate} />
                                }
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-500 mb-4">
                                {template.description || t.offer.templates.noDescription}
                              </p>
                              <div className="flex justify-between gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewTemplate(template.id)}
                                  className="gap-1 flex-1"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  {t.common.view}
                                </Button>
                                {template.id !== defaultTemplateId ? (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={(e) => handleSetAsDefault(template.id, e)}
                                    className="gap-1"
                                    title={t.offer.templates.setAsDefault}
                                  >
                                    <Star className="h-3.5 w-3.5" />
                                  </Button>
                                ) : null}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {filteredUserTemplates.length === 0 && !sampleTemplates.length && (
                    <div className="text-center py-8 text-gray-500">
                      {t.offer.templates.noTemplatesFound}
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <TemplateSettings selectedTemplateId={selectedTemplateId} />
        </TabsContent>
      </Tabs>
      
      {/* Template Preview Dialog */}
      <Dialog open={previewMode} onOpenChange={handleClosePreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {t.offer.templates.templatePreview}: {' '}
              {(userTemplates.find(t => t.id === selectedTemplateId) || 
                sampleTemplates.find(t => t.id === selectedTemplateId))?.name || ''}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <TemplateSettings selectedTemplateId={selectedTemplateId} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TemplatesPage;
