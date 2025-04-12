
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import OfferTemplateSettings from '@/components/settings/OfferTemplateSettings';
import OfferSettings from '@/components/settings/OfferSettings';
import CompanyBankSettings from '@/components/settings/CompanyBankSettings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.settings.title}
        </h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.subtitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <OfferTemplateSettings />
            <OfferSettings />
            <CompanyBankSettings />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
