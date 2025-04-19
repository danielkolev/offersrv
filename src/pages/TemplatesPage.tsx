
import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useTemplateManagement } from '@/hooks/templates';
import TemplatesList from '@/components/settings/offer-templates/TemplatesList';
import CreateTemplateDialog from '@/components/settings/offer-templates/CreateTemplateDialog';
import BackButton from '@/components/navigation/BackButton';
import TemplatePreview from '@/components/settings/offer-templates/TemplatePreview';

// Import or define necessary component/function
import ColorPicker from '@/components/ui/ColorPicker';
import FormSection from '@/components/ui/form-section';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { 
    userTemplates, 
    defaultTemplateId, 
    isLoading, 
    setDefaultTemplate, 
    createTemplate, 
    deleteTemplate
  } = useTemplateManagement();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('user');
  const [editMode, setEditMode] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Template settings state
  const [primaryColor, setPrimaryColor] = useState('#4F46E5');
  const [tableHeaderColor, setTableHeaderColor] = useState('#F9FAFB');
  const [orientation, setOrientation] = useState('portrait');
  
  const handleCreateNew = () => {
    setIsCreateDialogOpen(true);
  };
  
  const handleDeleteTemplate = (templateId) => {
    if (window.confirm(t.offer.templates.confirmDelete)) {
      deleteTemplate(templateId);
    }
  };
  
  const handleEditTemplate = (templateId) => {
    const template = userTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      
      // Set initial values from template
      if (template.settings?.appearance?.primaryColor) {
        setPrimaryColor(template.settings.appearance.primaryColor);
      }
      
      if (template.settings?.appearance?.tableHeaderColor) {
        setTableHeaderColor(template.settings.appearance.tableHeaderColor);
      }
      
      if (template.settings?.layout?.orientation) {
        setOrientation(template.settings.layout.orientation);
      }
      
      setEditMode(true);
    }
  };
  
  const handleSaveTemplate = () => {
    if (selectedTemplate) {
      const updatedSettings = {
        ...selectedTemplate.settings,
        appearance: {
          ...selectedTemplate.settings?.appearance,
          primaryColor,
          tableHeaderColor
        },
        layout: {
          ...selectedTemplate.settings?.layout,
          orientation
        }
      };
      
      // Use the updateTemplate function from the hook to update the template's settings
      const updatedTemplate = {
        ...selectedTemplate,
        settings: updatedSettings
      };
      
      try {
        // Here we would normally call updateTemplateSettings, but we'll just log for now
        console.log('Saving template with settings:', updatedSettings);
        
        // After successful update
        setEditMode(false);
        setSelectedTemplate(null);
      } catch (error) {
        console.error('Error updating template:', error);
      }
    }
  };
  
  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="container py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton 
            label={t.common.back} 
            to="/settings"
          />
          <h1 className="text-2xl font-bold">{t.settings.offerTemplates}</h1>
        </div>
      </div>
      
      {editMode && selectedTemplate ? (
        <Card>
          <CardHeader>
            <CardTitle>{selectedTemplate.name}</CardTitle>
            <CardDescription>{selectedTemplate.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormSection title={t.offer.templates.title}>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="primaryColor">{t.offer.templates.primaryColor}</Label>
                      <ColorPicker 
                        color={primaryColor}
                        onChange={setPrimaryColor}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="tableHeaderColor">{t.offer.templates.tableHeaderColor}</Label>
                      <ColorPicker 
                        color={tableHeaderColor}
                        onChange={setTableHeaderColor}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="orientation">{t.offer.templates.orientation}</Label>
                      <RadioGroup 
                        value={orientation} 
                        onValueChange={setOrientation}
                        className="flex gap-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="portrait" id="portrait" />
                          <Label htmlFor="portrait">{t.offer.templates.portrait}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="landscape" id="landscape" />
                          <Label htmlFor="landscape">{t.offer.templates.landscape}</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </FormSection>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    {t.common.cancel}
                  </Button>
                  <Button onClick={handleSaveTemplate}>
                    {t.offer.templates.applyChanges}
                  </Button>
                </div>
              </div>
              
              <TemplatePreview 
                settings={{
                  appearance: {
                    primaryColor,
                    tableHeaderColor
                  },
                  layout: {
                    orientation
                  }
                }}
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="user">{t.settings.userTemplates}</TabsTrigger>
            <TabsTrigger value="system">{t.settings.sampleTemplates}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="user" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={handleCreateNew}>
                {t.settings.createTemplate}
              </Button>
            </div>
            
            <TemplatesList 
              templates={userTemplates}
              isLoading={isLoading}
              isUserTemplates={true}
              onCreateNew={handleCreateNew}
              onDeleteTemplate={handleDeleteTemplate}
              onEditTemplate={handleEditTemplate}
            />
          </TabsContent>
          
          <TabsContent value="system" className="space-y-4">
            <TemplatesList 
              templates={[]}
              isLoading={isLoading}
              isUserTemplates={false}
              onCreateNew={handleCreateNew}
            />
          </TabsContent>
        </Tabs>
      )}
      
      <CreateTemplateDialog 
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateTemplate={createTemplate}
      />
    </div>
  );
};

export default TemplatesPage;
