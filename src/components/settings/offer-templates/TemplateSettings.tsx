
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { AlertCircle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';

interface TemplateSettingsProps {
  selectedTemplateId: string;
  onSettingsChange: (settings: any) => void;
  onSave: (settings: any) => void;
  initialSettings?: any;
  resetToDefault?: () => void;
}

const defaultSettings = {
  templateType: 'classic',
  appearance: {
    primaryColor: '#3B82F6',
    secondaryColor: '#F3F4F6',
    textColor: '#111827',
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    tableHeaderColor: '#F9FAFB',
    tableRowAlternateColor: '#F3F4F6',
    buttonColor: '#3B82F6',
    fontFamily: 'Inter, sans-serif',
    fontSize: 'medium',
  },
  header: {
    showCompanyLogo: true,
    showCompanyName: true,
    showCompanySlogan: true,
    showOfferLabel: true,
    useGradient: false,
    headerBackgroundColor: '#FFFFFF',
    headerTextColor: '#111827',
  },
  content: {
    showLineNumbers: true,
    showProductDescription: true,
    showPartNumbers: true,
    showFooter: true,
    footerText: '',
    tableBorderStyle: 'solid',
    tableBorderWidth: '1px',
    tableBorderColor: '#E5E7EB',
  },
  footer: {
    showBankDetails: false,
    showSignatureArea: true,
    signatureText: '',
    footerBackgroundColor: '#FFFFFF',
    footerTextColor: '#111827',
  },
  layout: {
    compactMode: false,
    fullWidth: false,
    padding: '16px',
    borderRadius: '8px',
  }
};

const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  selectedTemplateId,
  onSettingsChange,
  onSave,
  initialSettings,
  resetToDefault
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('appearance');
  const [settingsState, setSettingsState] = useState(initialSettings || defaultSettings);
  
  // Define form schema
  const formSchema = z.object({
    templateType: z.string(),
    // We'll handle the nested settings separately
  });
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      templateType: (initialSettings?.templateType || 'classic') as string,
    }
  });
  
  // Update settings when initialSettings change
  useEffect(() => {
    if (initialSettings) {
      setSettingsState({
        ...defaultSettings,
        ...initialSettings
      });
    }
  }, [initialSettings]);
  
  // Update form values when initialSettings change
  useEffect(() => {
    form.setValue('templateType', (initialSettings?.templateType || 'classic') as string);
  }, [initialSettings, form]);
  
  // Handle settings changes
  const handleSettingChange = (category: string, setting: string, value: any) => {
    const newSettings = {
      ...settingsState,
      [category]: {
        ...settingsState[category],
        [setting]: value
      }
    };
    
    setSettingsState(newSettings);
    onSettingsChange(newSettings);
  };
  
  // Handle nested settings changes
  const handleNestedSettingChange = (category: string, parent: string, setting: string, value: any) => {
    const newSettings = {
      ...settingsState,
      [category]: {
        ...settingsState[category],
        [parent]: {
          ...settingsState[category]?.[parent],
          [setting]: value
        }
      }
    };
    
    setSettingsState(newSettings);
    onSettingsChange(newSettings);
  };
  
  // Handle template type change
  const handleTemplateTypeChange = (value: string) => {
    const newSettings = {
      ...settingsState,
      templateType: value
    };
    
    form.setValue('templateType', value);
    setSettingsState(newSettings);
    onSettingsChange(newSettings);
  };
  
  // Handle form submission
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const completeSettings = {
      ...settingsState,
      templateType: data.templateType
    };
    
    onSave(completeSettings);
    
    toast({
      title: t.common.success,
      description: t.settings.settingsSaved,
    });
  };

  // Color picker component for reuse
  const ColorPickerField = ({ label, category, property, color }) => (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex items-center gap-2">
        <div 
          className="h-10 w-10 rounded border"
          style={{ backgroundColor: color }}
        ></div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {t.settings.pickColor}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <HexColorPicker 
              color={color}
              onChange={(color) => handleSettingChange(category, property, color)}
            />
          </PopoverContent>
        </Popover>
        <Input 
          value={color}
          onChange={(e) => handleSettingChange(category, property, e.target.value)}
          className="w-28"
        />
      </div>
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.settings.template}</CardTitle>
            <div className="flex gap-2">
              {resetToDefault && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={resetToDefault}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {t.settings.resetToDefault}
                </Button>
              )}
              <Button 
                type="submit" 
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {t.settings.saveTemplate}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="templateType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.offer.templates.designTemplateType}</FormLabel>
                  <Select 
                    onValueChange={(value) => handleTemplateTypeChange(value)}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="classic">{t.offer.templates.designTemplates.classic}</SelectItem>
                      <SelectItem value="modernDark">{t.offer.templates.designTemplates.modernDark}</SelectItem>
                      <SelectItem value="gradient">{t.offer.templates.designTemplates.gradient}</SelectItem>
                      <SelectItem value="businessPro">{t.offer.templates.designTemplates.businessPro}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        
        <Tabs defaultValue="appearance" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-background border">
            <TabsTrigger value="appearance" className="flex-1">
              {t.settings.appearance}
            </TabsTrigger>
            <TabsTrigger value="header" className="flex-1">
              {t.settings.header}
            </TabsTrigger>
            <TabsTrigger value="content" className="flex-1">
              {t.settings.content}
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex-1">
              {t.settings.footer}
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex-1">
              {t.settings.layout}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.appearanceSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Primary Color */}
                  <ColorPickerField 
                    label={t.settings.primaryColor}
                    category="appearance"
                    property="primaryColor"
                    color={settingsState.appearance?.primaryColor || '#3B82F6'}
                  />
                  
                  {/* Secondary Color */}
                  <ColorPickerField 
                    label={t.settings.secondaryColor}
                    category="appearance"
                    property="secondaryColor"
                    color={settingsState.appearance?.secondaryColor || '#F3F4F6'}
                  />
                  
                  {/* Text Color */}
                  <ColorPickerField 
                    label={t.settings.textColor}
                    category="appearance"
                    property="textColor"
                    color={settingsState.appearance?.textColor || '#111827'}
                  />
                  
                  {/* Border Color */}
                  <ColorPickerField 
                    label="Цвят на рамки"
                    category="appearance"
                    property="borderColor"
                    color={settingsState.appearance?.borderColor || '#E5E7EB'}
                  />
                  
                  {/* Background Color */}
                  <ColorPickerField 
                    label={t.settings.backgroundColor}
                    category="appearance"
                    property="backgroundColor"
                    color={settingsState.appearance?.backgroundColor || '#FFFFFF'}
                  />
                  
                  {/* Table Header Color */}
                  <ColorPickerField 
                    label="Цвят на хедър на таблица"
                    category="appearance"
                    property="tableHeaderColor"
                    color={settingsState.appearance?.tableHeaderColor || '#F9FAFB'}
                  />
                  
                  {/* Table Row Alternate Color */}
                  <ColorPickerField 
                    label="Цвят на редуващи се редове"
                    category="appearance"
                    property="tableRowAlternateColor"
                    color={settingsState.appearance?.tableRowAlternateColor || '#F3F4F6'}
                  />
                  
                  {/* Button Color */}
                  <ColorPickerField 
                    label="Цвят на бутони"
                    category="appearance"
                    property="buttonColor"
                    color={settingsState.appearance?.buttonColor || '#3B82F6'}
                  />
                </div>
                
                {/* Font Family */}
                <FormItem>
                  <FormLabel>Шрифт</FormLabel>
                  <Select 
                    onValueChange={(value) => handleSettingChange('appearance', 'fontFamily', value)}
                    defaultValue={settingsState.appearance?.fontFamily || 'Inter, sans-serif'}
                    value={settingsState.appearance?.fontFamily || 'Inter, sans-serif'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                      <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                      <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                      <SelectItem value="'Roboto', sans-serif">Roboto</SelectItem>
                      <SelectItem value="'Open Sans', sans-serif">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                
                {/* Font Size */}
                <FormItem>
                  <FormLabel>Размер на шрифта</FormLabel>
                  <Select 
                    onValueChange={(value) => handleSettingChange('appearance', 'fontSize', value)}
                    defaultValue={settingsState.appearance?.fontSize || 'medium'}
                    value={settingsState.appearance?.fontSize || 'medium'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Малък</SelectItem>
                      <SelectItem value="medium">Среден</SelectItem>
                      <SelectItem value="large">Голям</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                
                <div>
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t.settings.compactMode}
                      </FormLabel>
                      <FormDescription>
                        {t.settings.compactModeDescription}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={settingsState.layout?.compactMode || false}
                        onCheckedChange={(value) => handleSettingChange('layout', 'compactMode', value)}
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="header" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.headerSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showCompanyLogo}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.header?.showCompanyLogo !== false}
                      onCheckedChange={(value) => handleSettingChange('header', 'showCompanyLogo', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showCompanyName}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.header?.showCompanyName !== false}
                      onCheckedChange={(value) => handleSettingChange('header', 'showCompanyName', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showCompanySlogan}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.header?.showCompanySlogan !== false}
                      onCheckedChange={(value) => handleSettingChange('header', 'showCompanySlogan', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showOfferLabel}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.header?.showOfferLabel !== false}
                      onCheckedChange={(value) => handleSettingChange('header', 'showOfferLabel', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {/* Header Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ColorPickerField 
                    label="Цвят на фона на хедъра"
                    category="header"
                    property="headerBackgroundColor"
                    color={settingsState.header?.headerBackgroundColor || '#FFFFFF'}
                  />
                  
                  <ColorPickerField 
                    label="Цвят на текста в хедъра"
                    category="header"
                    property="headerTextColor"
                    color={settingsState.header?.headerTextColor || '#111827'}
                  />
                </div>
                
                {settingsState.templateType === 'modernDark' && (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t.settings.useGradient}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={settingsState.header?.useGradient || false}
                        onCheckedChange={(value) => handleSettingChange('header', 'useGradient', value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="content" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.contentSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showLineNumbers}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.content?.showLineNumbers || false}
                      onCheckedChange={(value) => handleSettingChange('content', 'showLineNumbers', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showProductDescription}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.content?.showProductDescription !== false}
                      onCheckedChange={(value) => handleSettingChange('content', 'showProductDescription', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showPartNumbers}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.content?.showPartNumbers || false}
                      onCheckedChange={(value) => handleSettingChange('content', 'showPartNumbers', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {/* Table Border Style */}
                <FormItem>
                  <FormLabel>Стил на рамките на таблицата</FormLabel>
                  <Select 
                    onValueChange={(value) => handleSettingChange('content', 'tableBorderStyle', value)}
                    defaultValue={settingsState.content?.tableBorderStyle || 'solid'}
                    value={settingsState.content?.tableBorderStyle || 'solid'}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">Без рамки</SelectItem>
                      <SelectItem value="solid">Солидни</SelectItem>
                      <SelectItem value="dashed">Прекъснати</SelectItem>
                      <SelectItem value="dotted">Точкови</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                
                {/* Table Border Width */}
                {settingsState.content?.tableBorderStyle !== 'none' && (
                  <FormItem>
                    <FormLabel>Дебелина на рамките</FormLabel>
                    <div className="flex items-center gap-2">
                      <Slider
                        defaultValue={[parseInt(settingsState.content?.tableBorderWidth || '1')]}
                        min={0}
                        max={5}
                        step={1}
                        onValueChange={(value) => handleSettingChange('content', 'tableBorderWidth', `${value[0]}px`)}
                        className="flex-1"
                      />
                      <span className="w-10 text-center">{parseInt(settingsState.content?.tableBorderWidth || '1')}px</span>
                    </div>
                  </FormItem>
                )}
                
                {/* Table Border Color */}
                {settingsState.content?.tableBorderStyle !== 'none' && (
                  <ColorPickerField 
                    label="Цвят на рамките на таблицата"
                    category="content"
                    property="tableBorderColor"
                    color={settingsState.content?.tableBorderColor || '#E5E7EB'}
                  />
                )}
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.alternateRowColors}
                    </FormLabel>
                    <FormDescription>
                      {t.settings.alternateRowColorsDescription}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.content?.alternateRowColors || false}
                      onCheckedChange={(value) => handleSettingChange('content', 'alternateRowColors', value)}
                    />
                  </FormControl>
                </FormItem>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="footer" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.footerSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showFooter}
                    </FormLabel>
                    <FormDescription>
                      {t.settings.showFooterDescription}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.content?.showFooter !== false}
                      onCheckedChange={(value) => handleSettingChange('content', 'showFooter', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {settingsState.content?.showFooter !== false && (
                  <FormItem>
                    <FormLabel>{t.settings.footerText}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t.settings.footerTextPlaceholder}
                        value={settingsState.content?.footerText || ''}
                        onChange={(e) => handleSettingChange('content', 'footerText', e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      {t.settings.footerTextDescription}
                    </FormDescription>
                  </FormItem>
                )}
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showBankDetails}
                    </FormLabel>
                    <FormDescription>
                      {t.settings.showBankDetailsDescription}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.footer?.showBankDetails || false}
                      onCheckedChange={(value) => handleSettingChange('footer', 'showBankDetails', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showSignatureArea}
                    </FormLabel>
                    <FormDescription>
                      {t.settings.showSignatureAreaDescription}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.footer?.showSignatureArea !== false}
                      onCheckedChange={(value) => handleSettingChange('footer', 'showSignatureArea', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {settingsState.footer?.showSignatureArea !== false && (
                  <FormItem>
                    <FormLabel>{t.settings.signatureText}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t.settings.signatureTextPlaceholder}
                        value={settingsState.footer?.signatureText || ''}
                        onChange={(e) => handleSettingChange('footer', 'signatureText', e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
                
                {/* Footer Colors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ColorPickerField 
                    label="Цвят на фона на футъра"
                    category="footer"
                    property="footerBackgroundColor"
                    color={settingsState.footer?.footerBackgroundColor || '#FFFFFF'}
                  />
                  
                  <ColorPickerField 
                    label="Цвят на текста във футъра"
                    category="footer"
                    property="footerTextColor"
                    color={settingsState.footer?.footerTextColor || '#111827'}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="layout" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.layout}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.fullWidth}
                    </FormLabel>
                    <FormDescription>
                      {t.settings.fullWidthDescription}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.layout?.fullWidth || false}
                      onCheckedChange={(value) => handleSettingChange('layout', 'fullWidth', value)}
                    />
                  </FormControl>
                </FormItem>
                
                <FormItem>
                  <FormLabel>Радиус на ъглите</FormLabel>
                  <div className="flex items-center gap-2">
                    <Slider
                      defaultValue={[parseInt(settingsState.layout?.borderRadius || '8')]}
                      min={0}
                      max={16}
                      step={1}
                      onValueChange={(value) => handleSettingChange('layout', 'borderRadius', `${value[0]}px`)}
                      className="flex-1"
                    />
                    <span className="w-10 text-center">{parseInt(settingsState.layout?.borderRadius || '8')}px</span>
                  </div>
                </FormItem>
                
                <FormItem>
                  <FormLabel>Вътрешно отстояние</FormLabel>
                  <div className="flex items-center gap-2">
                    <Slider
                      defaultValue={[parseInt(settingsState.layout?.padding || '16')]}
                      min={0}
                      max={32}
                      step={2}
                      onValueChange={(value) => handleSettingChange('layout', 'padding', `${value[0]}px`)}
                      className="flex-1"
                    />
                    <span className="w-10 text-center">{parseInt(settingsState.layout?.padding || '16')}px</span>
                  </div>
                </FormItem>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button type="submit">
            <Save className="h-4 w-4 mr-2" />
            {t.settings.saveTemplate}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateSettings;
