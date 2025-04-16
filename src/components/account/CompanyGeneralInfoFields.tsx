
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

const CompanyGeneralInfoFields = ({ company, onFieldChange, t }: CompanyGeneralInfoFieldsProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vat_number">{t.companyInfo?.vatNumber || 'VAT Number'}</Label>
          <Input
            id="vat_number"
            placeholder={t.company?.vatPlaceholder || 'Enter VAT number'}
            value={company.vat_number || ''}
            onChange={(e) => onFieldChange('vat_number', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="eik_number">{t.companyInfo?.eikNumber || 'EIK Number'}</Label>
          <Input
            id="eik_number"
            placeholder={t.company?.eikPlaceholder || 'Enter EIK number'}
            value={company.eik_number || ''}
            onChange={(e) => onFieldChange('eik_number', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">{t.companyInfo?.phone || 'Phone'}</Label>
          <Input
            id="phone"
            placeholder={t.company?.phonePlaceholder || 'Enter phone number'}
            value={company.phone || ''}
            onChange={(e) => onFieldChange('phone', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t.companyInfo?.email || 'Email'}</Label>
          <Input
            id="email"
            placeholder={t.company?.emailPlaceholder || 'Enter email address'}
            value={company.email || ''}
            onChange={(e) => onFieldChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">{t.companyInfo?.website || 'Website'}</Label>
        <Input
          id="website"
          placeholder={t.company?.websitePlaceholder || 'Enter website URL'}
          value={company.website || ''}
          onChange={(e) => onFieldChange('website', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slogan">{t.companyInfo?.slogan || 'Company Slogan'}</Label>
        <Input
          id="slogan"
          placeholder={t.companyInfo?.sloganPlaceholder || 'Enter company slogan'}
          value={company.slogan || ''}
          onChange={(e) => onFieldChange('slogan', e.target.value)}
        />
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
