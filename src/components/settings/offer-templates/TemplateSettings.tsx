
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/context/LanguageContext';
import { useOffer } from '@/context/offer/OfferContext';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import TemplatePreview from './TemplatePreview';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Palette, Type, LayoutGrid, FileText, Brush, Cog, Check } from 'lucide-react';

// Define the schema for template settings
const templateSettingsSchema = z.object({
  // Appearance settings
  appearance: z.object({
    primaryColor: z.string().default('#0891B2'),
    secondaryColor: z.string().default('#F0F9FF'),
    textColor: z.string().default('#FFFFFF'),
    fontFamily: z.string().default('Inter'),
    fontSize: z.string().default('medium'),
    roundedCorners: z.boolean().default(true),
  }),
  
  // Layout settings
  layout: z.object({
    showLogo: z.boolean().default(true),
    logoPosition: z.string().default('left'),
    compactMode: z.boolean().default(false),
    fullWidth: z.boolean().default(false),
    borderless: z.boolean().default(false),
  }),
  
  // Content settings
  content: z.object({
    boldPrices: z.boolean().default(true),
    alternateRowColors: z.boolean().default(false),
    showLineNumbers: z.boolean().default(false),
    showFooter: z.boolean().default(true),
    footerText: z.string().default(''),
  }),
  
  // Header settings
  header: z.object({
    showCompanySlogan: z.boolean().default(true),
    companyNameSize: z.string().default('medium'),
    showOfferLabel: z.boolean().default(true),
    shadow: z.boolean().default(false),
  }),
  
  // Footer settings
  footer: z.object({
    showBankDetails: z.boolean().default(false),
    showSignatureArea: z.boolean().default(true),
    signatureText: z.string().default(''),
    useQRCode: z.boolean().default(false),
  }),
  
  // Template metadata
  template: z.object({
    name: z.string().min(1, 'Template name is required'),
    description: z.string().optional(),
    language: z.string().default('bg'),
  }),
  
  // Design template selection
  designTemplate: z.string().default('classic'),
});

export type TemplateSettingsFormValues = z.infer<typeof templateSettingsSchema>;

export interface TemplateSettingsProps {
  initialSettings?: any;
  onSave?: (settings: any) => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const TemplateSettings: React.FC<TemplateSettingsProps> = ({
  initialSettings,
  onSave,
  onCancel,
  isEditing = false,
}) => {
  const { t, language } = useLanguage();
  const { offer } = useOffer();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('appearance');
  
  // Default values for the form
  const defaultValues: TemplateSettingsFormValues = {
    appearance: {
      primaryColor: '#0891B2',
      secondaryColor: '#F0F9FF',
      textColor: '#FFFFFF',
      fontFamily: 'Inter',
      fontSize: 'medium',
      roundedCorners: true,
    },
    layout: {
      showLogo: true,
      logoPosition: 'left',
      compactMode: false,
      fullWidth: false,
      borderless: false,
    },
    content: {
      boldPrices: true,
      alternateRowColors: false,
      showLineNumbers: false,
      showFooter: true,
      footerText: language === 'bg' 
        ? 'Благодарим Ви за доверието!' 
        : 'Thank you for your business!',
    },
    header: {
      showCompanySlogan: true,
      companyNameSize: 'medium',
      showOfferLabel: true,
      shadow: false,
    },
    footer: {
      showBankDetails: false,
      showSignatureArea: true,
      signatureText: language === 'bg' 
        ? 'Подпис и печат:' 
        : 'Signature and stamp:',
      useQRCode: false,
    },
    template: {
      name: '',
      description: '',
      language: language,
    },
    designTemplate: 'classic',
  };
  
  // Create form with react-hook-form
  const form = useForm<TemplateSettingsFormValues>({
    resolver: zodResolver(templateSettingsSchema),
    defaultValues: initialSettings || defaultValues,
  });
  
  // Watch form values for preview
  const formValues = form.watch();
  
  // Handle form submission
  const onSubmit = (data: TemplateSettingsFormValues) => {
    if (onSave) {
      onSave(data);
    } else {
      toast({
        title: t.common.success,
        description: t.settings.templateSaved,
      });
    }
  };
  
  // Font family options
  const fontFamilies = [
    { value: 'Inter', label: 'Inter (Default)' },
    { value: 'DM Sans', label: 'DM Sans' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
  ];
  
  // Font size options
  const fontSizes = [
    { value: 'small', label: t.settings.small },
    { value: 'medium', label: t.settings.medium },
    { value: 'large', label: t.settings.large },
  ];
  
  // Logo position options
  const logoPositions = [
    { value: 'left', label: t.settings.left },
    { value: 'center', label: t.settings.center },
    { value: 'right', label: t.settings.right },
  ];
  
  // Company name size options
  const companyNameSizes = [
    { value: 'small', label: t.settings.small },
    { value: 'medium', label: t.settings.medium },
    { value: 'large', label: t.settings.large },
  ];
  
  // Design template options
  const designTemplates = [
    { value: 'classic', label: t.settings.templates.classic },
    { value: 'modern-dark', label: t.settings.templates.modernDark },
    { value: 'gradient', label: t.settings.templates.gradient },
    { value: 'business-pro', label: t.settings.templates.businessPro },
  ];
  
  // Color picker component
  const ColorPicker = ({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-start text-left font-normal h-10"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex items-center gap-2">
              <div 
                className="h-5 w-5 rounded-md border" 
                style={{ backgroundColor: value }}
              />
              <span>{label}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" align="start">
          <div className="flex flex-col gap-3">
            <HexColorPicker color={value} onChange={onChange} />
            <Input 
              value={value} 
              onChange={(e) => onChange(e.target.value)}
              className="mt-2"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column - Settings */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4 grid grid-cols-5">
                    <TabsTrigger value="appearance" className="flex items-center gap-1">
                      <Palette className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.settings.appearance}</span>
                    </TabsTrigger>
                    <TabsTrigger value="layout" className="flex items-center gap-1">
                      <LayoutGrid className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.settings.layout}</span>
                    </TabsTrigger>
                    <TabsTrigger value="content" className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.settings.content}</span>
                    </TabsTrigger>
                    <TabsTrigger value="template" className="flex items-center gap-1">
                      <Brush className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.settings.template}</span>
                    </TabsTrigger>
                    <TabsTrigger value="details" className="flex items-center gap-1">
                      <Cog className="h-4 w-4" />
                      <span className="hidden sm:inline">{t.settings.details}</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Appearance Tab */}
                  <TabsContent value="appearance" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="designTemplate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.templates.selectDesign}</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                {designTemplates.map((template) => (
                                  <div key={template.value}>
                                    <RadioGroupItem
                                      value={template.value}
                                      id={template.value}
                                      className="peer sr-only"
                                    />
                                    <Label
                                      htmlFor={template.value}
                                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                    >
                                      <div className="mb-2 rounded-md bg-primary/10 p-1 text-primary">
                                        <Check className={cn(
                                          "h-4 w-4 text-primary",
                                          field.value === template.value ? "opacity-100" : "opacity-0"
                                        )} />
                                      </div>
                                      {template.label}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator />
                      
                      <FormField
                        control={form.control}
                        name="appearance.primaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.primaryColor}</FormLabel>
                            <FormControl>
                              <ColorPicker
                                value={field.value}
                                onChange={field.onChange}
                                label={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.secondaryColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.secondaryColor}</FormLabel>
                            <FormControl>
                              <ColorPicker
                                value={field.value}
                                onChange={field.onChange}
                                label={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.textColor"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.textColor}</FormLabel>
                            <FormControl>
                              <ColorPicker
                                value={field.value}
                                onChange={field.onChange}
                                label={field.value}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.fontFamily"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.fontFamily}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.settings.selectFont} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fontFamilies.map((font) => (
                                  <SelectItem key={font.value} value={font.value}>
                                    {font.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.fontSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.fontSize}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.settings.selectFontSize} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fontSizes.map((size) => (
                                  <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="appearance.roundedCorners"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.roundedCorners}</FormLabel>
                              <FormDescription>
                                {t.settings.roundedCornersDescription}
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
                  
                  {/* Layout Tab */}
                  <TabsContent value="layout" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="layout.showLogo"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.showLogo}</FormLabel>
                              <FormDescription>
                                {t.settings.showLogoDescription}
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
                      
                      {form.watch('layout.showLogo') && (
                        <FormField
                          control={form.control}
                          name="layout.logoPosition"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.settings.logoPosition}</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder={t.settings.selectLogoPosition} />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {logoPositions.map((position) => (
                                    <SelectItem key={position.value} value={position.value}>
                                      {position.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="layout.compactMode"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.compactMode}</FormLabel>
                              <FormDescription>
                                {t.settings.compactModeDescription}
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
                        name="layout.fullWidth"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.fullWidth}</FormLabel>
                              <FormDescription>
                                {t.settings.fullWidthDescription}
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
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.borderless}</FormLabel>
                              <FormDescription>
                                {t.settings.borderlessDescription}
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
                        name="header.shadow"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.useShadows}</FormLabel>
                              <FormDescription>
                                {t.settings.useShadowsDescription}
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
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="content.boldPrices"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.boldPrices}</FormLabel>
                              <FormDescription>
                                {t.settings.boldPricesDescription}
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
                        name="content.alternateRowColors"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.alternateRowColors}</FormLabel>
                              <FormDescription>
                                {t.settings.alternateRowColorsDescription}
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
                        name="content.showLineNumbers"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.showLineNumbers}</FormLabel>
                              <FormDescription>
                                {t.settings.showLineNumbersDescription}
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
                        name="content.showFooter"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.showFooter}</FormLabel>
                              <FormDescription>
                                {t.settings.showFooterDescription}
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
                      
                      {form.watch('content.showFooter') && (
                        <FormField
                          control={form.control}
                          name="content.footerText"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t.settings.footerText}</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={language === 'bg' 
                                    ? 'Благодарим Ви за доверието!' 
                                    : 'Thank you for your business!'}
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {form.watch('content.showFooter') && (
                        <>
                          <FormField
                            control={form.control}
                            name="footer.showBankDetails"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>{t.settings.showBankDetails}</FormLabel>
                                  <FormDescription>
                                    {t.settings.showBankDetailsDescription}
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
                            name="footer.showSignatureArea"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>{t.settings.showSignatureArea}</FormLabel>
                                  <FormDescription>
                                    {t.settings.showSignatureAreaDescription}
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
                          
                          {form.watch('footer.showSignatureArea') && (
                            <FormField
                              control={form.control}
                              name="footer.signatureText"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>{t.settings.signatureText}</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder={language === 'bg' 
                                        ? 'Подпис и печат:' 
                                        : 'Signature and stamp:'}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                          
                          <FormField
                            control={form.control}
                            name="footer.useQRCode"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                  <FormLabel>{t.settings.useQRCode}</FormLabel>
                                  <FormDescription>
                                    {t.settings.useQRCodeDescription}
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
                        </>
                      )}
                    </div>
                  </TabsContent>
                  
                  {/* Template Tab */}
                  <TabsContent value="template" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="header.showCompanySlogan"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.showCompanySlogan}</FormLabel>
                              <FormDescription>
                                {t.settings.showCompanySloganDescription}
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
                        name="header.companyNameSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.companyNameSize}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.settings.selectSize} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {companyNameSizes.map((size) => (
                                  <SelectItem key={size.value} value={size.value}>
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="header.showOfferLabel"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                              <FormLabel>{t.settings.showOfferLabel}</FormLabel>
                              <FormDescription>
                                {t.settings.showOfferLabelDescription}
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
                  
                  {/* Details Tab */}
                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={form.control}
                        name="template.name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.templateName}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t.settings.templateNamePlaceholder}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="template.description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.templateDescription}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t.settings.templateDescriptionPlaceholder}
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="template.language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t.settings.templateLanguage}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t.settings.selectLanguage} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="bg">Български</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="flex justify-between">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  {t.common.cancel}
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {isEditing ? t.settings.updateTemplate : t.settings.saveTemplate}
              </Button>
            </div>
          </div>
          
          {/* Right column - Preview */}
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">{t.settings.preview}</h3>
                <TemplatePreview settings={formValues as any} />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default TemplateSettings;
