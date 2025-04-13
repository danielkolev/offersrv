
import React from 'react';
import { Offer } from '@/types/offer';
import { SupportedLanguage } from '@/types/language/base';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

// Import components
import OfferHeader from '../OfferHeader';
import ClientInfoSection from '../ClientInfoSection';
import ProductsTable from '../ProductsTable';
import TotalsSection from '../TotalsSection';
import NotesSection from '../NotesSection';
import OfferActions from '../OfferActions';
import { useOffer } from '@/context/offer/OfferContext';

interface ClassicTemplateProps {
  offer: Offer;
  displayLanguage: SupportedLanguage;
  settings: any;
  mode: 'edit' | 'view';
  offerContentRef: React.RefObject<HTMLDivElement>;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({
  offer,
  displayLanguage,
  settings,
  mode,
  offerContentRef,
  setIsSaveDialogOpen
}) => {
  const { calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  
  // Check if it's a draft (no offer number)
  const isDraft = !offer.details.offerNumber;

  // Get footer text based on offer language
  const footerText = settings?.content?.footerText || (
    displayLanguage === 'bg' 
      ? 'Благодарим Ви за доверието!' 
      : 'Thank you for your business!'
  );

  return (
    <>
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <div className="p-6">
        <OfferHeader offer={offer} settings={settings} />
        
        {/* Client and Offer Details in two columns on the same level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left column: Client info */}
          <ClientInfoSection 
            client={offer.client} 
            settings={settings}
          />
          
          {/* Right column: Offer details */}
          <div className={cn(
            "rounded-md p-3",
            settings?.appearance?.secondaryColor ? "" : "bg-gray-50"
          )}
          style={{ 
            backgroundColor: settings?.appearance?.secondaryColor || ""
          }}>
            <h3 className={cn(
              "text-base font-semibold mb-2",
              settings?.appearance?.primaryColor ? "" : "text-offer-blue"
            )}
            style={{ 
              color: settings?.appearance?.primaryColor || ""
            }}>
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
          displayLanguage={displayLanguage}
          settings={settings}
        />
        
        <TotalsSection 
          subtotal={calculateSubtotal()}
          vat={calculateVat()}
          vatRate={offer.details.vatRate}
          includeVat={offer.details.includeVat}
          transportCost={offer.details.transportCost}
          otherCosts={offer.details.otherCosts}
          total={calculateTotal()}
          language={displayLanguage}
          settings={settings}
        />
        
        <NotesSection notes={offer.details.notes} settings={settings} />
        
        {settings?.content?.showFooter && (
          <div className={cn(
            "text-center text-sm text-muted-foreground mt-12 pt-4 border-t print-visible",
            settings?.layout?.compactMode ? "text-xs" : ""
          )}
          style={{ 
            borderColor: settings?.appearance?.primaryColor || ""
          }}>
            <p>{footerText}</p>
            
            {settings?.footer?.showBankDetails && (
              <div className="mt-2">
                <p>{displayLanguage === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
                <p>IBAN: BG12EXAMPLE12345678</p>
              </div>
            )}
            
            {settings?.footer?.showSignatureArea && (
              <div className="mt-4 flex justify-end">
                <div className="border-t pt-2 w-48 text-right">
                  <p>{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ClassicTemplate;
