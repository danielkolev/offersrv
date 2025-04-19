
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

const EnglishTabContent = ({ company, onFieldChange, t }: EnglishTabContentProps) => {
  return (
    <div className="space-y-4">
      <CompanyBasicInfo
        company={company}
        onFieldChange={onFieldChange}
        label="Company Name"
        addressLabel="Address"
        isEnglish={true}
      />

      <CompanyLocationInfo
        company={company}
        onFieldChange={onFieldChange}
        cityLabel="City"
        countryLabel="Country"
        isEnglish={true}
      />

      <CompanyIdentificationInfo
        company={company}
        onFieldChange={onFieldChange}
        vatLabel={t.companyInfo?.vatNumber || 'VAT Number'}
        companyIdLabel={t.companyInfo?.eikNumber || 'Company ID'}
      />

      <CompanyContactInfo
        company={company}
        onFieldChange={onFieldChange}
        phoneLabel={t.companyInfo?.phone || 'Phone'}
        emailLabel={t.companyInfo?.email || 'Email'}
      />

      <CompanyAdditionalInfo
        company={company}
        onFieldChange={onFieldChange}
        sloganLabel="Company Slogan"
        conclusionLabel="Conclusion Text"
        isEnglish={true}
      />
    </div>
  );
};

export default EnglishTabContent;
