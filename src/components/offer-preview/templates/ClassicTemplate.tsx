
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
  const footerText = displayLanguage === 'en' 
    ? (offer.company.conclusion_text_en || settings?.content?.footerText || 'Thank you for your business!')
    : (offer.company.conclusion_text || settings?.content?.footerText || 'Благодарим Ви за доверието!');

  // Calculate total with discounts applied
  const calculateDiscountedTotal = () => {
    let total = calculateTotal();
    
    // Apply special discounts if any exist
    if (offer.details.specialDiscounts && offer.details.specialDiscounts.length > 0) {
      offer.details.specialDiscounts.forEach(discount => {
        if (discount.type === 'percentage') {
          // Apply percentage discount
          total -= total * (discount.amount / 100);
        } else {
          // Apply fixed discount
          total -= discount.amount;
        }
      });
    }
    
    return total;
  };
  
  const discountedTotal = calculateDiscountedTotal();
  const hasDiscounts = offer.details.specialDiscounts && offer.details.specialDiscounts.length > 0;

  return (
    <>
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <div className="p-6">
        <OfferHeader offer={offer} settings={settings} displayLanguage={displayLanguage} />
        
        {/* Client and Offer Details in two columns on the same level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Left column: Client info */}
          <ClientInfoSection 
            client={offer.client} 
            settings={settings}
            displayLanguage={displayLanguage}
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
              {/* Offer number moved here instead of being placed separately */}
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
        />
        
        {/* Special Discounts Section */}
        {hasDiscounts && (
          <div className="mb-6 print-visible">
            <h3 className={cn(
              "font-medium mb-2",
              settings?.appearance?.primaryColor ? "" : ""
            )}
            style={{ 
              color: settings?.appearance?.primaryColor || ""
            }}>
              {displayLanguage === 'bg' ? 'Специални отстъпки' : 'Special Discounts'}
            </h3>
            <div className={cn(
              "border rounded-md p-4 text-sm",
              settings?.appearance?.secondaryColor ? "" : "bg-offer-lightgray"
            )}
            style={{ 
              backgroundColor: settings?.appearance?.secondaryColor || ""
            }}>
              <div className="space-y-2">
                {offer.details.specialDiscounts?.map((discount, index) => (
                  <div key={index} className="flex justify-between">
                    <span>
                      {discount.description}: {discount.amount} {discount.type === 'percentage' ? '%' : offer.details.currency}
                    </span>
                    <span className="font-medium">
                      -{discount.type === 'percentage' 
                        ? (calculateTotal() * (discount.amount / 100)).toFixed(2)
                        : discount.amount.toFixed(2)
                      } {offer.details.currency}
                    </span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>{displayLanguage === 'bg' ? 'Крайна сума след отстъпки' : 'Final amount after discounts'}:</span>
                  <span>{discountedTotal.toFixed(2)} {offer.details.currency}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <NotesSection notes={offer.details.notes} settings={settings} />
        
        {/* Custom Footer Text */}
        {offer.details.customFooterText && (
          <div className="mb-6 print-visible border-t pt-4 mt-4">
            <div className="whitespace-pre-line text-sm text-gray-700">
              {offer.details.customFooterText}
            </div>
          </div>
        )}
        
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
          
          {/* Digital Signature Area */}
          {offer.details.showDigitalSignature && (
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
          
          {settings?.footer?.showSignatureArea && !offer.details.showDigitalSignature && (
            <div className="mt-4 flex justify-end">
              <div className="border-t pt-2 w-48 text-right">
                <p>{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClassicTemplate;
