
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
import { Save, Building2, CreditCard } from 'lucide-react';
import { useUserSettings, BankDetailsValues } from '@/hooks/use-user-settings';

const bankDetailsSchema = z.object({
  showBankDetails: z.boolean().default(false),
  bankName: z.string().optional(),
  iban: z.string().optional(),
  swift: z.string().optional(),
  additionalInfo: z.string().optional()
});

const CompanyBankSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { isLoading, loadSettings, saveSettings } = useUserSettings();
  
  const form = useForm<BankDetailsValues>({
    resolver: zodResolver(bankDetailsSchema),
    defaultValues: {
      showBankDetails: false,
      bankName: '',
      iban: '',
      swift: '',
      additionalInfo: ''
    }
  });
  
  useEffect(() => {
    if (user) {
      loadAndSetSettings();
    }
  }, [user]);
  
  const loadAndSetSettings = async () => {
    const settings = await loadSettings<BankDetailsValues>('bank_details');
    if (settings) {
      form.reset({
        showBankDetails: settings.showBankDetails || false,
        bankName: settings.bankName || '',
        iban: settings.iban || '',
        swift: settings.swift || '',
        additionalInfo: settings.additionalInfo || ''
      });
    }
  };
  
  const onSubmit = async (values: BankDetailsValues) => {
    await saveSettings('bank_details', values);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t.settings.bankDetails}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="showBankDetails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">{t.settings.showBankDetails}</FormLabel>
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
          
          {form.watch('showBankDetails') && (
            <div className="space-y-4 p-4 rounded-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bankName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.settings.bankName}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input {...field} className="pl-10" placeholder={t.settings.bankNamePlaceholder} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.settings.iban}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input {...field} className="pl-10" placeholder={t.settings.ibanPlaceholder} />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="swift"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.settings.swift}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t.settings.swiftPlaceholder} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.settings.additionalInfo}</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={t.settings.additionalInfoPlaceholder} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          
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

export default CompanyBankSettings;
