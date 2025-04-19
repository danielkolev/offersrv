
import React, { useRef, useState, useEffect } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/language/base';
import { useTemplateManagement } from '@/hooks/templates';

// Import refactored components
import SaveButton from './offer-preview/SaveButton';
import SaveOfferHandler from './offer-preview/SaveOfferHandler';
import { cn } from '@/lib/utils';

// Import template-specific components
import ClassicTemplate from './offer-preview/templates/ClassicTemplate';
import ModernDarkTemplate from './offer-preview/templates/ModernDarkTemplate';

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
  const { userTemplates, defaultTemplateId } = useTemplateManagement();
  
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

  // Get default template settings
  const defaultTemplate = userTemplates.find(template => template.id === defaultTemplateId);
  
  // Get template settings with a priority order:
  // 1. Explicitly provided templateSettings prop
  // 2. Offer's own templateSettings 
  // 3. Default template's settings
  // 4. Fallback to classic template
  const settings = templateSettings || 
                  offer.templateSettings || 
                  defaultTemplate?.settings || 
                  { templateType: 'classic' };
  
  // Determine which template to use based on settings
  const getTemplateComponent = () => {
    const designTemplate = settings?.templateType || 'classic';
    
    switch(designTemplate.toLowerCase()) {
      case 'moderndark':
        return ModernDarkTemplate;
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
