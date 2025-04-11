
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div className="space-y-2">
        <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
        <Input
          id="companyPhone"
          value={company.phone || ''}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          placeholder={t.company.phonePlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
        <Input
          id="companyEmail"
          type="email"
          value={company.email || ''}
          onChange={(e) => onFieldChange('email', e.target.value)}
          placeholder={t.company.emailPlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
        <Input
          id="companyWebsite"
          value={company.website || ''}
          onChange={(e) => onFieldChange('website', e.target.value)}
          placeholder={t.company.websitePlaceholder}
        />
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
