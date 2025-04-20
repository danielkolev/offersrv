
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Textarea } from '@/components/ui/textarea';
import { useIsMobile } from '@/hooks/use-mobile';

const CompanyInfoForm = () => {
  const { offer, updateCompanyInfo } = useOffer();
  const { t } = useLanguage();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompanyInfo({ logo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-6 bg-gray-50">
      <CardHeader>
        <CardTitle>{t.companyInfo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">{t.companyInfo.name}</Label>
            <Input
              id="companyName"
              value={offer.company.name}
              onChange={(e) => updateCompanyInfo({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyVat">{t.companyInfo.vatNumber}</Label>
            <Input
              id="companyVat"
              value={offer.company.vatNumber}
              onChange={(e) => updateCompanyInfo({ vatNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyEik">{t.companyInfo.eikNumber}</Label>
            <Input
              id="companyEik"
              value={offer.company.eikNumber || ''}
              onChange={(e) => updateCompanyInfo({ eikNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyAddress">{t.companyInfo.address}</Label>
            <Input
              id="companyAddress"
              value={offer.company.address}
              onChange={(e) => updateCompanyInfo({ address: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCity">{t.companyInfo.city}</Label>
            <Input
              id="companyCity"
              value={offer.company.city}
              onChange={(e) => updateCompanyInfo({ city: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCountry">{t.companyInfo.country}</Label>
            <Input
              id="companyCountry"
              value={offer.company.country}
              onChange={(e) => updateCompanyInfo({ country: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyPhone">{t.companyInfo.phone}</Label>
            <Input
              id="companyPhone"
              value={offer.company.phone}
              onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyEmail">{t.companyInfo.email}</Label>
            <Input
              id="companyEmail"
              value={offer.company.email}
              onChange={(e) => updateCompanyInfo({ email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">{t.companyInfo.website}</Label>
            <Input
              id="companyWebsite"
              value={offer.company.website}
              onChange={(e) => updateCompanyInfo({ website: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companySlogan">{t.companyInfo.slogan}</Label>
            <Textarea
              id="companySlogan"
              value={offer.company.slogan || ''}
              placeholder={t.companyInfo.sloganPlaceholder}
              onChange={(e) => updateCompanyInfo({ slogan: e.target.value })}
              className="resize-none"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyConclusion">{t.companyInfo.conclusionText}</Label>
            <Textarea
              id="companyConclusion"
              value={offer.company.conclusion_text || ''}
              placeholder={t.companyInfo.conclusionTextPlaceholder}
              onChange={(e) => updateCompanyInfo({ conclusion_text: e.target.value })}
              className="resize-none"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label>{t.companyInfo.logo}</Label>
            <div className="flex items-center gap-4 flex-wrap">
              {offer.company.logo_url ? (
                <div className="relative h-20 w-auto">
                  <img
                    src={offer.company.logo_url}
                    alt={t.companyInfo.logo}
                    className="h-full object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => updateCompanyInfo({ logo_url: null })}
                  >
                    X
                  </Button>
                </div>
              ) : null}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLogoClick}
                  className="flex items-center gap-2"
                >
                  <UploadCloud size={16} />
                  {t.companyInfo.uploadLogo}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoForm;
