
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

interface TemplateSettingsProps {
  selectedTemplateId: string;
  onSettingsChange: (settings: any) => void;
  onSave: (name: string, description: string, settings: any) => void;
  initialSettings?: any;
  initialName?: string;
  initialDescription?: string;
}

const defaultSettings = {
  templateType: 'classic',
  appearance: {
    primaryColor: '#3B82F6',
    secondaryColor: '#F3F4F6',
    textColor: '#111827',
    fontFamily: 'Inter, sans-serif',
  },
  header: {
    showCompanyLogo: true,
    showCompanyName: true,
    showCompanySlogan: true,
    showOfferLabel: true,
    useGradient: false,
  },
  content: {
    showLineNumbers: true,
    showProductDescription: true,
    showPartNumbers: true,
    showFooter: true,
    footerText: '',
  },
  footer: {
    showBankDetails: false,
    showSignatureArea: true,
    signatureText: '',
    bankDetails: {
      name: '',
      iban: '',
      swift: '',
    },
    includeSocialMedia: false,
  },
  layout: {
    compactMode: false,
    showLogo: true,
  }
};

const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  selectedTemplateId,
  onSettingsChange,
  onSave,
  initialSettings,
  initialName,
  initialDescription
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('basic');
  const [settingsState, setSettingsState] = useState(initialSettings || defaultSettings);
  
  // Define form schema
  const formSchema = z.object({
    name: z.string().min(1, t.offer.templates.templateNameRequired),
    description: z.string().optional(),
    templateType: z.string(),
    // We'll handle the nested settings separately
  });
  
  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName || '',
      description: initialDescription || '',
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
    form.setValue('name', initialName || '');
    form.setValue('description', initialDescription || '');
    form.setValue('templateType', (initialSettings?.templateType || 'classic') as string);
  }, [initialName, initialDescription, initialSettings]);
  
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
    
    onSave(data.name, data.description || '', completeSettings);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.basicInformation}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.offer.templates.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.offer.templates.namePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t.settings.description}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t.offer.templates.descriptionPlaceholder} 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
          </TabsList>
          
          <TabsContent value="appearance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.settings.appearanceSettings}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t.offer.templates.textColor}</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <div 
                        className="h-10 w-10 rounded border"
                        style={{ backgroundColor: settingsState.appearance?.primaryColor || '#3B82F6' }}
                      ></div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {t.settings.pickColor}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <HexColorPicker 
                            color={settingsState.appearance?.primaryColor || '#3B82F6'}
                            onChange={(color) => handleSettingChange('appearance', 'primaryColor', color)}
                          />
                        </PopoverContent>
                      </Popover>
                      <Input 
                        value={settingsState.appearance?.primaryColor || '#3B82F6'}
                        onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                        className="w-28"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>{t.offer.templates.backgroundColor}</Label>
                    <div className="mt-2 flex items-center gap-2">
                      <div 
                        className="h-10 w-10 rounded border"
                        style={{ backgroundColor: settingsState.appearance?.secondaryColor || '#F3F4F6' }}
                      ></div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            {t.settings.pickColor}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <HexColorPicker 
                            color={settingsState.appearance?.secondaryColor || '#F3F4F6'}
                            onChange={(color) => handleSettingChange('appearance', 'secondaryColor', color)}
                          />
                        </PopoverContent>
                      </Popover>
                      <Input 
                        value={settingsState.appearance?.secondaryColor || '#F3F4F6'}
                        onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
                        className="w-28"
                      />
                    </div>
                  </div>
                </div>
                
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
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showFooter}
                    </FormLabel>
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
                      {t.settings.showBankDetails}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.footer?.showBankDetails || false}
                      onCheckedChange={(value) => handleSettingChange('footer', 'showBankDetails', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {settingsState.footer?.showBankDetails && (
                  <div className="space-y-4 border rounded-lg p-4">
                    <FormItem>
                      <FormLabel>{t.settings.bankName}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t.settings.bankNamePlaceholder}
                          value={settingsState.footer?.bankDetails?.name || ''}
                          onChange={(e) => handleNestedSettingChange('footer', 'bankDetails', 'name', e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>IBAN</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="IBAN"
                          value={settingsState.footer?.bankDetails?.iban || ''}
                          onChange={(e) => handleNestedSettingChange('footer', 'bankDetails', 'iban', e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem>
                      <FormLabel>SWIFT/BIC</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="SWIFT/BIC"
                          value={settingsState.footer?.bankDetails?.swift || ''}
                          onChange={(e) => handleNestedSettingChange('footer', 'bankDetails', 'swift', e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                )}
                
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {t.settings.showSignatureArea}
                    </FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={settingsState.footer?.showSignatureArea || false}
                      onCheckedChange={(value) => handleSettingChange('footer', 'showSignatureArea', value)}
                    />
                  </FormControl>
                </FormItem>
                
                {settingsState.footer?.showSignatureArea && (
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
                
                {settingsState.templateType === 'modernDark' && (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        {t.settings.includeSocialMedia}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={settingsState.footer?.includeSocialMedia || false}
                        onCheckedChange={(value) => handleSettingChange('footer', 'includeSocialMedia', value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-6">
          <Button type="submit">{t.common.save}</Button>
        </div>
      </form>
    </Form>
  );
};

export default TemplateSettings;
