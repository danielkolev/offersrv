
import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import CompanyBasicInfo from './sections/CompanyBasicInfo';
import CompanyLocationInfo from './sections/CompanyLocationInfo';
import CompanySharedFields from './sections/CompanySharedFields';
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
  return (
    <div className="space-y-6">
      {/* Basic Info - Name and Address */}
      <CompanyBasicInfo 
        company={company} 
        onFieldChange={onFieldChange}
        label={t.companyInfo.name}
        addressLabel={t.companyInfo.address}
        isEnglish={true}
      />

      {/* Location Info - City and Country */}
      <CompanyLocationInfo 
        company={company} 
        onFieldChange={onFieldChange}
        cityLabel={t.companyInfo.city}
        countryLabel={t.companyInfo.country}
        isEnglish={true}
      />

      {/* Shared Fields - VAT, EIK, Contact Info */}
      <CompanySharedFields 
        company={company}
        onFieldChange={onFieldChange}
        t={t}
      />

      {/* Additional Info - Slogan and Conclusion */}
      <CompanyAdditionalInfo 
        company={company} 
        onFieldChange={onFieldChange}
        sloganLabel={t.companyInfo.slogan}
        conclusionLabel={t.companyInfo.conclusionText}
        isEnglish={true}
      />
    </div>
  );
};

export default EnglishTabContent;
