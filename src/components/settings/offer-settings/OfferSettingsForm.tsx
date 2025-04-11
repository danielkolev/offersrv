
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Save } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { OfferSettingsValues } from '@/hooks/use-user-settings';
import PrefixSettings from './PrefixSettings';
import VatYearSettings from './VatYearSettings';

interface OfferSettingsFormProps {
  form: UseFormReturn<OfferSettingsValues>;
  onSubmit: (values: OfferSettingsValues) => Promise<void>;
  isLoading: boolean;
}

const OfferSettingsForm: React.FC<OfferSettingsFormProps> = ({ 
  form, 
  onSubmit, 
  isLoading 
}) => {
  const { t } = useLanguage();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PrefixSettings form={form} />
          <VatYearSettings form={form} />
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
  );
};

export default OfferSettingsForm;
