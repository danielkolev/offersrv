
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    <div className="space-y-4 mt-6">
      {/* Common fields (not language-specific) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyVatNumber">{t.companyInfo.vatNumber}</Label>
          <Input 
            id="companyVatNumber" 
            value={company.vat_number || ''} 
            onChange={e => onFieldChange('vat_number', e.target.value)} 
            placeholder={t.company?.vatPlaceholder || 'VAT number'} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyId">Company ID</Label>
          <Input 
            id="companyId" 
            value={company.company_id || ''} 
            onChange={e => onFieldChange('company_id', e.target.value)} 
            placeholder="Company ID" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
          <Input 
            id="companyPhone" 
            value={company.phone || ''} 
            onChange={e => onFieldChange('phone', e.target.value)} 
            placeholder={t.company?.phonePlaceholder || 'Phone'} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
          <Input 
            id="companyEmail" 
            value={company.email || ''} 
            onChange={e => onFieldChange('email', e.target.value)} 
            type="email" 
            placeholder={t.company?.emailPlaceholder || 'Email'} 
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
        <Input 
          id="companyWebsite" 
          value={company.website || ''} 
          onChange={e => onFieldChange('website', e.target.value)} 
          placeholder={t.company?.websitePlaceholder || 'Website'} 
        />
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
