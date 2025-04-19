
import React from 'react';
import { Offer } from '@/types/offer';
import { SupportedLanguage } from '@/types/language/base';
import { formatDate, cn } from '@/lib/utils';
import OfferActions from '../OfferActions';
import { useOffer } from '@/context/offer/OfferContext';
import { Card } from '@/components/ui/card';

interface ModernDarkTemplateProps {
  offer: Offer;
  displayLanguage: SupportedLanguage;
  settings: any;
  mode: 'edit' | 'view';
  offerContentRef: React.RefObject<HTMLDivElement>;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const ModernDarkTemplate: React.FC<ModernDarkTemplateProps> = ({
  offer,
  displayLanguage,
  settings,
  mode,
  offerContentRef,
  setIsSaveDialogOpen
}) => {
  const { calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  
  const isDraft = !offer.details.offerNumber;
  const primaryColor = settings?.appearance?.primaryColor || '#6366F1';
  const secondaryColor = settings?.appearance?.secondaryColor || '#1F2937';
  const textColor = settings?.appearance?.textColor || '#F9FAFB';
  const fontFamily = settings?.appearance?.fontFamily || 'Poppins, sans-serif';
  
  const containerStyle = {
    fontFamily,
    backgroundColor: secondaryColor,
    color: textColor,
  };
  
  const subtotal = calculateSubtotal();
  const vat = calculateVat();
  const total = calculateTotal();
  
  // Get attention text based on language
  const attentionText = displayLanguage === 'bg' ? 'на вниманието на' : 'attention to';
  
  // Use conclusion text from company data or default
  const footerText = displayLanguage === 'en' && offer.company.conclusion_text_en 
    ? offer.company.conclusion_text_en 
    : offer.company.conclusion_text || settings?.content?.footerText || (
      displayLanguage === 'bg' 
        ? 'Благодарим Ви за доверието!' 
        : 'Thank you for your business!'
    );
  
  // Bank details
  const bankDetails = settings?.footer?.bankDetails || {
    name: displayLanguage === 'bg' ? 'Банка' : 'Bank',
    iban: 'BG12EXAMPLE12345678',
    swift: 'EXAMPLESWIFT'
  };
  
  // Show bank details if enabled in settings
  const showBankDetails = settings?.footer?.showBankDetails === true;

  return (
    <>
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <div style={containerStyle} className="min-h-screen">
        {/* Header Section with Gradient */}
        <div 
          className="p-6 relative overflow-hidden"
          style={{
            background: settings?.header?.useGradient 
              ? `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` 
              : primaryColor
          }}
        >
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {settings?.layout?.showLogo && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-white">
                    {offer.company.logo_url ? (
                      <img src={offer.company.logo_url} alt={offer.company.name} className="w-14 h-14 object-contain" />
                    ) : (
                      <span className="text-xl font-bold">{offer.company.name.substring(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  {offer.company.slogan && (
                    <div className="text-xs text-center mt-1 max-w-24 text-white/80">{offer.company.slogan}</div>
                  )}
                </div>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-white">{offer.company.name}</h1>
                {settings?.header?.showCompanySlogan && offer.company.slogan && !settings?.layout?.showLogo && (
                  <p className="text-white/80 text-sm">{offer.company.slogan}</p>
                )}
              </div>
            </div>
            
            {settings?.header?.showOfferLabel && (
              <div className="flex flex-col items-end">
                <span className="bg-white/10 px-4 py-2 rounded text-white text-lg font-semibold">
                  {displayLanguage === 'bg' ? 'ОФЕРТА' : 'OFFER'}
                </span>
                {!isDraft && offer.details.offerNumber && (
                  <span className="text-white/90 mt-1">#{offer.details.offerNumber}</span>
                )}
              </div>
            )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/5 -ml-20 -mb-20"></div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 space-y-8">
          {/* Client and Offer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/10 border-0 overflow-hidden">
              <div 
                className="h-2"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-white">
                  {displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information'}
                </h3>
                <div className="space-y-2">
                  <p className="font-bold text-lg">{offer.client.name}</p>
                  {offer.client.contactPerson && (
                    <p className="text-white/80">{attentionText}: {offer.client.contactPerson}</p>
                  )}
                  {offer.client.address && (
                    <p className="text-white/80">{offer.client.address}</p>
                  )}
                  {offer.client.city && (
                    <p className="text-white/80">{offer.client.city}{offer.client.country ? `, ${offer.client.country}` : ''}</p>
                  )}
                  {offer.client.vatNumber && (
                    <p className="text-white/80">{displayLanguage === 'bg' ? 'ДДС №' : 'VAT No'}: {offer.client.vatNumber}</p>
                  )}
                </div>
              </div>
            </Card>
            
            <Card className="bg-white/10 border-0 overflow-hidden">
              <div 
                className="h-2"
                style={{ backgroundColor: primaryColor }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 text-white">
                  {displayLanguage === 'bg' ? 'Детайли на офертата' : 'Offer Details'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {!isDraft && offer.details.offerNumber && (
                    <div className="col-span-2">
                      <p className="text-white/60 text-sm">{displayLanguage === 'bg' ? 'Номер' : 'Number'}</p>
                      <p className="text-white font-bold">{offer.details.offerNumber}</p>
                    </div>
                  )}
                  
                  {offer.details.date && (
                    <div>
                      <p className="text-white/60 text-sm">{displayLanguage === 'bg' ? 'Дата' : 'Date'}</p>
                      <p className="text-white">{formatDate(offer.details.date, displayLanguage)}</p>
                    </div>
                  )}
                  
                  {offer.details.validUntil && (
                    <div>
                      <p className="text-white/60 text-sm">{displayLanguage === 'bg' ? 'Валидна до' : 'Valid until'}</p>
                      <p className="text-white">{formatDate(offer.details.validUntil, displayLanguage)}</p>
                    </div>
                  )}
                  
                  {offer.details.currency && (
                    <div>
                      <p className="text-white/60 text-sm">{displayLanguage === 'bg' ? 'Валута' : 'Currency'}</p>
                      <p className="text-white">{offer.details.currency}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Products Table */}
          <Card className="bg-white/10 border-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: primaryColor }}>
                  {settings?.content?.showLineNumbers && (
                    <th className="p-3 text-left text-white w-10">#</th>
                  )}
                  <th className="p-3 text-left text-white">{displayLanguage === 'bg' ? 'Продукт' : 'Product'}</th>
                  <th className="p-3 text-right text-white w-20">{displayLanguage === 'bg' ? 'Кол.' : 'Qty'}</th>
                  <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Цена' : 'Price'}</th>
                  <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Общо' : 'Total'}</th>
                </tr>
              </thead>
              <tbody>
                {offer.products.map((product, index) => (
                  <tr key={product.id} className={index % 2 === 0 ? 'bg-white/5' : ''}>
                    {settings?.content?.showLineNumbers && (
                      <td className="p-3 text-center text-white/60">{index + 1}</td>
                    )}
                    <td className="p-3">
                      <div className="space-y-1">
                        <p className="font-medium text-white">{product.name}</p>
                        {product.description && (
                          <p className="text-white/60 text-sm">{product.description}</p>
                        )}
                        {offer.details.showPartNumber && product.partNumber && (
                          <p className="text-white/60 text-xs">{displayLanguage === 'bg' ? 'Кат. №' : 'Part #'}: {product.partNumber}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right text-white">
                      <div className="flex flex-col items-end">
                        <span>{product.quantity}</span>
                        {product.unit && product.unit !== 'none' && (
                          <span className="text-xs text-white/60">{product.unit}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right text-white">{product.unitPrice.toFixed(2)}</td>
                    <td className="p-3 text-right text-white font-semibold">{(product.quantity * product.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          
          {/* Totals and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {offer.details.notes && (
                <Card className="bg-white/10 border-0 h-full">
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-white">
                      {displayLanguage === 'bg' ? 'Бележки' : 'Notes'}
                    </h3>
                    <div className="text-white/80 whitespace-pre-wrap">{offer.details.notes}</div>
                  </div>
                </Card>
              )}
            </div>
            
            <div>
              <Card className="bg-white/10 border-0">
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/80">{displayLanguage === 'bg' ? 'Междинна сума' : 'Subtotal'}:</span>
                    <span className="text-white">{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {offer.details.includeVat && (
                    <div className="flex justify-between">
                      <span className="text-white/80">{displayLanguage === 'bg' ? 'ДДС' : 'VAT'} ({offer.details.vatRate}%):</span>
                      <span className="text-white">{vat.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.transportCost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/80">{displayLanguage === 'bg' ? 'Транспорт' : 'Transport'}:</span>
                      <span className="text-white">{offer.details.transportCost.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.otherCosts > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/80">{displayLanguage === 'bg' ? 'Други' : 'Other'}:</span>
                      <span className="text-white">{offer.details.otherCosts.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between pt-2 border-t border-white/20 font-bold">
                    <span className="text-white">{displayLanguage === 'bg' ? 'Обща сума' : 'Total'}:</span>
                    <span className="text-white">{total.toFixed(2)} {offer.details.currency}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Footer */}
          {settings?.content?.showFooter && (
            <div className="pt-8 mt-8 border-t border-white/20 text-center">
              <p className="text-white/70">{footerText}</p>
              
              {showBankDetails && (
                <div className="mt-4 text-xs text-white/60">
                  <p className="font-medium">{displayLanguage === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
                  <p>{bankDetails.name}</p>
                  <p>IBAN: {bankDetails.iban}</p>
                  {bankDetails.swift && <p>SWIFT: {bankDetails.swift}</p>}
                </div>
              )}
              
              {settings?.footer?.showSignatureArea && (
                <div className="mt-6 flex justify-end">
                  <div className="border-t border-white/20 pt-2 w-48 text-right">
                    <p className="text-white/60">{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
                  </div>
                </div>
              )}
              
              {settings?.footer?.includeSocialMedia && (
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs">FB</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs">TW</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xs">IN</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModernDarkTemplate;
