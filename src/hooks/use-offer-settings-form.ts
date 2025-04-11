
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { OfferSettingsValues } from "@/hooks/use-user-settings";
import { useLanguage } from "@/context/LanguageContext";

// Schema for offer settings validation
export const offerSettingsSchema = z.object({
  usePrefix: z.boolean().default(false),
  prefix: z.string().optional(),
  suffixYear: z.boolean().default(false),
  defaultVatRate: z.number().min(0).max(100).default(20)
});

export const useOfferSettingsForm = (
  initialData: OfferSettingsValues | null, 
  onLoadData: () => Promise<OfferSettingsValues | null>
) => {
  const { t } = useLanguage();
  
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
    if (initialData) {
      form.reset({
        usePrefix: initialData.usePrefix || false,
        prefix: initialData.prefix || '',
        suffixYear: initialData.suffixYear || false,
        defaultVatRate: initialData.defaultVatRate || 20
      });
    } else {
      onLoadData().then(settings => {
        if (settings) {
          form.reset({
            usePrefix: settings.usePrefix || false,
            prefix: settings.prefix || '',
            suffixYear: settings.suffixYear || false,
            defaultVatRate: settings.defaultVatRate || 20
          });
        }
      });
    }
  }, [initialData, onLoadData]);
  
  return form;
};
