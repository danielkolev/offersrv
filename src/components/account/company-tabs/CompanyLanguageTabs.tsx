
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import BulgarianTabContent from './BulgarianTabContent';
import EnglishTabContent from './EnglishTabContent';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const CompanyLanguageTabs = ({ company, onFieldChange, t }: CompanyLanguageTabsProps) => {
  return (
    <Tabs defaultValue="bulgarian" className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bulgarian">Български</TabsTrigger>
        <TabsTrigger value="english">English</TabsTrigger>
      </TabsList>
      
      <TabsContent value="bulgarian" className="space-y-4 mt-2">
        <BulgarianTabContent company={company} onFieldChange={onFieldChange} t={t} />
      </TabsContent>

      <TabsContent value="english" className="space-y-4 mt-2">
        <EnglishTabContent company={company} onFieldChange={onFieldChange} t={t} />
      </TabsContent>
    </Tabs>
  );
};

export default CompanyLanguageTabs;
