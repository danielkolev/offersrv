
import React from 'react';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface OfferFooterProps {
  footerText: string;
  settings?: any;
  showBankDetails: boolean;
  showDigitalSignature: boolean;
  showSignatureArea: boolean;
  displayLanguage: SupportedLanguage;
}

const OfferFooter: React.FC<OfferFooterProps> = ({
  footerText,
  settings,
  showBankDetails,
  showDigitalSignature,
  showSignatureArea,
  displayLanguage
}) => {
  return (
    <div className={cn(
      "text-center text-sm text-muted-foreground mt-12 pt-4 border-t print-visible",
      settings?.layout?.compactMode ? "text-xs" : ""
    )}
    style={{ 
      borderColor: settings?.appearance?.primaryColor || ""
    }}>
      <p>{footerText}</p>
      
      {settings?.footer?.showBankDetails && (
        <div className="mt-2 text-xs text-muted-foreground">
          <p className="font-medium">{displayLanguage === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
          <p>{settings?.footer?.bankDetails?.name || (displayLanguage === 'bg' ? 'Банка' : 'Bank')}</p>
          <p>IBAN: {settings?.footer?.bankDetails?.iban || 'BG12EXAMPLE12345678'}</p>
          {settings?.footer?.bankDetails?.swift && <p>SWIFT: {settings?.footer?.bankDetails?.swift}</p>}
        </div>
      )}
      
      {showDigitalSignature && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="border-t pt-2 text-right">
            <p>{displayLanguage === 'bg' ? 'Дата:' : 'Date:'}</p>
            <div className="h-8"></div>
          </div>
          <div className="border-t pt-2 text-right">
            <p>{displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:'}</p>
            <div className="h-8"></div>
          </div>
        </div>
      )}
      
      {settings?.footer?.showSignatureArea && !showDigitalSignature && (
        <div className="mt-4 flex justify-end">
          <div className="border-t pt-2 w-48 text-right">
            <p>{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfferFooter;
