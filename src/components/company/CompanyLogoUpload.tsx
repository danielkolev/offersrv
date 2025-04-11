
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface CompanyLogoUploadProps {
  logoPreview: string | null;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearLogo: () => void;
}

export const CompanyLogoUpload = ({ 
  logoPreview, 
  onLogoChange, 
  onClearLogo 
}: CompanyLogoUploadProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <Label>{t.companyInfo.logo}</Label>
      <div className="flex items-center gap-4">
        {logoPreview && (
          <div className="relative h-20 w-auto">
            <img
              src={logoPreview}
              alt={t.companyInfo.logo}
              className="h-full object-contain"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute -top-2 -right-2"
              onClick={onClearLogo}
            >
              X
            </Button>
          </div>
        )}
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('logoInput')?.click()}
            className="flex items-center gap-2"
          >
            <UploadCloud size={16} />
            {t.companyInfo.uploadLogo}
          </Button>
          <input
            id="logoInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onLogoChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyLogoUpload;
