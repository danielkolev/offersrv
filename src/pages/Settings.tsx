
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import SettingsLayout from '@/components/settings/SettingsLayout';
import OfferTemplateSettings from '@/components/settings/OfferTemplateSettings';
import OfferSettings from '@/components/settings/OfferSettings';
import CompanyBankSettings from '@/components/settings/CompanyBankSettings';

const Settings = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <SettingsLayout>
        <OfferTemplateSettings />
        <OfferSettings />
        <CompanyBankSettings />
      </SettingsLayout>
    </div>
  );
};

export default Settings;
