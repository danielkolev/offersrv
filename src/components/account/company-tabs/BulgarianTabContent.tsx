
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

const BulgarianTabContent = ({ company, onFieldChange, t }: BulgarianTabContentProps) => {
  return (
    <div className="space-y-4">
      <CompanyBasicInfo
        company={company}
        onFieldChange={onFieldChange}
        label={t.companyInfo?.name || 'Име на фирма'}
        addressLabel={t.companyInfo?.address || 'Адрес'}
      />

      <CompanyLocationInfo
        company={company}
        onFieldChange={onFieldChange}
        cityLabel={t.companyInfo?.city || 'Град'}
        countryLabel={t.companyInfo?.country || 'Държава'}
      />

      <CompanyIdentificationInfo
        company={company}
        onFieldChange={onFieldChange}
        vatLabel={t.companyInfo?.vatNumber || 'ДДС номер'}
        companyIdLabel={t.companyInfo?.eikNumber || 'ЕИК'}
      />

      <CompanyContactInfo
        company={company}
        onFieldChange={onFieldChange}
        phoneLabel={t.companyInfo?.phone || 'Телефон'}
        emailLabel={t.companyInfo?.email || 'Имейл'}
      />

      <CompanyAdditionalInfo
        company={company}
        onFieldChange={onFieldChange}
        sloganLabel={t.companyInfo?.slogan || 'Слоган на фирма'}
        conclusionLabel={t.companyInfo?.conclusionText || 'Заключителен текст'}
      />
    </div>
  );
};

export default BulgarianTabContent;
