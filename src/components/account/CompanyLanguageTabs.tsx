
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import BulgarianTabContent from './company-tabs/BulgarianTabContent';
import EnglishTabContent from './company-tabs/EnglishTabContent';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const CompanyLanguageTabs = ({ company, onFieldChange, t }: CompanyLanguageTabsProps) => {
  const { language } = useLanguage();
  
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
