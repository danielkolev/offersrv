
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  PaletteSwatch, 
  TextAlignCenter, 
  TextAlignLeft, 
  TextAlignRight,
  LayoutGrid,
  SquareStack,
  Settings
} from 'lucide-react';

interface TemplateSettingsProps {
  selectedTemplateId?: string;
}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({ selectedTemplateId }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('appearance');
  
  // Default template settings
  const [settings, setSettings] = useState({
    appearance: {
      primaryColor: '#7e69ab',
      secondaryColor: '#f8f9fa',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      roundedCorners: true,
      headerStyle: 'standard',
    },
    layout: {
      showLogo: true,
      logoPosition: 'left',
      headerLayout: 'standard',
      showPageNumbers: true,
      compactMode: false,
    },
    content: {
      showBundleDetails: true,
      showProductCodes: true,
      boldPrices: true,
      showFooter: true,
      footerText: language === 'bg' ? 'Благодарим Ви за доверието!' : 'Thank you for your business!',
    }
  });
  
  const handleAppearanceChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      appearance: {
        ...settings.appearance,
        [key]: value
      }
    });
  };
  
  const handleLayoutChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      layout: {
        ...settings.layout,
        [key]: value
      }
    });
  };
  
  const handleContentChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      content: {
        ...settings.content,
        [key]: value
      }
    });
  };
  
  const saveSettings = () => {
    // Here we would save the settings to the database or local storage
    console.log('Saving template settings:', settings);
    // Implementation to be added when we have the backend API ready
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          {language === 'bg' ? 'Настройки на шаблона' : 'Template Settings'}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="appearance">
              <PaletteSwatch className="h-4 w-4 mr-2" />
              {language === 'bg' ? 'Визия' : 'Appearance'}
            </TabsTrigger>
            <TabsTrigger value="layout">
              <LayoutGrid className="h-4 w-4 mr-2" />
              {language === 'bg' ? 'Оформление' : 'Layout'}
            </TabsTrigger>
            <TabsTrigger value="content">
              <SquareStack className="h-4 w-4 mr-2" />
              {language === 'bg' ? 'Съдържание' : 'Content'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">
                  {language === 'bg' ? 'Основен цвят' : 'Primary Color'}
                </Label>
                <div className="flex gap-2">
                  <Input 
                    id="primaryColor"
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                    className="w-12 h-9 p-1"
                  />
                  <Input 
                    type="text"
                    value={settings.appearance.primaryColor}
                    onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">
                  {language === 'bg' ? 'Размер на шрифта' : 'Font Size'}
                </Label>
                <select 
                  id="fontSize"
                  className="w-full p-2 border rounded-md"
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                >
                  <option value="small">{language === 'bg' ? 'Малък' : 'Small'}</option>
                  <option value="medium">{language === 'bg' ? 'Среден' : 'Medium'}</option>
                  <option value="large">{language === 'bg' ? 'Голям' : 'Large'}</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="roundedCorners"
                checked={settings.appearance.roundedCorners}
                onCheckedChange={(checked) => handleAppearanceChange('roundedCorners', checked)}
              />
              <Label htmlFor="roundedCorners">
                {language === 'bg' ? 'Заоблени ъгли' : 'Rounded Corners'}
              </Label>
            </div>
          </TabsContent>
          
          <TabsContent value="layout" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="showLogo"
                checked={settings.layout.showLogo}
                onCheckedChange={(checked) => handleLayoutChange('showLogo', checked)}
              />
              <Label htmlFor="showLogo">
                {language === 'bg' ? 'Покажи лого' : 'Show Logo'}
              </Label>
            </div>
            
            {settings.layout.showLogo && (
              <div className="space-y-2 pl-6">
                <Label>{language === 'bg' ? 'Позиция на логото' : 'Logo Position'}</Label>
                <div className="flex gap-2">
                  <Button
                    variant={settings.layout.logoPosition === 'left' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange('logoPosition', 'left')}
                    className="flex-1"
                  >
                    <TextAlignLeft className="h-4 w-4 mr-2" />
                    {language === 'bg' ? 'Ляво' : 'Left'}
                  </Button>
                  <Button
                    variant={settings.layout.logoPosition === 'center' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange('logoPosition', 'center')}
                    className="flex-1"
                  >
                    <TextAlignCenter className="h-4 w-4 mr-2" />
                    {language === 'bg' ? 'Център' : 'Center'}
                  </Button>
                  <Button
                    variant={settings.layout.logoPosition === 'right' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleLayoutChange('logoPosition', 'right')}
                    className="flex-1"
                  >
                    <TextAlignRight className="h-4 w-4 mr-2" />
                    {language === 'bg' ? 'Дясно' : 'Right'}
                  </Button>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showPageNumbers"
                checked={settings.layout.showPageNumbers}
                onCheckedChange={(checked) => handleLayoutChange('showPageNumbers', checked)}
              />
              <Label htmlFor="showPageNumbers">
                {language === 'bg' ? 'Номерация на страниците' : 'Show Page Numbers'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="compactMode"
                checked={settings.layout.compactMode}
                onCheckedChange={(checked) => handleLayoutChange('compactMode', checked)}
              />
              <Label htmlFor="compactMode">
                {language === 'bg' ? 'Компактен режим' : 'Compact Mode'}
              </Label>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="showBundleDetails"
                checked={settings.content.showBundleDetails}
                onCheckedChange={(checked) => handleContentChange('showBundleDetails', checked)}
              />
              <Label htmlFor="showBundleDetails">
                {language === 'bg' ? 'Покажи детайли за пакети' : 'Show Bundle Details'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showProductCodes"
                checked={settings.content.showProductCodes}
                onCheckedChange={(checked) => handleContentChange('showProductCodes', checked)}
              />
              <Label htmlFor="showProductCodes">
                {language === 'bg' ? 'Покажи продуктови кодове' : 'Show Product Codes'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="boldPrices"
                checked={settings.content.boldPrices}
                onCheckedChange={(checked) => handleContentChange('boldPrices', checked)}
              />
              <Label htmlFor="boldPrices">
                {language === 'bg' ? 'Удебелени цени' : 'Bold Prices'}
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showFooter"
                checked={settings.content.showFooter}
                onCheckedChange={(checked) => handleContentChange('showFooter', checked)}
              />
              <Label htmlFor="showFooter">
                {language === 'bg' ? 'Покажи долен колонтитул' : 'Show Footer'}
              </Label>
            </div>
            
            {settings.content.showFooter && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="footerText">
                  {language === 'bg' ? 'Текст в долния колонтитул' : 'Footer Text'}
                </Label>
                <Input 
                  id="footerText"
                  value={settings.content.footerText}
                  onChange={(e) => handleContentChange('footerText', e.target.value)}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={saveSettings}>
            {language === 'bg' ? 'Запази настройки' : 'Save Settings'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateSettings;
