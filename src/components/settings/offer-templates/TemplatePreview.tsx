
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { SupportedLanguage } from '@/types/language/base';
import { TemplateSettingsFormValues } from './TemplateSettings';
import { cn } from '@/lib/utils';

interface TemplatePreviewProps {
  settings: TemplateSettingsFormValues;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ settings }) => {
  const { language, t } = useLanguage();
  const currentLanguage = language as SupportedLanguage;
  
  // Sample data for preview
  const sampleProducts = [
    {
      id: '1',
      name: language === 'bg' ? 'Примерен продукт 1' : 'Sample Product 1',
      description: language === 'bg' ? 'Описание на продукта' : 'Product description',
      partNumber: 'ABC123',
      quantity: 2,
      unitPrice: 100,
      unit: 'pcs'
    },
    {
      id: '2',
      name: language === 'bg' ? 'Примерен продукт 2' : 'Sample Product 2', 
      description: '',
      partNumber: 'DEF456',
      quantity: 1,
      unitPrice: 200,
      unit: 'pcs'
    }
  ];
  
  const borderRadius = settings.appearance.roundedCorners ? 'rounded-lg' : '';
  const pricesStyle = settings.content.boldPrices ? 'font-bold' : '';
  
  const subtotal = 400;
  const vatRate = 20;
  const vat = subtotal * (vatRate / 100);
  const total = subtotal + vat;
  
  const getFontSizeClass = () => {
    switch(settings.appearance.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };
  
  return (
    <Card className="shadow-md overflow-hidden">
      <CardContent className="p-0">
        <div 
          className={cn(
            "p-4 transition-all", 
            getFontSizeClass(), 
            borderRadius
          )}
          style={{ 
            fontFamily: settings.appearance.fontFamily,
            borderColor: settings.appearance.primaryColor
          }}
        >
          {/* Header preview */}
          <div 
            className={cn("flex justify-between items-center pb-4 mb-4 border-b")}
            style={{ borderColor: settings.appearance.primaryColor }}
          >
            <div className="flex items-center gap-2">
              {settings.layout.showLogo && (
                <div 
                  className={cn(
                    "w-12 h-12 flex items-center justify-center",
                    borderRadius
                  )}
                  style={{ 
                    backgroundColor: settings.appearance.primaryColor,
                    color: settings.appearance.textColor
                  }}
                >
                  {language === 'bg' ? 'ЛОГО' : 'LOGO'}
                </div>
              )}
              <div>
                <h1 
                  className={cn(
                    "font-bold",
                    settings.header.companyNameSize === 'small' ? 'text-lg' : 
                    settings.header.companyNameSize === 'large' ? 'text-2xl' : 'text-xl'
                  )}
                  style={{ color: settings.appearance.primaryColor }}
                >
                  {language === 'bg' ? 'Име на компанията' : 'Company Name'}
                </h1>
                {settings.header.showCompanySlogan && (
                  <p className="text-gray-600">
                    {language === 'bg' ? 'Слоган на компанията' : 'Company Slogan'}
                  </p>
                )}
              </div>
            </div>
            
            {settings.header.showOfferLabel && (
              <div 
                className={cn("px-4 py-2", borderRadius)}
                style={{ 
                  backgroundColor: settings.appearance.primaryColor,
                  color: settings.appearance.textColor
                }}
              >
                {language === 'bg' ? 'ОФЕРТА' : 'OFFER'}
              </div>
            )}
          </div>
          
          {/* Content preview */}
          <div className={cn("space-y-4", settings.layout.compactMode ? 'mb-2' : 'mb-6')}>
            <div 
              className={cn("p-3", borderRadius)}
              style={{ backgroundColor: settings.appearance.secondaryColor }}
            >
              <h2 className="font-bold mb-2">{language === 'bg' ? 'Информация за клиента' : 'Client Information'}</h2>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-600">{language === 'bg' ? 'Име' : 'Name'}:</p>
                  <p>{language === 'bg' ? 'Примерен клиент' : 'Example Client'}</p>
                </div>
                <div>
                  <p className="text-gray-600">{language === 'bg' ? 'Адрес' : 'Address'}:</p>
                  <p>{language === 'bg' ? 'гр. София' : 'Sofia'}</p>
                </div>
              </div>
            </div>
            
            {/* Products table preview */}
            <div className="w-full overflow-hidden rounded-md border">
              <table className="w-full">
                <thead>
                  <tr 
                    style={{ 
                      backgroundColor: settings.appearance.primaryColor,
                      color: settings.appearance.textColor 
                    }}
                  >
                    <th className="p-2 text-left">{language === 'bg' ? 'Артикул' : 'Item'}</th>
                    <th className="p-2 text-right">{language === 'bg' ? 'К-во' : 'Qty'}</th>
                    <th className="p-2 text-right">{language === 'bg' ? 'Ед. цена' : 'Unit Price'}</th>
                    <th className="p-2 text-right">{language === 'bg' ? 'Общо' : 'Total'}</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleProducts.map((product, index) => (
                    <tr key={product.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="p-2">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          {product.description && (
                            <p className="text-sm text-gray-500">{product.description}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-2 text-right">{product.quantity}</td>
                      <td className="p-2 text-right">
                        <span className={settings.content.boldPrices ? 'font-bold' : ''}>
                          {product.unitPrice.toFixed(2)}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <span className={settings.content.boldPrices ? 'font-bold' : ''}>
                          {(product.quantity * product.unitPrice).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Totals preview */}
            <div className="flex justify-end">
              <div className="w-1/3 space-y-1">
                <div className="flex justify-between">
                  <span>{language === 'bg' ? 'Междинна сума' : 'Subtotal'}:</span>
                  <span>{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{language === 'bg' ? 'ДДС' : 'VAT'} (20%):</span>
                  <span>{vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-1 mt-1">
                  <span>{language === 'bg' ? 'Обща сума' : 'Total'}:</span>
                  <span>{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer preview */}
          {settings.content.showFooter && (
            <div 
              className={cn("mt-4 pt-4 border-t text-center", 
                settings.layout.compactMode ? 'text-sm' : ''
              )}
              style={{ borderColor: settings.appearance.primaryColor }}
            >
              <p className="text-gray-600">{settings.content.footerText}</p>
              
              {settings.footer.showBankDetails && (
                <div className="mt-2 text-gray-600">
                  <p>{language === 'bg' ? 'Банкова информация' : 'Bank Information'}</p>
                  <p>IBAN: BG12EXAMPLE12345678</p>
                </div>
              )}
              
              {settings.footer.showSignatureArea && (
                <div className="mt-4 flex justify-end">
                  <div className="border-t pt-2 w-48 text-right">
                    <p className="text-gray-600">{settings.footer.signatureText}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatePreview;
