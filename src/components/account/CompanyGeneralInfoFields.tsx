
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
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vat_number">{t.companyInfo.vatNumber}</Label>
          <Input
            id="vat_number"
            value={company.vat_number || ''}
            onChange={(e) => onFieldChange('vat_number', e.target.value)}
            placeholder={t.company.vatPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t.companyInfo.phone}</Label>
          <Input
            id="phone"
            value={company.phone || ''}
            onChange={(e) => onFieldChange('phone', e.target.value)}
            placeholder={t.company.phonePlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t.companyInfo.email}</Label>
          <Input
            id="email"
            type="email"
            value={company.email || ''}
            onChange={(e) => onFieldChange('email', e.target.value)}
            placeholder={t.company.emailPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">{t.companyInfo.website}</Label>
          <Input
            id="website"
            value={company.website || ''}
            onChange={(e) => onFieldChange('website', e.target.value)}
            placeholder={t.company.websitePlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">{t.companyInfo.address}</Label>
          <Input
            id="address"
            value={company.address || ''}
            onChange={(e) => onFieldChange('address', e.target.value)}
            placeholder={t.company.addressPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city">{t.companyInfo.city}</Label>
          <Input
            id="city"
            value={company.city || ''}
            onChange={(e) => onFieldChange('city', e.target.value)}
            placeholder={t.company.cityPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">{t.companyInfo.country}</Label>
          <Input
            id="country"
            value={company.country || ''}
            onChange={(e) => onFieldChange('country', e.target.value)}
            placeholder={t.company.countryPlaceholder}
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="slogan">{t.companyInfo.slogan}</Label>
          <Textarea
            id="slogan"
            value={company.slogan || ''}
            onChange={(e) => onFieldChange('slogan', e.target.value)}
            placeholder={t.companyInfo.sloganPlaceholder}
            className="resize-none"
            rows={2}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyGeneralInfoFields;
