import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useCompanyInfoSettings } from '@/hooks/useCompanyInfoSettings';
import CompanyLanguageTabs from './company-tabs/CompanyLanguageTabs';
import CompanyGeneralInfoFields from './CompanyGeneralInfoFields';
import CompanyLogoSection from './CompanyLogoSection';

interface CompanyInfoProps {
  companyId: string;
  onUpdate?: () => void;
}

const CompanyInfoSettings = ({ companyId, onUpdate }: CompanyInfoProps) => {
  const { t } = useLanguage();
  
  const {
    company,
    isLoading,
    isSaving,
    handleSave,
    handleUpdateCompanyField
  } = useCompanyInfoSettings({ 
    companyId, 
    t, 
    onUpdate 
  });

  const handleLogoChange = (url: string | null) => {
    handleUpdateCompanyField('logo_url', url || '');
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.company?.title || 'Company Information'}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">{t.common?.loading || 'Loading...'}</div>
        ) : (
          <>
            <CompanyLanguageTabs 
              company={company}
              onFieldChange={handleUpdateCompanyField}
              t={t}
            />
            
            <CompanyGeneralInfoFields 
              company={company}
              onFieldChange={handleUpdateCompanyField}
              t={t}
            />
            
            <CompanyLogoSection 
              companyId={companyId}
              logoUrl={company.logo_url}
              isLoading={isLoading || isSaving}
              t={t}
              onLogoChange={handleLogoChange}
            />
            
            <div className="mt-6">
              <Button 
                type="button" 
                className="w-full" 
                onClick={handleSave}
                disabled={isLoading || isSaving}
              >
                <Save className="mr-2 h-4 w-4" />
                {isSaving ? (t.common?.processing || 'Processing...') : (t.company?.updateButton || 'Update Company')}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanyInfoSettings;
