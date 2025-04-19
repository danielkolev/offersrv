
import React from 'react';
import { Company } from '@/types/company';
import FieldGroup from '../shared/FieldGroup';

interface CompanyBasicInfoProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  label: string;
  addressLabel: string;
  isEnglish?: boolean;
}

const CompanyBasicInfo = ({ company, onFieldChange, label, addressLabel, isEnglish }: CompanyBasicInfoProps) => {
  const fieldPrefix = isEnglish ? '_en' : '';
  
  return (
    <div className="space-y-4">
      <FieldGroup
        label={label}
        id={`name${fieldPrefix}`}
        value={isEnglish ? company.name_en : company.name}
        onChange={onFieldChange}
        placeholder={label}
        field={isEnglish ? 'name_en' : 'name'}
      />

      <FieldGroup
        label={addressLabel}
        id={`address${fieldPrefix}`}
        value={isEnglish ? company.address_en : company.address}
        onChange={onFieldChange}
        placeholder={addressLabel}
        field={isEnglish ? 'address_en' : 'address'}
      />
    </div>
  );
};

export default CompanyBasicInfo;
