
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
import CustomFooterText from './components/CustomFooterText';
import OfferFooter from './components/OfferFooter';

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
  const footerText = displayLanguage === 'en' 
    ? (offer.company.conclusion_text_en || settings?.content?.footerText || 'Thank you for your business!')
    : (offer.company.conclusion_text || settings?.content?.footerText || 'Благодарим Ви за доверието!');

  // Calculate total with discounts applied
  const calculateDiscountAmount = (discount: { amount: number; type: 'percentage' | 'fixed' }) => {
    if (discount.type === 'percentage') {
      return calculateTotal() * (discount.amount / 100);
    }
    return discount.amount;
  };

  return (
    <>
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <div className="p-6">
        <OfferHeader offer={offer} settings={settings} displayLanguage={displayLanguage} />
        
        {/* Client and Offer Details in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ClientInfoSection 
            client={offer.client} 
            settings={settings}
            displayLanguage={displayLanguage}
          />
          
          {/* Offer details */}
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
                <p className="font-medium">
                  {displayLanguage === 'bg' ? 'Оферта №:' : 'Offer #:'} {offer.details.offerNumber}
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
          specialDiscounts={offer.details.specialDiscounts}
          calculateDiscountAmount={calculateDiscountAmount}
        />
        
        <NotesSection 
          notes={offer.details.notes} 
          settings={settings} 
          displayLanguage={displayLanguage}
        />
        
        <CustomFooterText text={offer.details.customFooterText} />
        
        <OfferFooter 
          footerText={footerText}
          settings={settings}
          showBankDetails={settings?.footer?.showBankDetails}
          showDigitalSignature={offer.details.showDigitalSignature}
          showSignatureArea={settings?.footer?.showSignatureArea}
          displayLanguage={displayLanguage}
        />
      </div>
    </>
  );
};

export default ClassicTemplate;
