
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import { Textarea } from '@/components/ui/textarea';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const CompanyLanguageTabs = ({ company, onFieldChange, t }: CompanyLanguageTabsProps) => {
  return (
    <Tabs defaultValue="bulgarian" className="mt-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="bulgarian">Български</TabsTrigger>
        <TabsTrigger value="english">English</TabsTrigger>
      </TabsList>
      
      {/* Bulgarian content */}
      <TabsContent value="bulgarian" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t.companyInfo?.name || 'Company Name'}</Label>
          <Input
            id="name"
            placeholder={t.company?.namePlaceholder || 'Enter company name'}
            value={company.name || ''}
            onChange={(e) => onFieldChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slogan">{t.companyInfo.slogan || 'Slogan'}</Label>
          <Textarea
            id="slogan"
            value={company.slogan || ''}
            onChange={(e) => onFieldChange('slogan', e.target.value)}
            placeholder={t.companyInfo.sloganPlaceholder || 'Enter company slogan'}
            className="resize-none"
            rows={2}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="conclusion_text">{t.companyInfo.conclusionText || 'Conclusion Text'}</Label>
          <Textarea
            id="conclusion_text"
            value={company.conclusion_text || ''}
            onChange={(e) => onFieldChange('conclusion_text', e.target.value)}
            placeholder={t.companyInfo.conclusionTextPlaceholder || 'Enter conclusion text'}
            className="resize-none"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">{t.companyInfo.address || 'Address'}</Label>
          <Input
            id="address"
            value={company.address || ''}
            onChange={(e) => onFieldChange('address', e.target.value)}
            placeholder={t.company?.addressPlaceholder || 'Address'}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">{t.companyInfo.city || 'City'}</Label>
            <Input
              id="city"
              value={company.city || ''}
              onChange={(e) => onFieldChange('city', e.target.value)}
              placeholder={t.company?.cityPlaceholder || 'City'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">{t.companyInfo.country || 'Country'}</Label>
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
      <TabsContent value="english" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label htmlFor="name_en">Company Name (EN)</Label>
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
          <Label htmlFor="conclusion_text_en">Conclusion Text (EN)</Label>
          <Textarea
            id="conclusion_text_en"
            value={company.conclusion_text_en || ''}
            onChange={(e) => onFieldChange('conclusion_text_en', e.target.value)}
            placeholder="Enter conclusion text in English"
            className="resize-none"
            rows={2}
          />
        </div>

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
  );
};

export default CompanyLanguageTabs;
