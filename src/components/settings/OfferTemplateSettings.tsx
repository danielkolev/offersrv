
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Settings2, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTemplateManagement } from '@/hooks/templates';

const OfferTemplateSettings = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const {
    userTemplates,
    defaultTemplateId,
    isLoading
  } = useTemplateManagement();
  
  // Get default template
  const defaultTemplate = userTemplates.find(template => template.id === defaultTemplateId);
  
  // Handle edit template
  const handleEditTemplate = () => {
    navigate('/settings/templates');
  };

  return (
    <div className="mb-8 pb-8 border-b">
      <div className="flex flex-row items-center justify-between pb-2">
        <h2 className="text-xl font-semibold">{t.settings.offerTemplates}</h2>
      </div>
      
      <p className="text-muted-foreground mb-4">{t.settings.templatesDescription}</p>
      
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t.offer.templates.currentTemplate}</span>
            {defaultTemplate?.is_default && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                {t.offer.templates.defaultTemplate}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="flex items-center">
            <div className="flex-1">
              <p className="font-medium text-lg">
                {defaultTemplate?.templateType === 'modernDark' 
                  ? t.offer.templates.designTemplates.modernDark 
                  : t.offer.templates.designTemplates.classic}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {defaultTemplate?.settings?.appearance?.primaryColor && (
                  <span className="inline-flex items-center">
                    <span 
                      className="h-3 w-3 rounded-full mr-1 inline-block"
                      style={{ backgroundColor: defaultTemplate.settings.appearance.primaryColor }}
                    ></span>
                    {defaultTemplate.settings.appearance.primaryColor}
                  </span>
                )}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-6">
          <Button 
            onClick={handleEditTemplate}
            className="w-full"
          >
            <Settings2 className="h-4 w-4 mr-2" />
            {t.settings.edit}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OfferTemplateSettings;
