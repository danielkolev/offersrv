
import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import FieldGroup from './shared/FieldGroup';
import TextAreaGroup from './shared/TextAreaGroup';

interface BulgarianTabContentProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const BulgarianTabContent = ({ company, onFieldChange, t }: BulgarianTabContentProps) => {
  return (
    <div className="space-y-4">
      <FieldGroup
        label={t.companyInfo?.name || 'Име на фирма'}
        id="name"
        value={company.name}
        onChange={onFieldChange}
        placeholder={t.company?.namePlaceholder || 'Въведете име на фирма'}
        field="name"
      />

      <FieldGroup
        label={t.companyInfo.address || 'Адрес'}
        id="address"
        value={company.address}
        onChange={onFieldChange}
        placeholder={t.company?.addressPlaceholder || 'Адрес'}
        field="address"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.city || 'Град'}
          id="city"
          value={company.city}
          onChange={onFieldChange}
          placeholder={t.company?.cityPlaceholder || 'Град'}
          field="city"
        />
        
        <FieldGroup
          label={t.companyInfo.country || 'Държава'}
          id="country"
          value={company.country}
          onChange={onFieldChange}
          placeholder={t.company?.countryPlaceholder || 'Държава'}
          field="country"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.vatNumber || 'ДДС номер'}
          id="vat_number"
          value={company.vat_number}
          onChange={onFieldChange}
          placeholder={t.company?.vatPlaceholder || 'ДДС номер'}
          field="vat_number"
        />
        
        <FieldGroup
          label={t.companyInfo.eikNumber || 'ЕИК'}
          id="company_id"
          value={company.company_id}
          onChange={onFieldChange}
          placeholder={t.company?.eikPlaceholder || 'ЕИК номер'}
          field="company_id"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.phone || 'Телефон'}
          id="phone"
          value={company.phone}
          onChange={onFieldChange}
          placeholder={t.company?.phonePlaceholder || 'Телефон'}
          field="phone"
        />
        
        <FieldGroup
          label={t.companyInfo.email || 'Имейл'}
          id="email"
          value={company.email}
          onChange={onFieldChange}
          placeholder={t.company?.emailPlaceholder || 'Имейл'}
          field="email"
        />
      </div>

      <TextAreaGroup
        label={t.companyInfo.slogan || 'Слоган на фирма'}
        id="slogan"
        value={company.slogan}
        onChange={onFieldChange}
        placeholder={t.companyInfo.sloganPlaceholder}
        field="slogan"
      />
      
      <TextAreaGroup
        label={t.companyInfo.conclusionText || 'Заключителен текст'}
        id="conclusion_text"
        value={company.conclusion_text}
        onChange={onFieldChange}
        placeholder={t.companyInfo.conclusionTextPlaceholder}
        field="conclusion_text"
      />
    </div>
  );
};

export default BulgarianTabContent;
