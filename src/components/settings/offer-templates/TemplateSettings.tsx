
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useTemplateManagement } from '@/hooks/use-template-management';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Eye, Save, CheckCircle2 } from 'lucide-react';

// Color presets
const colorPresets = [
  {
    name: 'Corporate Blue',
    primary: '#1E88E5',
    secondary: '#f8f9fa',
    text: '#ffffff'
  },
  {
    name: 'Emerald Green',
    primary: '#4CAF50',
    secondary: '#f2fce2',
    text: '#ffffff'
  },
  {
    name: 'Royal Purple',
    primary: '#7E69AB',
    secondary: '#f1f0fb',
    text: '#ffffff'
  },
  {
    name: 'Ruby Red',
    primary: '#E53935',
    secondary: '#fff5f5',
    text: '#ffffff'
  },
  {
    name: 'Sunset Orange',
    primary: '#F57C00',
    secondary: '#fff8e1',
    text: '#ffffff'
  },
  {
    name: 'Modern Teal',
    primary: '#009688',
    secondary: '#e0f2f1',
    text: '#ffffff'
  },
  {
    name: 'Vibrant Pink',
    primary: '#EC4899',
    secondary: '#fdf2f8',
    text: '#ffffff'
  },
  {
    name: 'Deep Indigo',
    primary: '#6366F1',
    secondary: '#eef2ff',
    text: '#ffffff'
  },
  {
    name: 'Sunny Yellow',
    primary: '#FFC107',
    secondary: '#fffbeb',
    text: '#333333'
  },
  {
    name: 'Dark Cyan',
    primary: '#0891B2',
    secondary: '#ecfeff',
    text: '#ffffff'
  }
];

// Available template designs
const templateDesigns = [
  { id: 'classic', name: 'Classic' },
  { id: 'modern-dark', name: 'Modern Dark' },
  { id: 'gradient', name: 'Gradient' },
  { id: 'business-pro', name: 'Business Pro' }
];

// Form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Template name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  language: z.string(),
  designTemplate: z.string(),
  appearance: z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    textColor: z.string(),
    fontFamily: z.string(),
    fontSize: z.string(),
    roundedCorners: z.boolean().optional(),
  }),
  layout: z.object({
    showLogo: z.boolean().optional(),
    logoPosition: z.string(),
    compactMode: z.boolean().optional(),
    borderless: z.boolean().optional(),
  }),
  header: z.object({
    showCompanySlogan: z.boolean().optional(),
    companyNameSize: z.string(),
    showOfferLabel: z.boolean().optional(),
    useGradient: z.boolean().optional(),
    shadow: z.boolean().optional(),
  }),
  content: z.object({
    boldPrices: z.boolean().optional(),
    showFooter: z.boolean().optional(),
    footerText: z.string().optional(),
    showLineNumbers: z.boolean().optional(),
    alternateRowColors: z.boolean().optional(),
    highlightTotals: z.boolean().optional(),
  }),
  footer: z.object({
    showBankDetails: z.boolean().optional(),
    showSignatureArea: z.boolean().optional(),
    signatureText: z.string().optional(),
    includeSocialMedia: z.boolean().optional(),
    useQRCode: z.boolean().optional(),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface TemplateSettingsProps {
  selectedTemplateId?: string;
}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({ selectedTemplateId }) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('design');
  const [showPreview, setShowPreview] = useState(false);
  
  const {
    getTemplateById,
    updateTemplate,
    isLoading,
    createTemplate
  } = useTemplateManagement();
  
  const template = selectedTemplateId ? getTemplateById(selectedTemplateId) : null;
  
  // Default form values
  const defaultValues: FormValues = {
    name: '',
    description: '',
    language: 'all',
    designTemplate: 'classic',
    appearance: {
      primaryColor: '#1E88E5',
      secondaryColor: '#f8f9fa',
      textColor: '#ffffff',
      fontFamily: 'Inter, sans-serif',
      fontSize: 'medium',
      roundedCorners: true,
    },
    layout: {
      showLogo: true,
      logoPosition: 'left',
      compactMode: false,
      borderless: false,
    },
    header: {
      showCompanySlogan: true,
      companyNameSize: 'large',
      showOfferLabel: true,
      useGradient: false,
      shadow: false,
    },
    content: {
      boldPrices: true,
      showFooter: true,
      footerText: '',
      showLineNumbers: false,
      alternateRowColors: false,
      highlightTotals: false,
    },
    footer: {
      showBankDetails: true,
      showSignatureArea: true,
      signatureText: '',
      includeSocialMedia: false,
      useQRCode: false,
    },
  };
  
  // Create form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: template?.settings 
      ? {
          name: template.name,
          description: template.description || '',
          language: template.language || 'all',
          designTemplate: template.settings.designTemplate || 'classic',
          appearance: {
            primaryColor: template.settings.appearance?.primaryColor || defaultValues.appearance.primaryColor,
            secondaryColor: template.settings.appearance?.secondaryColor || defaultValues.appearance.secondaryColor,
            textColor: template.settings.appearance?.textColor || defaultValues.appearance.textColor,
            fontFamily: template.settings.appearance?.fontFamily || defaultValues.appearance.fontFamily,
            fontSize: template.settings.appearance?.fontSize || defaultValues.appearance.fontSize,
            roundedCorners: template.settings.appearance?.roundedCorners || defaultValues.appearance.roundedCorners,
          },
          layout: {
            showLogo: template.settings.layout?.showLogo ?? defaultValues.layout.showLogo,
            logoPosition: template.settings.layout?.logoPosition || defaultValues.layout.logoPosition,
            compactMode: template.settings.layout?.compactMode || defaultValues.layout.compactMode,
            borderless: template.settings.layout?.borderless || defaultValues.layout.borderless,
          },
          header: {
            showCompanySlogan: template.settings.header?.showCompanySlogan ?? defaultValues.header.showCompanySlogan,
            companyNameSize: template.settings.header?.companyNameSize || defaultValues.header.companyNameSize,
            showOfferLabel: template.settings.header?.showOfferLabel ?? defaultValues.header.showOfferLabel,
            useGradient: template.settings.header?.useGradient || defaultValues.header.useGradient,
            shadow: template.settings.header?.shadow || defaultValues.header.shadow,
          },
          content: {
            boldPrices: template.settings.content?.boldPrices ?? defaultValues.content.boldPrices,
            showFooter: template.settings.content?.showFooter ?? defaultValues.content.showFooter,
            footerText: template.settings.content?.footerText || defaultValues.content.footerText,
            showLineNumbers: template.settings.content?.showLineNumbers || defaultValues.content.showLineNumbers,
            alternateRowColors: template.settings.content?.alternateRowColors || defaultValues.content.alternateRowColors,
            highlightTotals: template.settings.content?.highlightTotals || defaultValues.content.highlightTotals,
          },
          footer: {
            showBankDetails: template.settings.footer?.showBankDetails ?? defaultValues.footer.showBankDetails,
            showSignatureArea: template.settings.footer?.showSignatureArea ?? defaultValues.footer.showSignatureArea,
            signatureText: template.settings.footer?.signatureText || defaultValues.footer.signatureText,
            includeSocialMedia: template.settings.footer?.includeSocialMedia || defaultValues.footer.includeSocialMedia,
            useQRCode: template.settings.footer?.useQRCode || defaultValues.footer.useQRCode,
          },
        }
      : defaultValues,
  });
  
  // Apply a color preset
  const applyColorPreset = (preset: { primary: string, secondary: string, text: string }) => {
    form.setValue('appearance.primaryColor', preset.primary);
    form.setValue('appearance.secondaryColor', preset.secondary);
    form.setValue('appearance.textColor', preset.text);
    
    // Make sure to trigger form validation
    form.trigger('appearance.primaryColor');
    form.trigger('appearance.secondaryColor');
    form.trigger('appearance.textColor');
  };
  
  // Apply the template design
  const applyTemplateDesign = (designId: string) => {
    form.setValue('designTemplate', designId);
    form.trigger('designTemplate');
    
    // Update applicable settings based on template design
    if (designId === 'modern-dark') {
      form.setValue('header.useGradient', true);
      form.setValue('layout.borderless', true);
      form.setValue('appearance.primaryColor', '#6366F1');
      form.setValue('appearance.secondaryColor', '#1F2937');
      form.setValue('appearance.textColor', '#F9FAFB');
    } else if (designId === 'gradient') {
      form.setValue('header.useGradient', true);
      form.setValue('layout.floatingHeader', true);
      form.setValue('appearance.primaryColor', '#EC4899');
      form.setValue('appearance.secondaryColor', '#F9FAFB');
      form.setValue('content.highlightTotals', true);
    } else if (designId === 'business-pro') {
      form.setValue('header.shadow', true);
      form.setValue('appearance.primaryColor', '#0891B2');
      form.setValue('appearance.secondaryColor', '#F0F9FF');
      form.setValue('content.alternateRowColors', true);
      form.setValue('content.showLineNumbers', true);
    } else {
      // Classic
      form.setValue('header.useGradient', false);
      form.setValue('layout.borderless', false);
      form.setValue('header.shadow', false);
    }
  };
  
  // Update form when template changes
  useEffect(() => {
    if (template?.settings) {
      form.reset({
        name: template.name,
        description: template.description || '',
        language: template.language || 'all',
        designTemplate: template.settings.designTemplate || 'classic',
        appearance: {
          primaryColor: template.settings.appearance?.primaryColor || defaultValues.appearance.primaryColor,
          secondaryColor: template.settings.appearance?.secondaryColor || defaultValues.appearance.secondaryColor,
          textColor: template.settings.appearance?.textColor || defaultValues.appearance.textColor,
          fontFamily: template.settings.appearance?.fontFamily || defaultValues.appearance.fontFamily,
          fontSize: template.settings.appearance?.fontSize || defaultValues.appearance.fontSize,
          roundedCorners: template.settings.appearance?.roundedCorners || defaultValues.appearance.roundedCorners,
        },
        layout: {
          showLogo: template.settings.layout?.showLogo ?? defaultValues.layout.showLogo,
          logoPosition: template.settings.layout?.logoPosition || defaultValues.layout.logoPosition,
          compactMode: template.settings.layout?.compactMode || defaultValues.layout.compactMode,
          borderless: template.settings.layout?.borderless || defaultValues.layout.borderless,
        },
        header: {
          showCompanySlogan: template.settings.header?.showCompanySlogan ?? defaultValues.header.showCompanySlogan,
          companyNameSize: template.settings.header?.companyNameSize || defaultValues.header.companyNameSize,
          showOfferLabel: template.settings.header?.showOfferLabel ?? defaultValues.header.showOfferLabel,
          useGradient: template.settings.header?.useGradient || defaultValues.header.useGradient,
          shadow: template.settings.header?.shadow || defaultValues.header.shadow,
        },
        content: {
          boldPrices: template.settings.content?.boldPrices ?? defaultValues.content.boldPrices,
          showFooter: template.settings.content?.showFooter ?? defaultValues.content.showFooter,
          footerText: template.settings.content?.footerText || defaultValues.content.footerText,
          showLineNumbers: template.settings.content?.showLineNumbers || defaultValues.content.showLineNumbers,
          alternateRowColors: template.settings.content?.alternateRowColors || defaultValues.content.alternateRowColors,
          highlightTotals: template.settings.content?.highlightTotals || defaultValues.content.highlightTotals,
        },
        footer: {
          showBankDetails: template.settings.footer?.showBankDetails ?? defaultValues.footer.showBankDetails,
          showSignatureArea: template.settings.footer?.showSignatureArea ?? defaultValues.footer.showSignatureArea,
          signatureText: template.settings.footer?.signatureText || defaultValues.footer.signatureText,
          includeSocialMedia: template.settings.footer?.includeSocialMedia || defaultValues.footer.includeSocialMedia,
          useQRCode: template.settings.footer?.useQRCode || defaultValues.footer.useQRCode,
        },
      });
    } else {
      form.reset(defaultValues);
    }
  }, [template, form]);
  
  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      if (selectedTemplateId) {
        await updateTemplate(selectedTemplateId, {
          name: data.name,
          description: data.description || '',
          language: data.language,
          settings: {
            designTemplate: data.designTemplate,
            appearance: data.appearance,
            layout: data.layout,
            header: data.header,
            content: data.content,
            footer: data.footer,
          },
        });
        toast({
          title: t.common.success,
          description: t.offer.templates.settingsSaved,
        });
      } else {
        const newTemplateId = await createTemplate(data.name, data.description || '', {
          language: data.language,
          settings: {
            designTemplate: data.designTemplate,
            appearance: data.appearance,
            layout: data.layout,
            header: data.header,
            content: data.content,
            footer: data.footer,
          },
        });
        toast({
          title: t.common.success,
          description: t.offer.templates.templateCreated,
        });
      }
    } catch (error) {
      console.error('Failed to update template settings:', error);
      toast({
        title: t.common.error,
        description: t.offer.templates.failedToSaveSettings,
        variant: 'destructive',
      });
    }
  };
  
  // Watch form values
  const watchPrimaryColor = form.watch('appearance.primaryColor');
  const watchSecondaryColor = form.watch('appearance.secondaryColor');
  const watchDesignTemplate = form.watch('designTemplate');
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Template Details Section */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedTemplateId ? t.offer.templates.editTemplate : t.offer.templates.createTemplate}</CardTitle>
              <CardDescription>{t.offer.templates.settingsDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.common.name}</FormLabel>
                    <FormControl>
                      <Input placeholder={t.offer.templates.templateNamePlaceholder} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.common.description}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t.offer.templates.templateDescriptionPlaceholder} 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.common.language}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t.common.select} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Languages</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="bg">Български</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Template Design and Settings */}
          <Card>
            <CardHeader>
              <CardTitle>{t.offer.templates.designAndSettings}</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="design">{t.offer.templates.design}</TabsTrigger>
                  <TabsTrigger value="appearance">{t.offer.templates.appearance}</TabsTrigger>
                  <TabsTrigger value="layout">{t.offer.templates.layout}</TabsTrigger>
                  <TabsTrigger value="content">{t.offer.templates.content}</TabsTrigger>
                </TabsList>
                
                {/* Design Tab */}
                <TabsContent value="design" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">{t.offer.templates.templateDesign}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {templateDesigns.map((design) => (
                        <div
                          key={design.id}
                          className={`p-4 border cursor-pointer rounded-md transition-all ${
                            watchDesignTemplate === design.id ? 'border-primary bg-primary/10' : 'hover:border-primary'
                          }`}
                          onClick={() => applyTemplateDesign(design.id)}
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{design.name}</h4>
                            {watchDesignTemplate === design.id && (
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                {/* Appearance Tab */}
                <TabsContent value="appearance" className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">{t.common.colorPresets}</h3>
                      <FormField
                        control={form.control}
                        name="designTemplate"
                        render={({ field }) => (
                          <input type="hidden" {...field} />
                        )}
                      />
                    </div>
                    
                    <ScrollArea className="h-60 border rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {colorPresets.map((preset, index) => (
                          <div
                            key={index}
                            className="p-3 border rounded-md hover:border-primary cursor-pointer transition-all"
                            onClick={() => applyColorPreset(preset)}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-6 h-6 rounded-full" 
                                style={{ backgroundColor: preset.primary }}
                              ></div>
                              <span className="font-medium">{preset.name}</span>
                            </div>
                            <div className="flex gap-2">
                              <div 
                                className="flex-1 h-5 rounded" 
                                style={{ backgroundColor: preset.primary }}
                              ></div>
                              <div 
                                className="flex-1 h-5 rounded" 
                                style={{ backgroundColor: preset.secondary }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">{t.common.customColors}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="appearance.primaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.primaryColor}</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-8 h-8 p-0 border-2"
                                      style={{ backgroundColor: field.value }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-3">
                                    <HexColorPicker color={field.value} onChange={field.onChange} />
                                  </PopoverContent>
                                </Popover>
                                <Input {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.secondaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.secondaryColor}</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-8 h-8 p-0 border-2"
                                      style={{ backgroundColor: field.value }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-3">
                                    <HexColorPicker color={field.value} onChange={field.onChange} />
                                  </PopoverContent>
                                </Popover>
                                <Input {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.textColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.textColor}</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-2">
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      className="w-8 h-8 p-0 border-2"
                                      style={{ backgroundColor: field.value }}
                                    />
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-3">
                                    <HexColorPicker color={field.value} onChange={field.onChange} />
                                  </PopoverContent>
                                </Popover>
                                <Input {...field} />
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <FormField
                        control={form.control}
                        name="appearance.fontFamily"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.fontFamily}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.common.select} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Inter, sans-serif">Inter</SelectItem>
                                <SelectItem value="Poppins, sans-serif">Poppins</SelectItem>
                                <SelectItem value="Montserrat, sans-serif">Montserrat</SelectItem>
                                <SelectItem value="DM Sans, sans-serif">DM Sans</SelectItem>
                                <SelectItem value="Roboto, sans-serif">Roboto</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.fontSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.fontSize}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.common.select} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name="appearance.roundedCorners"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.roundedCorners}</FormLabel>
                              <FormDescription>
                                {t.offer.templates.roundedCornersDesc}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Layout Tab */}
                <TabsContent value="layout" className="space-y-4">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="layout.showLogo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.showLogo}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.logoPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.offer.templates.logoPosition}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={t.common.select} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.compactMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.compactMode}</FormLabel>
                            <FormDescription>
                              {t.offer.templates.compactModeDesc}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="layout.borderless"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.borderless}</FormLabel>
                            <FormDescription>
                              {t.offer.templates.borderlessDesc}
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                {/* Content Tab */}
                <TabsContent value="content" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t.offer.templates.header}</h3>
                      
                      <FormField
                        control={form.control}
                        name="header.showCompanySlogan"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.showCompanySlogan}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="header.companyNameSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.companyNameSize}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.common.select} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="small">Small</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="large">Large</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="header.showOfferLabel"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.showOfferLabel}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="header.useGradient"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.useGradient}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="header.shadow"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.useShadow}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">{t.offer.templates.content}</h3>
                      
                      <FormField
                        control={form.control}
                        name="content.boldPrices"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.boldPrices}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content.showLineNumbers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.showLineNumbers}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content.alternateRowColors"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.alternateRowColors}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content.highlightTotals"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.highlightTotals}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="content.showFooter"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between">
                            <div className="space-y-0.5">
                              <FormLabel>{t.offer.templates.showFooter}</FormLabel>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch('content.showFooter') && (
                        <FormField
                          control={form.control}
                          name="content.footerText"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.offer.templates.footerText}</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t.offer.templates.footerTextPlaceholder} 
                                  {...field} 
                                  value={field.value || ''}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">{t.offer.templates.footer}</h3>
                    
                    <FormField
                      control={form.control}
                      name="footer.showBankDetails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.showBankDetails}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="footer.showSignatureArea"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.showSignatureArea}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    {form.watch('footer.showSignatureArea') && (
                      <FormField
                        control={form.control}
                        name="footer.signatureText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.offer.templates.signatureText}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={t.offer.templates.signatureTextPlaceholder} 
                                {...field} 
                                value={field.value || ''}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="footer.includeSocialMedia"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.includeSocialMedia}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="footer.useQRCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>{t.offer.templates.useQRCode}</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button type="button" variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              {t.common.preview}
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? t.common.saving : t.common.save}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TemplateSettings;
