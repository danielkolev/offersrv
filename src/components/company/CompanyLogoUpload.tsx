
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud, X } from 'lucide-react';
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
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
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
              onError={(e) => {
                // Handle image loading errors
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGFsaWdubWVudC1iYXNlbGluZT0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
              onClick={onClearLogo}
            >
              <X size={14} />
            </Button>
          </div>
        )}
        <div>
          <Button
            type="button"
            variant="outline"
            onClick={handleButtonClick}
            className="flex items-center gap-2"
          >
            <UploadCloud size={16} />
            {t.companyInfo.uploadLogo}
          </Button>
          <input
            ref={inputRef}
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
