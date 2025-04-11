
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { OfferSettingsValues } from '@/hooks/use-user-settings';

interface PrefixSettingsProps {
  form: UseFormReturn<OfferSettingsValues>;
}

const PrefixSettings: React.FC<PrefixSettingsProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default PrefixSettings;
