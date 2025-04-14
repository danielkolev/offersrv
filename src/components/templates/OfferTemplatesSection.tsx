
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileText, Save, BookOpen, Info, Languages, Settings, Star, PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TemplateSettings from '@/components/settings/offer-templates/TemplateSettings';
import { useTemplateManagement, TemplateType } from '@/hooks/use-template-management';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// This is a more focused version of the OfferTemplates component
// to be used in the offer creation flow
const OfferTemplatesSection = () => {
  const { applyTemplate, offer } = useOffer();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('templates');
  const [templateName, setTemplateName] = useState('');
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | undefined>();
  const [sampleTemplatesOpen, setSampleTemplatesOpen] = useState(false);

  const {
    userTemplates,
    sampleTemplates,
    isLoading,
    createTemplate,
    deleteTemplate,
    updateTemplate, // Changed from editTemplate to updateTemplate
    refreshTemplates,
    getTemplateById,
    setAsDefaultTemplate,
    defaultTemplateId,
    resetToDefaultTemplate
  } = useTemplateManagement();
  
  // Filter templates based on the current language
  const filteredUserTemplates = userTemplates.filter(
    template => !template.isSample && (template.language === 'all' || template.language === offer.details.offerLanguage)
  );
  
  const filteredSampleTemplates = sampleTemplates.filter(
    template => template.language === 'all' || template.language === offer.details.offerLanguage
  );

  useEffect(() => {
    // If there's a default template, select it initially
    if (defaultTemplateId && !selectedTemplateId) {
      const defaultTemplate = userTemplates.find(t => t.id === defaultTemplateId);
      if (defaultTemplate) {
        setSelectedTemplateId(defaultTemplateId);
      }
    }
  }, [userTemplates, defaultTemplateId]);

  const handleSelectTemplate = (templateId: string) => {
    const template = userTemplates.find(t => t.id === templateId);
    if (template) {
      applyTemplate(templateId);
      setSelectedTemplateId(templateId);
    }
  };
  
  const handleSaveAsTemplate = async () => {
    if (!templateName.trim()) return;
    
    try {
      const newTemplateId = await createTemplate(templateName, '');
      setTemplateName('');
      setSaveDialogOpen(false);
      refreshTemplates();
      
      if (newTemplateId) {
        setSelectedTemplateId(newTemplateId);
      }
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };
  
  const handleSetAsDefault = (templateId: string) => {
    setAsDefaultTemplate(templateId);
  };
  
  const handleResetToDefault = () => {
    const defaultTemplate = resetToDefaultTemplate();
    if (defaultTemplate) {
      applyTemplate(defaultTemplate.id);
      setSelectedTemplateId(defaultTemplate.id);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">{t.offer.templates.title}</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setActiveTab('settings')}
            className={activeTab === 'settings' ? 'bg-muted' : ''}
          >
            <Settings className="h-4 w-4 mr-2" />
            {t.common.settings}
          </Button>
          <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                {t.offer.templates.createFromCurrent}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.offer.templates.saveAsTemplate}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">{t.offer.templates.templateName}</Label>
                  <Input 
                    id="template-name" 
                    value={templateName} 
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder={language === 'bg' ? 'напр. Моя стандартен шаблон' : 'e.g. My Standard Template'}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setSaveDialogOpen(false)}
                >
                  {t.common.cancel}
                </Button>
                <Button 
                  onClick={handleSaveAsTemplate} 
                  disabled={isLoading || !templateName.trim()}
                >
                  {isLoading ? t.common.saving : t.offer.templates.saveAsTemplate}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
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
            <p className="text-muted-foreground mb-4">{t.offer.templates.description}</p>
            
            {/* Default Template Section */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">{t.offer.templates.defaultTemplate}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleResetToDefault}
                >
                  {t.offer.templates.resetToDefault}
                </Button>
              </div>
              
              {defaultTemplateId && (
                <Card 
                  className={`hover:border-offer-blue transition-colors cursor-pointer ${
                    selectedTemplateId === defaultTemplateId ? 'border-offer-blue bg-blue-50' : ''
                  }`}
                  onClick={() => handleSelectTemplate(defaultTemplateId)}
                >
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium flex items-center gap-2 mb-2">
                          <FileText className="h-4 w-4" />
                          {userTemplates.find(t => t.id === defaultTemplateId)?.name || 'Default Template'}
                          <Star className="h-3 w-3 text-amber-500 ml-1" />
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">
                          {userTemplates.find(t => t.id === defaultTemplateId)?.description || t.offer.templates.defaultTemplate}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      variant={selectedTemplateId === defaultTemplateId ? "default" : "outline"}
                      size="sm" 
                      className="w-full justify-center mt-auto"
                    >
                      {selectedTemplateId === defaultTemplateId 
                        ? (language === 'bg' ? 'Активен' : 'Selected') 
                        : t.offer.templates.useTemplate}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* User Templates Section */}
            {filteredUserTemplates.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">{t.offer.templates.userTemplates}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUserTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`hover:border-offer-blue transition-colors cursor-pointer ${
                        selectedTemplateId === template.id ? 'border-offer-blue bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              {template.name}
                              {template.isDefault && <Star className="h-3 w-3 text-amber-500 ml-1" />}
                            </h4>
                            {template.language && (
                              <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                                <Languages className="h-3 w-3" /> 
                                {template.language === 'bg' ? 'Български' : template.language === 'en' ? 'English' : 'Multi-language'}
                              </div>
                            )}
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-auto">
                          <Button 
                            variant={selectedTemplateId === template.id ? "default" : "outline"}
                            size="sm" 
                            className="flex-1 justify-center"
                          >
                            {selectedTemplateId === template.id 
                              ? (language === 'bg' ? 'Активен' : 'Selected') 
                              : t.offer.templates.useTemplate}
                          </Button>
                          {!template.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetAsDefault(template.id);
                              }}
                              title={t.offer.templates.setAsDefault}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Sample Templates Section */}
            <Collapsible open={sampleTemplatesOpen} onOpenChange={setSampleTemplatesOpen} className="mb-4">
              <div className="flex items-center justify-between mb-2">
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
                  {filteredSampleTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`hover:border-offer-blue transition-colors cursor-pointer ${
                        selectedTemplateId === template.id ? 'border-offer-blue bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectTemplate(template.id)}
                      style={{
                        borderLeftColor: template.settings?.appearance?.primaryColor || '#1E88E5',
                        borderLeftWidth: '4px'
                      }}
                    >
                      <CardContent className="p-4 flex flex-col h-full">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium flex items-center gap-2 mb-2">
                              <FileText className="h-4 w-4" />
                              {template.name}
                              {template.isDefault && <Star className="h-3 w-3 text-amber-500 ml-1" />}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-auto">
                          <Button 
                            variant={selectedTemplateId === template.id ? "default" : "outline"}
                            size="sm" 
                            className="flex-1 justify-center"
                          >
                            {selectedTemplateId === template.id 
                              ? (language === 'bg' ? 'Активен' : 'Selected') 
                              : t.offer.templates.useTemplate}
                          </Button>
                          {!template.isDefault && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSetAsDefault(template.id);
                              }}
                              title={t.offer.templates.setAsDefault}
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Empty State */}
            {filteredUserTemplates.length === 0 && !filteredSampleTemplates.length && (
              <div className="text-center py-8 text-muted-foreground">
                <Info className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
                <p>{language === 'bg' 
                  ? 'Няма намерени шаблони за този език. Създайте нов шаблон.' 
                  : 'No templates found for this language. Create a new template.'}</p>
                <Button 
                  variant="link" 
                  className="mt-2"
                  onClick={() => setSaveDialogOpen(true)}
                >
                  {t.offer.templates.createFromCurrent}
                </Button>
              </div>
            )}
            
            {/* Create New Template Button */}
            <div className="mt-6 flex justify-center">
              <Button 
                variant="outline" 
                onClick={() => setSaveDialogOpen(true)}
                className="gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                {t.offer.templates.createNew}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <TemplateSettings selectedTemplateId={selectedTemplateId} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OfferTemplatesSection;
