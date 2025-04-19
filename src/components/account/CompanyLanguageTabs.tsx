
import React from 'react';
import CompanyLanguageTabsComponent from './company-tabs/CompanyLanguageTabs';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

// This is a wrapper component that forwards props to the actual implementation
const CompanyLanguageTabs = (props: CompanyLanguageTabsProps) => {
  return <CompanyLanguageTabsComponent {...props} />;
};

export default CompanyLanguageTabs;
