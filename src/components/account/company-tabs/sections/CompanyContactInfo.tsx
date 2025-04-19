
import React from 'react';
import { Company } from '@/types/company';
import FieldGroup from '../shared/FieldGroup';

interface CompanyContactInfoProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  phoneLabel: string;
  emailLabel: string;
  websiteLabel: string;
}

const CompanyContactInfo = ({ company, onFieldChange, phoneLabel, emailLabel, websiteLabel }: CompanyContactInfoProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={phoneLabel}
          id="phone"
          value={company.phone}
          onChange={onFieldChange}
          placeholder={phoneLabel}
          field="phone"
        />
        
        <FieldGroup
          label={emailLabel}
          id="email"
          value={company.email}
          onChange={onFieldChange}
          placeholder={emailLabel}
          field="email"
        />
      </div>

      <FieldGroup
        label={websiteLabel}
        id="website"
        value={company.website}
        onChange={onFieldChange}
        placeholder={websiteLabel}
        field="website"
      />
    </div>
  );
};

export default CompanyContactInfo;
