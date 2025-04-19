import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import CompanyBasicInfo from './sections/CompanyBasicInfo';
import CompanyLocationInfo from './sections/CompanyLocationInfo';
import CompanyIdentificationInfo from './sections/CompanyIdentificationInfo';
import CompanyContactInfo from './sections/CompanyContactInfo';
import CompanyAdditionalInfo from './sections/CompanyAdditionalInfo';
interface BulgarianTabContentProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}
const BulgarianTabContent = ({
  company,
  onFieldChange,
  t
}: BulgarianTabContentProps) => {
  return;
};
export default BulgarianTabContent;