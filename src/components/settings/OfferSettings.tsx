
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Save } from 'lucide-react';
import { useUserSettings, OfferSettingsValues } from '@/hooks/use-user-settings';

const offerSettingsSchema = z.object({
  usePrefix: z.boolean().default(false),
  prefix: z.string().optional(),
  suffixYear: z.boolean().default(false),
  defaultVatRate: z.number().min(0).max(100).default(20)
});

const OfferSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { isLoading, loadSettings, saveSettings } = useUserSettings();
  
  const form = useForm<OfferSettingsValues>({
    resolver: zodResolver(offerSettingsSchema),
    defaultValues: {
      usePrefix: false,
      prefix: '',
      suffixYear: false,
      defaultVatRate: 20
    }
  });
  
  useEffect(() => {
    if (user) {
      loadAndSetSettings();
    }
  }, [user]);
  
  const loadAndSetSettings = async () => {
    const settings = await loadSettings<OfferSettingsValues>('offer_settings');
    if (settings) {
      form.reset({
        usePrefix: settings.usePrefix || false,
        prefix: settings.prefix || '',
        suffixYear: settings.suffixYear || false,
        defaultVatRate: settings.defaultVatRate || 20
      });
    }
  };
  
  const onSubmit = async (values: OfferSettingsValues) => {
    await saveSettings('offer_settings', values);
  };

  return (
    <div className="mb-8 pb-8 border-b">
      <h2 className="text-xl font-semibold mb-4">{t.settings.offerSettings}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="usePrefix"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{t.settings.usePrefix}</FormLabel>
                      <FormDescription>
                        {t.settings.usePrefixDescription}
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
              
              {form.watch('usePrefix') && (
                <FormField
                  control={form.control}
                  name="prefix"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.settings.prefix}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="INV-" />
                      </FormControl>
                      <FormDescription>
                        {t.settings.prefixDescription}
                      </FormDescription>
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="suffixYear"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{t.settings.suffixYear}</FormLabel>
                      <FormDescription>
                        {t.settings.suffixYearDescription}
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
                name="defaultVatRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t.settings.defaultVatRate}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        {...field} 
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>
                      {t.settings.defaultVatRateDescription}
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || !form.formState.isDirty}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {isLoading ? t.common.saving : t.common.save}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OfferSettings;
