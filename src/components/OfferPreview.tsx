
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

interface OfferPreviewProps {
  isSaveDialogOpen?: boolean;
  setIsSaveDialogOpen?: (isOpen: boolean) => void;
  mode?: 'edit' | 'view';
}

const OfferPreview = ({ 
  isSaveDialogOpen: externalIsSaveDialogOpen, 
  setIsSaveDialogOpen: externalSetIsSaveDialogOpen,
  mode = 'edit'
}: OfferPreviewProps = {}) => {
  const { offer, calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  const offerContentRef = useRef<HTMLDivElement>(null);
  
  // Use either external or internal state based on what's provided
  const [internalIsSaveDialogOpen, setInternalIsSaveDialogOpen] = React.useState(false);
  
  const isSaveDialogOpen = externalIsSaveDialogOpen !== undefined 
    ? externalIsSaveDialogOpen 
    : internalIsSaveDialogOpen;
    
  const setIsSaveDialogOpen = externalSetIsSaveDialogOpen || setInternalIsSaveDialogOpen;

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
          <ClientInfoSection client={offer.client} />
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
            <p>{offer.details.offerLanguage === 'bg' ? 'Благодарим Ви за доверието!' : 'Thank you for your business!'}</p>
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
