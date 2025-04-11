
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Save, Building2, CreditCard } from 'lucide-react';

const bankDetailsSchema = z.object({
  showBankDetails: z.boolean().default(false),
  bankName: z.string().optional(),
  iban: z.string().optional(),
  swift: z.string().optional(),
  additionalInfo: z.string().optional()
});

type BankDetailsValues = z.infer<typeof bankDetailsSchema>;

const CompanyBankSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
      loadSettings();
    }
  }, [user]);
  
  const loadSettings = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();
        
      if (error && error.code !== 'PGRST116') { // Not found error
        throw error;
      }
      
      if (data && data.bank_details) {
        const bankDetails = data.bank_details;
        form.reset({
          showBankDetails: bankDetails.showBankDetails || false,
          bankName: bankDetails.bankName || '',
          iban: bankDetails.iban || '',
          swift: bankDetails.swift || '',
          additionalInfo: bankDetails.additionalInfo || ''
        });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        title: t.common.error,
        description: t.settings.errorLoadingSettings,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onSubmit = async (values: BankDetailsValues) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if settings exist for this user
      const { data: existingSettings, error: checkError } = await supabase
        .from('user_settings')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();
        
      if (checkError) throw checkError;
      
      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('user_settings')
          .update({
            bank_details: values
          })
          .eq('id', existingSettings.id);
          
        if (error) throw error;
      } else {
        // Create new settings
        const { error } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            bank_details: values
          });
          
        if (error) throw error;
      }
      
      toast({
        title: t.common.success,
        description: t.settings.settingsSaved
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: t.common.error,
        description: t.settings.errorSavingSettings,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
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
