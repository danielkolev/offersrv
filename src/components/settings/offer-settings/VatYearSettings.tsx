
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

interface VatYearSettingsProps {
  form: UseFormReturn<OfferSettingsValues>;
}

const VatYearSettings: React.FC<VatYearSettingsProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
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
  );
};

export default VatYearSettings;
