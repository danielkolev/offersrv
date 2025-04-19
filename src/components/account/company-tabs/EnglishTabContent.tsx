import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import CompanyBasicInfo from './sections/CompanyBasicInfo';
import CompanyLocationInfo from './sections/CompanyLocationInfo';
import CompanyIdentificationInfo from './sections/CompanyIdentificationInfo';
import CompanyContactInfo from './sections/CompanyContactInfo';
import CompanyAdditionalInfo from './sections/CompanyAdditionalInfo';
interface EnglishTabContentProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}
const EnglishTabContent = ({
  company,
  onFieldChange,
  t
}: EnglishTabContentProps) => {
  return;
};
export default EnglishTabContent;