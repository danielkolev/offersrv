
import React, { useRef } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent } from '@/components/ui/card';

// Import refactored components
import OfferHeader from './offer-preview/OfferHeader';
import ClientInfoSection from './offer-preview/ClientInfoSection';
import ProductsTable from './offer-preview/ProductsTable';
import TotalsSection from './offer-preview/TotalsSection';
import NotesSection from './offer-preview/NotesSection';
import SaveButton from './offer-preview/SaveButton';
import OfferActions from './offer-preview/OfferActions';
import SaveOfferHandler from './offer-preview/SaveOfferHandler';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';

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
  const { offer, calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  const { t, language } = useLanguage();
  const offerContentRef = useRef<HTMLDivElement>(null);
  
  // Use the offer language for display, not the UI language
  const displayLanguage = offer.details.offerLanguage || language;
  
  // Use either external or internal state based on what's provided
  const [internalIsSaveDialogOpen, setInternalIsSaveDialogOpen] = React.useState(false);
  
  const isSaveDialogOpen = externalIsSaveDialogOpen !== undefined 
    ? externalIsSaveDialogOpen 
    : internalIsSaveDialogOpen;
    
  const setIsSaveDialogOpen = externalSetIsSaveDialogOpen || setInternalIsSaveDialogOpen;

  // Check if it's a draft (no offer number)
  const isDraft = !offer.details.offerNumber;

  // Get footer text from template settings or use default
  const footerText = offer.details.offerLanguage === 'bg' 
    ? 'Благодарим Ви за доверието!' 
    : 'Thank you for your business!';

  return (
    <Card className="mb-6">
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <CardContent className="card-content">
        <div ref={offerContentRef} className="print-container offer-preview-content">
          <OfferHeader offer={offer} />
          
          {/* Client and Offer Details in two columns on the same level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Left column: Client info */}
            <ClientInfoSection client={offer.client} />
            
            {/* Right column: Offer details */}
            <div className="bg-gray-50 rounded-md p-3">
              <h3 className="text-base font-semibold mb-2 text-offer-blue">
                {displayLanguage === 'bg' ? 'Детайли на офертата' : 'Offer Details'}
              </h3>
              
              <div className="text-sm space-y-1">
                {!isDraft && offer.details.offerNumber && (
                  <p>
                    <span className="font-medium">{displayLanguage === 'bg' ? 'Номер' : 'Number'}:</span> <span className="font-bold">{offer.details.offerNumber}</span>
                  </p>
                )}
                
                {offer.details.date && (
                  <p>
                    <span className="font-medium">{displayLanguage === 'bg' ? 'Дата' : 'Date'}:</span> {formatDate(offer.details.date, displayLanguage)}
                  </p>
                )}
                
                {offer.details.validUntil && (
                  <p>
                    <span className="font-medium">{displayLanguage === 'bg' ? 'Валидна до' : 'Valid until'}:</span> {formatDate(offer.details.validUntil, displayLanguage)}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <ProductsTable 
            products={offer.products} 
            showPartNumber={offer.details.showPartNumber} 
          />
          <TotalsSection 
            subtotal={calculateSubtotal()}
            vat={calculateVat()}
            vatRate={offer.details.vatRate}
            includeVat={offer.details.includeVat}
            transportCost={offer.details.transportCost}
            otherCosts={offer.details.otherCosts}
            total={calculateTotal()}
          />
          <NotesSection notes={offer.details.notes} />
          
          <div className="text-center text-sm text-muted-foreground mt-12 pt-4 border-t print-visible">
            <p>{footerText}</p>
          </div>
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
