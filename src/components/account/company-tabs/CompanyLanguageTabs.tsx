
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import BulgarianTabContent from './BulgarianTabContent';
import EnglishTabContent from './EnglishTabContent';
import { useLanguage } from '@/context/LanguageContext';
import LoadingErrorFeedback from '@/components/common/LoadingErrorFeedback';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
  isLoading?: boolean;
  error?: string | null;
}

const CompanyLanguageTabs = ({ 
  company, 
  onFieldChange, 
  t,
  isLoading = false,
  error = null
}: CompanyLanguageTabsProps) => {
  const { language } = useLanguage();
  
  if (isLoading || error) {
    return <LoadingErrorFeedback 
      isLoading={isLoading} 
      error={error} 
      loadingMessage={t.company.loading}
      errorTitle={t.company.error}
    />;
  }
  
  return (
    <Tabs defaultValue={language === 'en' ? 'english' : 'bulgarian'} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bulgarian">Български</TabsTrigger>
        <TabsTrigger value="english">English</TabsTrigger>
      </TabsList>
      
      <TabsContent value="bulgarian" className="space-y-4 mt-4">
        <BulgarianTabContent 
          company={company}
          onFieldChange={onFieldChange}
          t={t}
        />
      </TabsContent>

      <TabsContent value="english" className="space-y-4 mt-4">
        <EnglishTabContent 
          company={company}
          onFieldChange={onFieldChange}
          t={t}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyLanguageTabs;
