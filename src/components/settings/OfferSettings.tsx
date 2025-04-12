
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
  const [fetchAttempted, setFetchAttempted] = React.useState(false);
  
  const loadAndSetSettings = async () => {
    if (!user) return null;
    
    try {
      const settings = await loadSettings<OfferSettingsValues>('offer_settings');
      setInitialData(settings);
      return settings;
    } catch (error) {
      console.error("Error in loadAndSetSettings:", error);
      // We'll still return the default settings from loadSettings
      const defaultSettings = {
        usePrefix: false,
        prefix: 'OF-',
        suffixYear: true,
        defaultVatRate: 20
      };
      setInitialData(defaultSettings);
      return defaultSettings;
    } finally {
      setFetchAttempted(true);
    }
  };
  
  useEffect(() => {
    if (user && !fetchAttempted) {
      loadAndSetSettings();
    }
  }, [user, fetchAttempted]);
  
  const form = useOfferSettingsForm(initialData, loadAndSetSettings);
  
  const onSubmit = async (values: OfferSettingsValues) => {
    await saveSettings('offer_settings', values);
  };

  if (!initialData && isLoading) {
    return (
      <div className="py-4 text-center">
        {t.common.loading}
      </div>
    );
  }

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
