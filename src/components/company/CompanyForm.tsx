
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useCompanyForm } from '@/hooks/useCompanyForm';
import CompanyLogoUpload from './CompanyLogoUpload';
import CompanyFormFields from './CompanyFormFields';

interface CompanyFormProps {
  onSuccess?: (companyId: string) => void;
}

export const CompanyForm = ({ onSuccess }: CompanyFormProps) => {
  const { t } = useLanguage();
  
  const {
    formData,
    setters,
    handleLogoChange,
    clearLogo,
    handleSubmit
  } = useCompanyForm({ onSuccess });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.company.create}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CompanyFormFields
            name={formData.name}
            vatNumber={formData.vatNumber}
            address={formData.address}
            city={formData.city}
            country={formData.country}
            phone={formData.phone}
            email={formData.email}
            website={formData.website}
            onNameChange={(e) => setters.setName(e.target.value)}
            onVatNumberChange={(e) => setters.setVatNumber(e.target.value)}
            onAddressChange={(e) => setters.setAddress(e.target.value)}
            onCityChange={(e) => setters.setCity(e.target.value)}
            onCountryChange={(e) => setters.setCountry(e.target.value)}
            onPhoneChange={(e) => setters.setPhone(e.target.value)}
            onEmailChange={(e) => setters.setEmail(e.target.value)}
            onWebsiteChange={(e) => setters.setWebsite(e.target.value)}
          />
          
          <CompanyLogoUpload
            logoPreview={formData.logoPreview}
            onLogoChange={handleLogoChange}
            onClearLogo={clearLogo}
          />
          
          <Button type="submit" className="w-full mt-6" disabled={formData.loading}>
            {formData.loading ? t.common.processing : t.company.createButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyForm;
