import React from 'react';
import { Offer } from '@/types/offer';
import { SupportedLanguage } from '@/types/language/base';
import { formatDate, cn } from '@/lib/utils';
import OfferActions from '../OfferActions';
import { useOffer } from '@/context/offer/OfferContext';

interface BusinessProTemplateProps {
  offer: Offer;
  displayLanguage: SupportedLanguage;
  settings: any;
  mode: 'edit' | 'view';
  offerContentRef: React.RefObject<HTMLDivElement>;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const BusinessProTemplate: React.FC<BusinessProTemplateProps> = ({
  offer,
  displayLanguage,
  settings,
  mode,
  offerContentRef,
  setIsSaveDialogOpen
}) => {
  const { calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  
  const isDraft = !offer.details.offerNumber;
  const primaryColor = settings?.appearance?.primaryColor || '#0891B2';
  const secondaryColor = settings?.appearance?.secondaryColor || '#F0F9FF';
  const textColor = settings?.appearance?.textColor || '#ffffff';
  const fontFamily = settings?.appearance?.fontFamily || 'DM Sans, sans-serif';
  
  const containerStyle = {
    fontFamily,
    color: '#333333',
  };
  
  const subtotal = calculateSubtotal();
  const vat = calculateVat();
  const total = calculateTotal();

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
      
      <div style={containerStyle} className="bg-white">
        {/* Header Section */}
        <div 
          className={cn(
            "p-6 flex justify-between items-center bg-white",
            settings?.header?.shadow ? "shadow-md" : "",
            settings?.layout?.borderless ? "" : "border-b"
          )}
          style={{ borderColor: settings?.layout?.borderless ? "" : `${primaryColor}40` }}
        >
          <div className={cn(
            "flex items-center gap-6", 
            settings?.layout?.logoPosition === 'center' ? "mx-auto" : "",
            settings?.layout?.logoPosition === 'right' ? "ml-auto" : ""
          )}>
            {settings?.layout?.showLogo && (
              <div 
                className="flex items-center justify-center"
                style={{ color: primaryColor }}
              >
                {offer.company.logo_url ? (
                  <img src={offer.company.logo_url} alt={offer.company.name} className="h-14 w-auto object-contain" />
                ) : (
                  <div className="w-14 h-14 rounded-md border flex items-center justify-center" style={{ borderColor: primaryColor }}>
                    <span className="text-xl font-bold">{offer.company.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className={settings?.layout?.logoPosition === 'center' ? "text-center" : ""}>
              <h1 
                className={cn(
                  "font-bold",
                  settings?.header?.companyNameSize === 'small' ? 'text-xl' : 
                  settings?.header?.companyNameSize === 'large' ? 'text-3xl' : 'text-2xl'
                )}
                style={{ color: '#333333' }}
              >{offer.company.name}</h1>
              {settings?.header?.showCompanySlogan && offer.company.slogan && (
                <p className="text-gray-500 mt-1">{offer.company.slogan}</p>
              )}
            </div>
          </div>
          
          {settings?.header?.showOfferLabel && (
            <div 
              className={cn(
                "px-5 py-2 rounded",
                settings?.layout?.logoPosition === 'center' ? "absolute right-6" : ""
              )}
              style={{ 
                backgroundColor: primaryColor,
                color: textColor
              }}
            >
              <div className="text-center">
                <span className="font-semibold text-lg block">
                  {displayLanguage === 'bg' ? 'ОФЕРТА' : 'OFFER'}
                </span>
                {!isDraft && offer.details.offerNumber && (
                  <span className="text-sm block">{offer.details.offerNumber}</span>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="p-6 space-y-8" style={{ backgroundColor: secondaryColor }}>
          {/* Client and Offer Details */}
          <div 
            className={cn(
              "grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded",
              settings?.header?.shadow ? "shadow-md" : "",
              settings?.layout?.borderless ? "" : "border"
            )}
            style={{ borderColor: settings?.layout?.borderless ? "" : '#e5e7eb' }}
          >
            <div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: primaryColor }}
              >
                {displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information'}
              </h3>
              <div className="space-y-1">
                <p className="font-bold text-lg">{offer.client.name}</p>
                {offer.client.contactPerson && (
                  <p className="text-gray-700">{displayLanguage === 'bg' ? 'Лице за контакт' : 'Contact'}: {offer.client.contactPerson}</p>
                )}
                {offer.client.address && (
                  <p className="text-gray-700">{offer.client.address}</p>
                )}
                {offer.client.city && (
                  <p className="text-gray-700">{offer.client.city}{offer.client.country ? `, ${offer.client.country}` : ''}</p>
                )}
                {offer.client.vatNumber && (
                  <p className="text-gray-700">{displayLanguage === 'bg' ? 'ДДС №' : 'VAT No'}: {offer.client.vatNumber}</p>
                )}
              </div>
            </div>
            
            <div>
              <h3 
                className="text-lg font-semibold mb-3"
                style={{ color: primaryColor }}
              >
                {displayLanguage === 'bg' ? 'Детайли на офертата' : 'Offer Details'}
              </h3>
              <table className="w-full text-sm">
                <tbody>
                  {offer.details.date && (
                    <tr>
                      <td className="py-1 font-medium text-gray-600 pr-4">{displayLanguage === 'bg' ? 'Дата' : 'Date'}:</td>
                      <td className="py-1">{formatDate(offer.details.date, displayLanguage)}</td>
                    </tr>
                  )}
                  
                  {offer.details.validUntil && (
                    <tr>
                      <td className="py-1 font-medium text-gray-600 pr-4">{displayLanguage === 'bg' ? 'Валидна до' : 'Valid until'}:</td>
                      <td className="py-1">{formatDate(offer.details.validUntil, displayLanguage)}</td>
                    </tr>
                  )}
                  
                  {offer.details.currency && (
                    <tr>
                      <td className="py-1 font-medium text-gray-600 pr-4">{displayLanguage === 'bg' ? 'Валута' : 'Currency'}:</td>
                      <td className="py-1">{offer.details.currency}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Products Table */}
          <div 
            className={cn(
              "bg-white rounded overflow-x-auto",
              settings?.header?.shadow ? "shadow-md" : "",
              settings?.layout?.borderless ? "" : "border"
            )}
            style={{ borderColor: settings?.layout?.borderless ? "" : '#e5e7eb' }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: primaryColor }}>
                  {settings?.content?.showLineNumbers && (
                    <th className="p-3 text-left text-white w-10">#</th>
                  )}
                  <th className="p-3 text-left text-white">{displayLanguage === 'bg' ? 'Продукт' : 'Product'}</th>
                  <th className="p-3 text-right text-white w-20">{displayLanguage === 'bg' ? 'Кол.' : 'Qty'}</th>
                  <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Ед. цена' : 'Unit Price'}</th>
                  <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Общо' : 'Total'}</th>
                </tr>
              </thead>
              <tbody>
                {offer.products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className={settings?.content?.alternateRowColors 
                      ? (index % 2 === 0 ? 'bg-white' : 'bg-gray-50') 
                      : 'bg-white'
                    }
                  >
                    {settings?.content?.showLineNumbers && (
                      <td className="p-3 text-center text-gray-500">{index + 1}</td>
                    )}
                    <td className="p-3">
                      <div className="space-y-1">
                        <p className="font-medium">{product.name}</p>
                        {product.description && (
                          <p className="text-gray-500 text-sm">{product.description}</p>
                        )}
                        {offer.details.showPartNumber && product.partNumber && (
                          <p className="text-gray-400 text-xs">{displayLanguage === 'bg' ? 'Кат. №' : 'Part #'}: {product.partNumber}</p>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right">{product.quantity}{product.unit ? ` ${product.unit}` : ''}</td>
                    <td className="p-3 text-right">{product.unitPrice.toFixed(2)}</td>
                    <td className="p-3 text-right font-semibold">{(product.quantity * product.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Totals and Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notes Section */}
            {offer.details.notes && (
              <div className="md:col-span-2">
                <div 
                  className={cn(
                    "bg-white p-5 rounded",
                    settings?.header?.shadow ? "shadow-md" : "",
                    settings?.layout?.borderless ? "" : "border"
                  )}
                  style={{ borderColor: settings?.layout?.borderless ? "" : '#e5e7eb' }}
                >
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: primaryColor }}
                  >
                    {displayLanguage === 'bg' ? 'Бележки' : 'Notes'}
                  </h3>
                  <div className="text-gray-700 whitespace-pre-wrap">{offer.details.notes}</div>
                </div>
              </div>
            )}
            
            {/* Totals Section */}
            <div className={!offer.details.notes ? "md:col-span-3 md:w-1/3 md:ml-auto" : ""}>
              <div 
                className={cn(
                  "bg-white p-5 rounded",
                  settings?.header?.shadow ? "shadow-md" : "",
                  settings?.layout?.borderless ? "" : "border"
                )}
                style={{ borderColor: settings?.layout?.borderless ? "" : '#e5e7eb' }}
              >
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ color: primaryColor }}
                >
                  {displayLanguage === 'bg' ? 'Общо' : 'Summary'}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>{displayLanguage === 'bg' ? 'Междинна сума' : 'Subtotal'}:</span>
                    <span>{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {offer.details.includeVat && (
                    <div className="flex justify-between text-gray-700">
                      <span>{displayLanguage === 'bg' ? 'ДДС' : 'VAT'} ({offer.details.vatRate}%):</span>
                      <span>{vat.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.transportCost > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>{displayLanguage === 'bg' ? 'Транспорт' : 'Transport'}:</span>
                      <span>{offer.details.transportCost.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.otherCosts > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>{displayLanguage === 'bg' ? 'Други' : 'Other'}:</span>
                      <span>{offer.details.otherCosts.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 mt-2 border-t flex justify-between font-bold" style={{ borderColor: '#e5e7eb' }}>
                    <span>{displayLanguage === 'bg' ? 'Обща сума' : 'Total'}:</span>
                    <span style={{ color: primaryColor }}>{total.toFixed(2)} {offer.details.currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          {settings?.content?.showFooter && (
            <div 
              className={cn(
                "mt-8 py-6 px-6 bg-white rounded",
                settings?.header?.shadow ? "shadow-md" : "",
                settings?.layout?.borderless ? "" : "border"
              )}
              style={{ borderColor: settings?.layout?.borderless ? "" : '#e5e7eb' }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <p className="text-gray-600">{footerText}</p>
                  
                  {showBankDetails && (
                    <div className="mt-2 text-sm text-gray-500">
                      <p>{displayLanguage === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
                      <p>IBAN: {bankDetails.iban}</p>
                      {bankDetails.swift && <p>SWIFT: {bankDetails.swift}</p>}
                    </div>
                  )}
                </div>
                
                {settings?.footer?.showSignatureArea && (
                  <div className="text-center md:text-right">
                    <div className="border-t pt-2 inline-block w-48" style={{ borderColor: '#e5e7eb' }}>
                      <p className="text-gray-500">{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
                    </div>
                  </div>
                )}
                
                {settings?.footer?.useQRCode && (
                  <div className="mt-4 md:mt-0">
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded">
                      <span className="text-xs text-gray-500">QR Code</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BusinessProTemplate;
