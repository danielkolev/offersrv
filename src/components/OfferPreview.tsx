
import React, { useRef, useState, useEffect } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

// Import refactored components
import SaveButton from './offer-preview/SaveButton';
import SaveOfferHandler from './offer-preview/SaveOfferHandler';
import { cn } from '@/lib/utils';

// Import template-specific components
import ClassicTemplate from './offer-preview/templates/ClassicTemplate';
import ModernDarkTemplate from './offer-preview/templates/ModernDarkTemplate';
import GradientTemplate from './offer-preview/templates/GradientTemplate';
import BusinessProTemplate from './offer-preview/templates/BusinessProTemplate';

interface OfferPreviewProps {
  isSaveDialogOpen?: boolean;
  setIsSaveDialogOpen?: (isOpen: boolean) => void;
  mode?: 'edit' | 'view';
  templateSettings?: any; // Template settings prop
}

const OfferPreview = ({ 
  isSaveDialogOpen: externalIsSaveDialogOpen, 
  setIsSaveDialogOpen: externalSetIsSaveDialogOpen,
  mode = 'edit',
  templateSettings
}: OfferPreviewProps = {}) => {
  const { offer } = useOffer();
  const { language } = useLanguage();
  const offerContentRef = useRef<HTMLDivElement>(null);
  
  // IMPORTANT: Prevent excessive rerenders by memoizing the display language
  const [displayLanguage, setDisplayLanguage] = useState<SupportedLanguage>(
    offer.details.offerLanguage || language
  );
  
  // Only update display language when offer language changes
  useEffect(() => {
    setDisplayLanguage(offer.details.offerLanguage || language);
  }, [offer.details.offerLanguage, language]);
  
  // Use either external or internal state based on what's provided
  const [internalIsSaveDialogOpen, setInternalIsSaveDialogOpen] = useState(false);
  
  const isSaveDialogOpen = externalIsSaveDialogOpen !== undefined 
    ? externalIsSaveDialogOpen 
    : internalIsSaveDialogOpen;
    
  const setIsSaveDialogOpen = externalSetIsSaveDialogOpen || setInternalIsSaveDialogOpen;

  // Get template settings either from props or from offer
  const settings = templateSettings || offer.templateSettings || {};
  
  // Determine which template to use based on settings
  const getTemplateComponent = () => {
    const designTemplate = settings?.designTemplate || 'classic';
    
    switch(designTemplate) {
      case 'modern-dark':
        return ModernDarkTemplate;
      case 'gradient':
        return GradientTemplate;
      case 'business-pro':
        return BusinessProTemplate;
      case 'classic':
      default:
        return ClassicTemplate;
    }
  };
  
  const TemplateComponent = getTemplateComponent();

  return (
    <Card className={cn(
      "mb-6", 
      settings?.layout?.fullWidth ? "max-w-none" : ""
    )}>
      <CardContent className="card-content p-0">
        <div ref={offerContentRef} className="print-container offer-preview-content">
          <TemplateComponent 
            offer={offer}
            displayLanguage={displayLanguage}
            settings={settings}
            mode={mode}
            offerContentRef={offerContentRef}
            setIsSaveDialogOpen={setIsSaveDialogOpen}
          />
        </div>
      </CardContent>
      
      {mode === 'edit' && <SaveButton onClick={() => setIsSaveDialogOpen(true)} />}
      
      <SaveOfferHandler 
        isSaveDialogOpen={isSaveDialogOpen}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
      />
    </Card>
  );
};

export default OfferPreview;
