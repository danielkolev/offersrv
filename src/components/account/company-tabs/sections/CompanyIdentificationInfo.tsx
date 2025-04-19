
import React from 'react';
import { Company } from '@/types/company';
import FieldGroup from '../shared/FieldGroup';

interface CompanyIdentificationInfoProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  vatLabel: string;
  companyIdLabel: string;
}

const CompanyIdentificationInfo = ({ company, onFieldChange, vatLabel, companyIdLabel }: CompanyIdentificationInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FieldGroup
        label={vatLabel}
        id="vat_number"
        value={company.vat_number}
        onChange={onFieldChange}
        placeholder={vatLabel}
        field="vat_number"
      />
      
      <FieldGroup
        label={companyIdLabel}
        id="company_id"
        value={company.company_id}
        onChange={onFieldChange}
        placeholder={companyIdLabel}
        field="company_id"
      />
    </div>
  );
};

export default CompanyIdentificationInfo;
