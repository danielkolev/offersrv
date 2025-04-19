
import React from 'react';
import { Company } from '@/types/company';
import FieldGroup from '../shared/FieldGroup';

interface CompanySharedFieldsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: any;
}

const CompanySharedFields = ({
  company,
  onFieldChange,
  t
}: CompanySharedFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.vatNumber}
          id="vat_number"
          value={company.vat_number || ''}
          onChange={onFieldChange}
          placeholder={t.company.vatPlaceholder}
          field="vat_number"
        />
        
        <FieldGroup
          label={t.companyInfo.eikNumber}
          id="company_id"
          value={company.company_id || ''}
          onChange={onFieldChange}
          placeholder={t.company.eikPlaceholder}
          field="company_id"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.phone}
          id="phone"
          value={company.phone || ''}
          onChange={onFieldChange}
          placeholder={t.company.phonePlaceholder}
          field="phone"
        />
        
        <FieldGroup
          label={t.companyInfo.email}
          id="email"
          value={company.email || ''}
          onChange={onFieldChange}
          placeholder={t.company.emailPlaceholder}
          field="email"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.companyInfo.website}
          id="website"
          value={company.website || ''}
          onChange={onFieldChange}
          placeholder={t.company.websitePlaceholder}
          field="website"
        />
      </div>
    </div>
  );
};

export default CompanySharedFields;
