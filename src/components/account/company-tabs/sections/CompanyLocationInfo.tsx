
import React from 'react';
import { Company } from '@/types/company';
import FieldGroup from '../shared/FieldGroup';

interface CompanyLocationInfoProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  cityLabel: string;
  countryLabel: string;
  isEnglish?: boolean;
}

const CompanyLocationInfo = ({ company, onFieldChange, cityLabel, countryLabel, isEnglish }: CompanyLocationInfoProps) => {
  const fieldPrefix = isEnglish ? '_en' : '';
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldGroup
        label={cityLabel}
        id={`city${fieldPrefix}`}
        value={isEnglish ? company.city_en : company.city}
        onChange={onFieldChange}
        placeholder={cityLabel}
        field={isEnglish ? 'city_en' : 'city'}
      />
      
      <FieldGroup
        label={countryLabel}
        id={`country${fieldPrefix}`}
        value={isEnglish ? company.country_en : company.country}
        onChange={onFieldChange}
        placeholder={countryLabel}
        field={isEnglish ? 'country_en' : 'country'}
      />
    </div>
  );
};

export default CompanyLocationInfo;
