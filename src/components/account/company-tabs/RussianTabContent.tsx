
import React from 'react';
import { Company } from '@/types/company';
import { Translations } from '@/types/language';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface RussianTabContentProps {
  company: Company;
  onFieldChange: (field: keyof Company, value: string) => void;
  t: Translations;
}

const RussianTabContent: React.FC<RussianTabContentProps> = ({ 
  company, 
  onFieldChange,
  t
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name_ru">{t.company.name} (RU)</Label>
          <Input
            id="name_ru"
            value={company.name_ru || ''}
            onChange={(e) => onFieldChange('name_ru', e.target.value)}
            placeholder={t.company.namePlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vat_number">{t.company.vatNumber}</Label>
          <Input
            id="vat_number"
            value={company.vatNumber || ''}
            onChange={(e) => onFieldChange('vatNumber', e.target.value)}
            placeholder={t.company.vatNumberPlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="address_ru">{t.company.address} (RU)</Label>
          <Input
            id="address_ru"
            value={company.address_ru || ''}
            onChange={(e) => onFieldChange('address_ru', e.target.value)}
            placeholder={t.company.addressPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city_ru">{t.company.city} (RU)</Label>
          <Input
            id="city_ru"
            value={company.city_ru || ''}
            onChange={(e) => onFieldChange('city_ru', e.target.value)}
            placeholder={t.company.cityPlaceholder}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country_ru">{t.company.country} (RU)</Label>
          <Input
            id="country_ru"
            value={company.country_ru || ''}
            onChange={(e) => onFieldChange('country_ru', e.target.value)}
            placeholder={t.company.countryPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="slogan_ru">{t.company.slogan} (RU)</Label>
          <Input
            id="slogan_ru"
            value={company.slogan_ru || ''}
            onChange={(e) => onFieldChange('slogan_ru', e.target.value)}
            placeholder={t.company.sloganPlaceholder}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="conclusion_text_ru">{t.company.conclusionText} (RU)</Label>
        <Textarea
          id="conclusion_text_ru"
          value={company.conclusion_text_ru || ''}
          onChange={(e) => onFieldChange('conclusion_text_ru', e.target.value)}
          placeholder={t.company.conclusionTextPlaceholder}
          rows={3}
        />
      </div>
    </div>
  );
};

export default RussianTabContent;
