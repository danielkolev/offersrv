
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';

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
          <Label htmlFor="address">{t.companyInfo?.address || 'Address'}</Label>
          <Input
            id="address"
            placeholder={t.company?.addressPlaceholder || 'Enter company address'}
            value={company.address || ''}
            onChange={(e) => onFieldChange('address', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">{t.companyInfo?.city || 'City'}</Label>
            <Input
              id="city"
              placeholder={t.company?.cityPlaceholder || 'Enter city'}
              value={company.city || ''}
              onChange={(e) => onFieldChange('city', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country">{t.companyInfo?.country || 'Country'}</Label>
            <Input
              id="country"
              placeholder={t.company?.countryPlaceholder || 'Enter country'}
              value={company.country || ''}
              onChange={(e) => onFieldChange('country', e.target.value)}
            />
          </div>
        </div>
      </TabsContent>
      
      {/* English content */}
      <TabsContent value="english" className="space-y-4 mt-2">
        <div className="space-y-2">
          <Label htmlFor="name_en">{t.companyInfo?.name || 'Company Name'} (EN)</Label>
          <Input
            id="name_en"
            placeholder="Enter company name in English"
            value={company.name_en || ''}
            onChange={(e) => onFieldChange('name_en', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address_en">{t.companyInfo?.address || 'Address'} (EN)</Label>
          <Input
            id="address_en"
            placeholder="Enter company address in English"
            value={company.address_en || ''}
            onChange={(e) => onFieldChange('address_en', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city_en">{t.companyInfo?.city || 'City'} (EN)</Label>
            <Input
              id="city_en"
              placeholder="Enter city in English"
              value={company.city_en || ''}
              onChange={(e) => onFieldChange('city_en', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="country_en">{t.companyInfo?.country || 'Country'} (EN)</Label>
            <Input
              id="country_en"
              placeholder="Enter country in English"
              value={company.country_en || ''}
              onChange={(e) => onFieldChange('country_en', e.target.value)}
            />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CompanyLanguageTabs;
