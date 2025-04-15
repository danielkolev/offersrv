
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyInfoSettings from '@/components/account/CompanyInfoSettings';
import CompanyBankSettings from '@/components/settings/CompanyBankSettings';
import BackButton from '@/components/navigation/BackButton';
import { useCompanySelection } from '@/hooks/useCompanySelection';
import { Button } from '@/components/ui/button';
import { Loader2, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyManagementPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    selectedCompanyId, 
    isLoadingCompanyData, 
    fetchError, 
    fetchUserCompany 
  } = useCompanySelection(true);

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

  // Loading state
  if (isLoadingCompanyData) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BackButton label={t.common.back} to="/" />
            <h1 className="text-3xl font-bold text-offer-gray">
              {t.company.manage}
            </h1>
          </div>
        </div>
        
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  // No company state - show company creation form
  if (!selectedCompanyId) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BackButton label={t.common.back} to="/" />
            <h1 className="text-3xl font-bold text-offer-gray">
              {t.company.manage}
            </h1>
          </div>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center py-8">
              <Building className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">{t.company.noCompany}</p>
              <p className="text-gray-500 mb-6">{t.company.createFirst}</p>
              
              <Button 
                onClick={() => navigate('/company-management/create')}
                className="px-6"
              >
                {t.company.createCompany}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton label={t.common.back} to="/" />
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.company.companySettings}
          </h1>
        </div>
      </div>
      
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
    </div>
  );
};

export default CompanyManagementPage;
