
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

const CompanyGeneralInfoFields: React.FC<CompanyGeneralInfoFieldsProps> = ({
  company,
  onFieldChange,
  t
}) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">{t.companyInfo.name}</Label>
        <Input
          id="companyName"
          value={company.name}
          onChange={(e) => onFieldChange('name', e.target.value)}
          placeholder={t.company?.namePlaceholder || 'Company name'}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyVatNumber">{t.companyInfo.vatNumber}</Label>
          <Input
            id="companyVatNumber"
            value={company.vat_number || ''}
            onChange={(e) => onFieldChange('vat_number', e.target.value)}
            placeholder={t.company?.vatPlaceholder || 'VAT number'}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyEikNumber">{t.companyInfo.eikNumber}</Label>
          <Input
            id="companyEikNumber"
            value={company.eik_number || ''}
            onChange={(e) => onFieldChange('eik_number', e.target.value)}
            placeholder={t.company?.eikPlaceholder || 'EIK number'}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
        <Input
          id="companyAddress"
          value={company.address || ''}
          onChange={(e) => onFieldChange('address', e.target.value)}
          placeholder={t.company?.addressPlaceholder || 'Address'}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
          <Input
            id="companyCity"
            value={company.city || ''}
            onChange={(e) => onFieldChange('city', e.target.value)}
            placeholder={t.company?.cityPlaceholder || 'City'}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
          <Input
            id="companyCountry"
            value={company.country || ''}
            onChange={(e) => onFieldChange('country', e.target.value)}
            placeholder={t.company?.countryPlaceholder || 'Country'}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
          <Input
            id="companyPhone"
            value={company.phone || ''}
            onChange={(e) => onFieldChange('phone', e.target.value)}
            placeholder={t.company?.phonePlaceholder || 'Phone'}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
          <Input
            id="companyEmail"
            value={company.email || ''}
            onChange={(e) => onFieldChange('email', e.target.value)}
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
          onChange={(e) => onFieldChange('website', e.target.value)}
          placeholder={t.company?.websitePlaceholder || 'Website'}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companySlogan">{t.companyInfo.slogan}</Label>
        <Textarea
          id="companySlogan"
          value={company.slogan || ''}
          onChange={(e) => onFieldChange('slogan', e.target.value)}
          placeholder={t.companyInfo.sloganPlaceholder}
          className="resize-none"
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyConclusion">{t.companyInfo.conclusionText}</Label>
        <Textarea
          id="companyConclusion"
          value={company.conclusion_text || ''}
          onChange={(e) => onFieldChange('conclusion_text', e.target.value)}
          placeholder={t.companyInfo.conclusionTextPlaceholder}
          className="resize-none"
          rows={2}
        />
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
