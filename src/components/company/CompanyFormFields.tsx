
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';

interface CompanyFormFieldsProps {
  name: string;
  vatNumber: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVatNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCountryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWebsiteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CompanyFormFields = ({
  name,
  vatNumber,
  address,
  city,
  country,
  phone,
  email,
  website,
  onNameChange,
  onVatNumberChange,
  onAddressChange,
  onCityChange,
  onCountryChange,
  onPhoneChange,
  onEmailChange,
  onWebsiteChange
}: CompanyFormFieldsProps) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="companyName">{t.companyInfo.name} *</Label>
        <Input
          id="companyName"
          value={name}
          onChange={onNameChange}
          placeholder={t.company.namePlaceholder}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyVat">{t.companyInfo.vatNumber}</Label>
        <Input
          id="companyVat"
          value={vatNumber}
          onChange={onVatNumberChange}
          placeholder={t.company.vatPlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
        <Input
          id="companyAddress"
          value={address}
          onChange={onAddressChange}
          placeholder={t.company.addressPlaceholder}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
          <Input
            id="companyCity"
            value={city}
            onChange={onCityChange}
            placeholder={t.company.cityPlaceholder}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
          <Input
            id="companyCountry"
            value={country}
            onChange={onCountryChange}
            placeholder={t.company.countryPlaceholder}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
        <Input
          id="companyPhone"
          value={phone}
          onChange={onPhoneChange}
          placeholder={t.company.phonePlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
        <Input
          id="companyEmail"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder={t.company.emailPlaceholder}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
        <Input
          id="companyWebsite"
          value={website}
          onChange={onWebsiteChange}
          placeholder={t.company.websitePlaceholder}
        />
      </div>
    </>
  );
};

export default CompanyFormFields;
