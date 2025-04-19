
import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import FieldGroup from './shared/FieldGroup';
import TextAreaGroup from './shared/TextAreaGroup';

interface EnglishTabContentProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const EnglishTabContent = ({ company, onFieldChange, t }: EnglishTabContentProps) => {
  return (
    <div className="space-y-4">
      <FieldGroup
        label="Company Name"
        id="name_en"
        value={company.name_en}
        onChange={onFieldChange}
        placeholder="Company name in English"
        field="name_en"
      />

      <FieldGroup
        label="Address"
        id="address_en"
        value={company.address_en}
        onChange={onFieldChange}
        placeholder="Address in English"
        field="address_en"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label="City"
          id="city_en"
          value={company.city_en}
          onChange={onFieldChange}
          placeholder="City in English"
          field="city_en"
        />
        
        <FieldGroup
          label="Country"
          id="country_en"
          value={company.country_en}
          onChange={onFieldChange}
          placeholder="Country in English"
          field="country_en"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label="VAT Number"
          id="vat_number"
          value={company.vat_number}
          onChange={onFieldChange}
          placeholder="VAT number"
          field="vat_number"
          disabled
        />
        
        <FieldGroup
          label="Company ID"
          id="company_id"
          value={company.company_id}
          onChange={onFieldChange}
          placeholder="Company ID"
          field="company_id"
          disabled
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label="Phone"
          id="phone"
          value={company.phone}
          onChange={onFieldChange}
          placeholder="Phone"
          field="phone"
          disabled
        />
        
        <FieldGroup
          label="Email"
          id="email"
          value={company.email}
          onChange={onFieldChange}
          placeholder="Email"
          field="email"
          disabled
        />
      </div>
      
      <TextAreaGroup
        label="Company Slogan"
        id="slogan_en"
        value={company.slogan_en}
        onChange={onFieldChange}
        placeholder="Enter company slogan in English"
        field="slogan_en"
      />
      
      <TextAreaGroup
        label="Conclusion Text"
        id="conclusion_text_en"
        value={company.conclusion_text_en}
        onChange={onFieldChange}
        placeholder="Enter conclusion text in English"
        field="conclusion_text_en"
      />
    </div>
  );
};

export default EnglishTabContent;
