
import React from 'react';
import { Offer } from '@/types/offer';
import { SupportedLanguage } from '@/types/language/base';
import { formatDate, cn } from '@/lib/utils';
import OfferActions from '../OfferActions';
import { useOffer } from '@/context/offer/OfferContext';
import { Card } from '@/components/ui/card';

interface GradientTemplateProps {
  offer: Offer;
  displayLanguage: SupportedLanguage;
  settings: any;
  mode: 'edit' | 'view';
  offerContentRef: React.RefObject<HTMLDivElement>;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const GradientTemplate: React.FC<GradientTemplateProps> = ({
  offer,
  displayLanguage,
  settings,
  mode,
  offerContentRef,
  setIsSaveDialogOpen
}) => {
  const { calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  
  const isDraft = !offer.details.offerNumber;
  const primaryColor = settings?.appearance?.primaryColor || '#EC4899';
  const secondaryColor = settings?.appearance?.secondaryColor || '#F9FAFB';
  const textColor = settings?.appearance?.textColor || '#ffffff';
  const fontFamily = settings?.appearance?.fontFamily || 'Montserrat, sans-serif';
  const gradient = settings?.appearance?.gradient || 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)';
  
  const containerStyle = {
    fontFamily,
    backgroundColor: secondaryColor,
    color: '#374151', // Default text color for content
  };
  
  const subtotal = calculateSubtotal();
  const vat = calculateVat();
  const total = calculateTotal();

  return (
    <>
      <OfferActions 
        offerContentRef={offerContentRef}
        setIsSaveDialogOpen={setIsSaveDialogOpen}
        mode={mode}
      />
      
      <div style={containerStyle} className="overflow-hidden">
        {/* Floating Header */}
        <div 
          className={cn(
            "p-6 relative overflow-hidden",
            settings?.layout?.floatingHeader ? "mx-6 mt-6 rounded-xl shadow-lg" : ""
          )}
          style={{
            background: gradient,
            color: textColor,
          }}
        >
          <div className="relative z-10 flex justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {settings?.layout?.showLogo && (
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  {offer.company.logo ? (
                    <img src={offer.company.logo} alt={offer.company.name} className="w-12 h-12 object-contain" />
                  ) : (
                    <span className="text-xl font-bold">{offer.company.name.substring(0, 2).toUpperCase()}</span>
                  )}
                </div>
              )}
              
              <div>
                <h1 className={cn(
                  "font-bold",
                  settings?.header?.companyNameSize === 'small' ? 'text-xl' : 
                  settings?.header?.companyNameSize === 'large' ? 'text-3xl' : 'text-2xl'
                )}>{offer.company.name}</h1>
                {settings?.header?.showCompanySlogan && offer.company.slogan && (
                  <p className="text-white/80">{offer.company.slogan}</p>
                )}
              </div>
            </div>
            
            {settings?.header?.showOfferLabel && (
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg inline-block">
                  <span className="text-lg font-semibold block">
                    {displayLanguage === 'bg' ? 'ОФЕРТА' : 'OFFER'}
                  </span>
                  {!isDraft && offer.details.offerNumber && (
                    <span className="text-sm">#{offer.details.offerNumber}</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-16 right-0 w-64 h-64 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
        </div>
        
        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Client and Offer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden shadow-md border-0">
              <div 
                className="h-2"
                style={{ background: gradient }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold mb-3 text-gray-700">
                  {displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information'}
                </h3>
                <div className="space-y-2">
                  <p className="font-bold text-lg text-gray-800">{offer.client.name}</p>
                  {offer.client.contactPerson && (
                    <p className="text-gray-600">{displayLanguage === 'bg' ? 'Лице за контакт' : 'Contact'}: {offer.client.contactPerson}</p>
                  )}
                  {offer.client.address && (
                    <p className="text-gray-600">{offer.client.address}</p>
                  )}
                  {offer.client.city && (
                    <p className="text-gray-600">{offer.client.city}{offer.client.country ? `, ${offer.client.country}` : ''}</p>
                  )}
                  {offer.client.vatNumber && (
                    <p className="text-gray-600">{displayLanguage === 'bg' ? 'ДДС №' : 'VAT No'}: {offer.client.vatNumber}</p>
                  )}
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden shadow-md border-0">
              <div 
                className="h-2"
                style={{ background: gradient }}
              ></div>
              <div className="p-4">
                <h3 className="font-semibold mb-3 text-gray-700">
                  {displayLanguage === 'bg' ? 'Детайли на офертата' : 'Offer Details'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {offer.details.date && (
                    <div>
                      <p className="text-gray-500 text-sm">{displayLanguage === 'bg' ? 'Дата' : 'Date'}</p>
                      <p className="text-gray-700 font-medium">{formatDate(offer.details.date, displayLanguage)}</p>
                    </div>
                  )}
                  
                  {offer.details.validUntil && (
                    <div>
                      <p className="text-gray-500 text-sm">{displayLanguage === 'bg' ? 'Валидна до' : 'Valid until'}</p>
                      <p className="text-gray-700 font-medium">{formatDate(offer.details.validUntil, displayLanguage)}</p>
                    </div>
                  )}
                  
                  {offer.details.currency && (
                    <div>
                      <p className="text-gray-500 text-sm">{displayLanguage === 'bg' ? 'Валута' : 'Currency'}</p>
                      <p className="text-gray-700 font-medium">{offer.details.currency}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          {/* Products Table */}
          <Card className="overflow-hidden shadow-md border-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: gradient }}>
                    <th className="p-3 text-left text-white">{displayLanguage === 'bg' ? 'Продукт' : 'Product'}</th>
                    <th className="p-3 text-right text-white w-20">{displayLanguage === 'bg' ? 'Кол.' : 'Qty'}</th>
                    <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Цена' : 'Price'}</th>
                    <th className="p-3 text-right text-white w-32">{displayLanguage === 'bg' ? 'Общо' : 'Total'}</th>
                  </tr>
                </thead>
                <tbody>
                  {offer.products.map((product, index) => (
                    <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3">
                        <div className="space-y-1">
                          <p className="font-medium text-gray-800">{product.name}</p>
                          {product.description && (
                            <p className="text-gray-500 text-sm">{product.description}</p>
                          )}
                          {offer.details.showPartNumber && product.partNumber && (
                            <p className="text-gray-400 text-xs">{displayLanguage === 'bg' ? 'Кат. №' : 'Part #'}: {product.partNumber}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-right text-gray-700">{product.quantity}{product.unit ? ` ${product.unit}` : ''}</td>
                      <td className="p-3 text-right text-gray-700">{product.unitPrice.toFixed(2)}</td>
                      <td className="p-3 text-right font-medium text-gray-800">{(product.quantity * product.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          
          {/* Totals and Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offer.details.notes && (
              <div className="md:col-span-2">
                <Card className="overflow-hidden shadow-md h-full border-0">
                  <div 
                    className="h-2"
                    style={{ background: gradient }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 text-gray-700">
                      {displayLanguage === 'bg' ? 'Бележки' : 'Notes'}
                    </h3>
                    <div className="text-gray-600 whitespace-pre-wrap">{offer.details.notes}</div>
                  </div>
                </Card>
              </div>
            )}
            
            <div className={!offer.details.notes ? "md:col-span-3 md:w-1/3 md:ml-auto" : ""}>
              <Card className="overflow-hidden shadow-md border-0">
                <div 
                  className="h-2"
                  style={{ background: gradient }}
                ></div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>{displayLanguage === 'bg' ? 'Междинна сума' : 'Subtotal'}:</span>
                    <span>{subtotal.toFixed(2)}</span>
                  </div>
                  
                  {offer.details.includeVat && (
                    <div className="flex justify-between text-gray-600">
                      <span>{displayLanguage === 'bg' ? 'ДДС' : 'VAT'} ({offer.details.vatRate}%):</span>
                      <span>{vat.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.transportCost > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>{displayLanguage === 'bg' ? 'Транспорт' : 'Transport'}:</span>
                      <span>{offer.details.transportCost.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {offer.details.otherCosts > 0 && (
                    <div className="flex justify-between text-gray-600">
                      <span>{displayLanguage === 'bg' ? 'Други' : 'Other'}:</span>
                      <span>{offer.details.otherCosts.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div 
                    className={cn(
                      "flex justify-between pt-2 border-t font-bold mt-2",
                      settings?.content?.highlightTotals ? "bg-gradient-to-r from-transparent to-gray-100 p-2 -mx-2 rounded" : ""
                    )}
                    style={{ borderColor: primaryColor }}
                  >
                    <span className="text-gray-800">{displayLanguage === 'bg' ? 'Обща сума' : 'Total'}:</span>
                    <span 
                      className="text-transparent bg-clip-text"
                      style={{ backgroundImage: gradient }}
                    >{total.toFixed(2)} {offer.details.currency}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Footer */}
          {settings?.content?.showFooter && (
            <div className="pt-6 mt-8 border-t text-center" style={{ borderColor: `${primaryColor}20` }}>
              <p className="text-gray-500">{settings?.content?.footerText || (displayLanguage === 'bg' ? 'Благодарим Ви за доверието!' : 'Thank you for your business!')}</p>
              
              {settings?.footer?.showBankDetails && (
                <div className="mt-4 text-sm text-gray-500">
                  <p>{displayLanguage === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
                  <p>IBAN: BG12EXAMPLE12345678</p>
                </div>
              )}
              
              {settings?.footer?.showSignatureArea && (
                <div className="mt-6 flex justify-end">
                  <div className="border-t pt-2 w-48 text-right" style={{ borderColor: `${primaryColor}40` }}>
                    <p className="text-gray-500">{settings?.footer?.signatureText || (displayLanguage === 'bg' ? 'Подпис и печат:' : 'Signature and stamp:')}</p>
                  </div>
                </div>
              )}
              
              {settings?.footer?.includeSocialMedia && (
                <div className="flex justify-center gap-4 mt-6">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}20` }}>
                    <span className="text-xs" style={{ color: primaryColor }}>FB</span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}20` }}>
                    <span className="text-xs" style={{ color: primaryColor }}>TW</span>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${primaryColor}20` }}>
                    <span className="text-xs" style={{ color: primaryColor }}>IN</span>
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

export default GradientTemplate;
