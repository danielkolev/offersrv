
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanySelector from '@/components/company/CompanySelector';
import CompanyInfoSettings from '@/components/account/CompanyInfoSettings';
import CompanyManager from '@/components/company/CompanyManager';
import CompanyBankSettings from '@/components/settings/CompanyBankSettings';

const CompanyManagementPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

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

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.company.manage}
        </h1>
      </div>
      
      <div className="mb-6">
        <CompanyManager onSelectCompany={handleSelectCompany} />
      </div>
      
      {selectedCompanyId ? (
        <Card>
          <CardHeader>
            <CardTitle>{t.company.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">{t.company.info}</TabsTrigger>
                <TabsTrigger value="bank">{t.settings.bankDetails}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="py-4">
                <CompanyInfoSettings 
                  companyId={selectedCompanyId} 
                  onUpdate={() => {}}
                />
              </TabsContent>
              
              <TabsContent value="bank" className="py-4">
                <CompanyBankSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p>{t.company.selectFirst}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyManagementPage;
