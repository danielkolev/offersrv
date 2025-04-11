
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Upload } from 'lucide-react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.error('Error loading logo image');
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%23f0f0f0"/%3E%3Ctext x="50" y="50" font-family="Arial" font-size="12" text-anchor="middle" dominant-baseline="middle" fill="%23999"%3ELogo%3C/text%3E%3C/svg%3E';
  };
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {t.companyInfo.logo}
      </label>
      
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onLogoChange}
          ref={fileInputRef}
        />
        
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="flex items-center gap-2"
        >
          <Upload size={16} />
          {t.companyInfo.uploadLogo}
        </Button>
        
        {logoPreview && (
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={onClearLogo}
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      
      {logoPreview && (
        <div className="mt-4 flex justify-center">
          <img
            src={logoPreview}
            alt="Company Logo"
            className="max-h-32 max-w-full object-contain border p-2 rounded"
            onError={handleImageError}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyLogoUpload;
