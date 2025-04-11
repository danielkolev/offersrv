
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';

const CompanyInfoForm = () => {
  const { offer, updateCompanyInfo } = useOffer();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCompanyInfo({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={offer.company.name}
              onChange={(e) => updateCompanyInfo({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyVat">VAT Number</Label>
            <Input
              id="companyVat"
              value={offer.company.vatNumber}
              onChange={(e) => updateCompanyInfo({ vatNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyAddress">Address</Label>
            <Input
              id="companyAddress"
              value={offer.company.address}
              onChange={(e) => updateCompanyInfo({ address: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCity">City</Label>
            <Input
              id="companyCity"
              value={offer.company.city}
              onChange={(e) => updateCompanyInfo({ city: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyCountry">Country</Label>
            <Input
              id="companyCountry"
              value={offer.company.country}
              onChange={(e) => updateCompanyInfo({ country: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyPhone">Phone</Label>
            <Input
              id="companyPhone"
              value={offer.company.phone}
              onChange={(e) => updateCompanyInfo({ phone: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyEmail">Email</Label>
            <Input
              id="companyEmail"
              value={offer.company.email}
              onChange={(e) => updateCompanyInfo({ email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companyWebsite">Website</Label>
            <Input
              id="companyWebsite"
              value={offer.company.website}
              onChange={(e) => updateCompanyInfo({ website: e.target.value })}
            />
          </div>
          
          <div className="md:col-span-2 space-y-2">
            <Label>Company Logo</Label>
            <div className="flex items-center gap-4">
              {offer.company.logo ? (
                <div className="relative h-20 w-auto">
                  <img
                    src={offer.company.logo}
                    alt="Company Logo"
                    className="h-full object-contain"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute -top-2 -right-2"
                    onClick={() => updateCompanyInfo({ logo: null })}
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
                  Upload Logo
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
