
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { useTemplateManagement } from '@/hooks/templates';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const TemplatesPage = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedSettings, setSelectedSettings] = useState({
    primaryColor: '#0891B2',
    tableHeaderColor: '#F3F4F6',
    orientation: 'portrait'
  });
  
  const {
    userTemplates,
    defaultTemplateId,
    editTemplate,
    isLoading
  } = useTemplateManagement();
  
  const defaultTemplate = userTemplates.find(template => template.id === defaultTemplateId);
  
  useEffect(() => {
    if (defaultTemplate?.settings) {
      setSelectedSettings({
        primaryColor: defaultTemplate.settings.primaryColor || '#0891B2',
        tableHeaderColor: defaultTemplate.settings.tableHeaderColor || '#F3F4F6',
        orientation: defaultTemplate.settings.orientation || 'portrait'
      });
    }
  }, [defaultTemplate]);
  
  const handleSaveSettings = async () => {
    if (defaultTemplateId) {
      try {
        await editTemplate(defaultTemplateId, {
          settings: selectedSettings
        });
        
        toast({
          title: t.common.success,
          description: t.offer.templates.templateSaved,
        });
      } catch (error) {
        toast({
          title: t.common.error,
          description: t.settings.saveTemplateFailed,
          variant: 'destructive',
        });
      }
    }
  };
  
  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBackClick}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {t.offer.templates.customizeAppearance}
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.offer.templates.defaultTemplate}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {/* Primary Color Picker */}
            <div>
              <Label>{t.offer.templates.primaryColor}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal"
                    style={{
                      backgroundColor: selectedSettings.primaryColor,
                      color: '#fff'
                    }}
                  >
                    {selectedSettings.primaryColor}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={selectedSettings.primaryColor}
                    onChange={(color) => setSelectedSettings(prev => ({
                      ...prev,
                      primaryColor: color
                    }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Table Header Color Picker */}
            <div>
              <Label>{t.offer.templates.tableHeaderColor}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[200px] justify-start text-left font-normal"
                    style={{
                      backgroundColor: selectedSettings.tableHeaderColor,
                      color: '#000'
                    }}
                  >
                    {selectedSettings.tableHeaderColor}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-3">
                  <HexColorPicker
                    color={selectedSettings.tableHeaderColor}
                    onChange={(color) => setSelectedSettings(prev => ({
                      ...prev,
                      tableHeaderColor: color
                    }))}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Orientation Selection */}
            <div className="space-y-2">
              <Label>{t.offer.templates.orientation}</Label>
              <RadioGroup
                value={selectedSettings.orientation}
                onValueChange={(value) => setSelectedSettings(prev => ({
                  ...prev,
                  orientation: value as 'portrait' | 'landscape'
                }))}
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

          <Button
            onClick={handleSaveSettings}
            className="mt-6"
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            {t.offer.templates.applyChanges}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TemplatesPage;
