
import React, { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useUserSettings, OfferSettingsValues } from '@/hooks/use-user-settings';
import { useOfferSettingsForm } from '@/hooks/use-offer-settings-form';
import OfferSettingsForm from './offer-settings/OfferSettingsForm';

const OfferSettings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { isLoading, loadSettings, saveSettings } = useUserSettings();
  const [initialData, setInitialData] = React.useState<OfferSettingsValues | null>(null);
  
  const loadAndSetSettings = async () => {
    if (!user) return null;
    const settings = await loadSettings<OfferSettingsValues>('offer_settings');
    setInitialData(settings);
    return settings;
  };
  
  useEffect(() => {
    if (user) {
      loadAndSetSettings();
    }
  }, [user]);
  
  const form = useOfferSettingsForm(initialData, loadAndSetSettings);
  
  const onSubmit = async (values: OfferSettingsValues) => {
    await saveSettings('offer_settings', values);
  };

  return (
    <div className="mb-8 pb-8 border-b">
      <h2 className="text-xl font-semibold mb-4">{t.settings.offerSettings}</h2>
      <OfferSettingsForm 
        form={form} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default OfferSettings;
