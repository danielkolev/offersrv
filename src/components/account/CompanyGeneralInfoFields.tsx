import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
    <div className="space-y-4">
      <Tabs defaultValue="bulgarian" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bulgarian">Български</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>

        {/* Bulgarian Content */}
        <TabsContent value="bulgarian" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.companyInfo?.name || 'Company Name'}</Label>
            <Input
              id="name"
              value={company.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder={t.company?.namePlaceholder || 'Company name'}
            />
          </div>
          
          <div className="space-y-2">
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
          
          <div className="space-y-2">
            <Label htmlFor="conclusionText">{t.companyInfo.conclusionText}</Label>
            <Textarea
              id="conclusionText"
              value={company.conclusion_text || ''}
              onChange={(e) => onFieldChange('conclusion_text', e.target.value)}
              placeholder={t.companyInfo.conclusionTextPlaceholder}
              className="resize-none"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">{t.companyInfo.address}</Label>
            <Input
              id="address"
              value={company.address || ''}
              onChange={(e) => onFieldChange('address', e.target.value)}
              placeholder={t.company?.addressPlaceholder || 'Address'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">{t.companyInfo.city}</Label>
              <Input
                id="city"
                value={company.city || ''}
                onChange={(e) => onFieldChange('city', e.target.value)}
                placeholder={t.company?.cityPlaceholder || 'City'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country">{t.companyInfo.country}</Label>
              <Input
                id="country"
                value={company.country || ''}
                onChange={(e) => onFieldChange('country', e.target.value)}
                placeholder={t.company?.countryPlaceholder || 'Country'}
              />
            </div>
          </div>
        </TabsContent>

        {/* English Content */}
        <TabsContent value="english" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name_en">{t.companyInfo?.name || 'Company Name'} (EN)</Label>
            <Input
              id="name_en"
              value={company.name_en || ''}
              onChange={(e) => onFieldChange('name_en', e.target.value)}
              placeholder="Company name in English"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slogan_en">Company Slogan (EN)</Label>
            <Textarea
              id="slogan_en"
              value={company.slogan_en || ''}
              onChange={(e) => onFieldChange('slogan_en', e.target.value)}
              placeholder="Enter company slogan in English"
              className="resize-none"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="conclusionText_en">Conclusion Text (EN)</Label>
            <Textarea
              id="conclusionText_en"
              value={company.conclusion_text_en || ''}
              onChange={(e) => onFieldChange('conclusion_text_en', e.target.value)}
              placeholder="Enter conclusion text in English"
              className="resize-none"
              rows={2}
            />
          </div>

          {/* English address fields */}
          <div className="space-y-2">
            <Label htmlFor="address_en">Address (EN)</Label>
            <Input
              id="address_en"
              value={company.address_en || ''}
              onChange={(e) => onFieldChange('address_en', e.target.value)}
              placeholder="Address in English"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city_en">City (EN)</Label>
              <Input
                id="city_en"
                value={company.city_en || ''}
                onChange={(e) => onFieldChange('city_en', e.target.value)}
                placeholder="City in English"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country_en">Country (EN)</Label>
              <Input
                id="country_en"
                value={company.country_en || ''}
                onChange={(e) => onFieldChange('country_en', e.target.value)}
                placeholder="Country in English"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Common fields (not language-specific) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
          <Label htmlFor="companyId">Company ID</Label>
          <Input
            id="companyId"
            value={company.company_id || ''}
            onChange={(e) => onFieldChange('company_id', e.target.value)}
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
    </div>
  );
};

export default CompanyGeneralInfoFields;
