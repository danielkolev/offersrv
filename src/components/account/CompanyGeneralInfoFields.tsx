
import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import FieldGroup from './company-tabs/shared/FieldGroup';

interface CompanyGeneralInfoFieldsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const CompanyGeneralInfoFields = ({
  company,
  onFieldChange,
  t
}: CompanyGeneralInfoFieldsProps) => {
  return (
    <div className="space-y-6 mt-6">
      <h3 className="text-lg font-medium">{t.companyInfo.title || 'General Information'}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldGroup
          label={t.company.companyLogo || 'Company Logo'}
          id="logo_url"
          value={company.logo_url || ''}
          onChange={onFieldChange}
          placeholder=""
          field="logo_url"
          isReadOnly={true}
          helperText={t.company.logoHelperText || 'Logo can be changed in the section below'}
        />
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
