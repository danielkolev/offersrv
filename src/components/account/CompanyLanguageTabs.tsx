
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';

interface CompanyLanguageTabsProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const CompanyLanguageTabs = ({ 
  company, 
  onFieldChange, 
  t 
}: CompanyLanguageTabsProps) => {
  return (
    <Tabs defaultValue="bulgarian">
      <div className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="bulgarian">Български</TabsTrigger>
          <TabsTrigger value="english">English</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="bulgarian" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">{t.companyInfo.name} *</Label>
            <Input
              id="companyName"
              value={company.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder={t.company.namePlaceholder}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyVat">{t.companyInfo.vatNumber}</Label>
            <Input
              id="companyVat"
              value={company.vat_number || ''}
              onChange={(e) => onFieldChange('vat_number', e.target.value)}
              placeholder={t.company.vatPlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
            <Input
              id="companyAddress"
              value={company.address || ''}
              onChange={(e) => onFieldChange('address', e.target.value)}
              placeholder={t.company.addressPlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
            <Input
              id="companyCity"
              value={company.city || ''}
              onChange={(e) => onFieldChange('city', e.target.value)}
              placeholder={t.company.cityPlaceholder}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
            <Input
              id="companyCountry"
              value={company.country || ''}
              onChange={(e) => onFieldChange('country', e.target.value)}
              placeholder={t.company.countryPlaceholder}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="english" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyNameEn">{t.companyInfo.name} (English) *</Label>
            <Input
              id="companyNameEn"
              value={company.name_en || ''}
              onChange={(e) => onFieldChange('name_en', e.target.value)}
              placeholder="Enter company name in English"
            />
          </div>
          
          <div className="col-span-1 md:col-span-2 space-y-2">
            <Label htmlFor="companyAddressEn">{t.companyInfo.address} (English)</Label>
            <Input
              id="companyAddressEn"
              value={company.address_en || ''}
              onChange={(e) => onFieldChange('address_en', e.target.value)}
              placeholder="Enter company address in English"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCityEn">{t.companyInfo.city} (English)</Label>
            <Input
              id="companyCityEn"
              value={company.city_en || ''}
              onChange={(e) => onFieldChange('city_en', e.target.value)}
              placeholder="Enter city in English"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCountryEn">{t.companyInfo.country} (English)</Label>
            <Input
              id="companyCountryEn"
              value={company.country_en || ''}
              onChange={(e) => onFieldChange('country_en', e.target.value)}
              placeholder="Enter country in English"
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CompanyLanguageTabs;
