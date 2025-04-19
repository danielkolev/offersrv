
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
  return (
    <div className="space-y-6">
      <CompanyBasicInfo 
        company={company} 
        onFieldChange={onFieldChange}
        label={t.companyInfo.name}
        addressLabel={t.companyInfo.address}
        isEnglish={true}
      />

      <CompanyLocationInfo 
        company={company} 
        onFieldChange={onFieldChange}
        cityLabel={t.companyInfo.city}
        countryLabel={t.companyInfo.country}
        isEnglish={true}
      />

      <CompanyIdentificationInfo 
        company={company} 
        onFieldChange={onFieldChange}
        vatLabel={t.companyInfo.vatNumber}
        companyIdLabel={t.companyInfo.eikNumber}
      />

      <CompanyContactInfo 
        company={company} 
        onFieldChange={onFieldChange}
        phoneLabel={t.companyInfo.phone}
        emailLabel={t.companyInfo.email}
      />

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
