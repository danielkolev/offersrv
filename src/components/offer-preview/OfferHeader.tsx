
import React from 'react';
import { Offer } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';

interface OfferHeaderProps {
  offer: Offer;
}

const OfferHeader = ({ offer }: OfferHeaderProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-6">
        {/* Left side - Logo and slogan */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
          {offer.company.logo ? (
            <div className="mb-2">
              <img 
                src={offer.company.logo} 
                alt={offer.company.name || t.companyInfo.logo} 
                className="max-h-24 max-w-[200px] object-contain"
              />
            </div>
          ) : null}
          
          {offer.company.slogan && (
            <div className="text-sm italic text-muted-foreground mt-2">
              {offer.company.slogan}
            </div>
          )}
        </div>
        
        {/* Right side - Company info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2 text-right">
            {language === 'bg' ? 'ОФЕРТА' : 'OFFER'}
          </h1>
          
          <div className="text-sm space-y-1">
            <p className="font-medium">{offer.company.name}</p>
            {offer.company.address && (
              <p>{offer.company.address}{offer.company.city ? `, ${offer.company.city}` : ''}</p>
            )}
            {offer.company.country && <p>{offer.company.country}</p>}
            
            <div className="grid grid-cols-1 gap-1 mt-2">
              {offer.company.vatNumber && (
                <p>
                  <span className="font-medium">{language === 'bg' ? 'ДДС №:' : 'VAT No:'}:</span> {offer.company.vatNumber}
                </p>
              )}
              {offer.company.eikNumber && (
                <p>
                  <span className="font-medium">{language === 'bg' ? 'ЕИК:' : 'Company ID:'}:</span> {offer.company.eikNumber}
                </p>
              )}
              {offer.company.phone && (
                <p>
                  <span className="font-medium">{language === 'bg' ? 'Телефон:' : 'Phone:'}:</span> {offer.company.phone}
                </p>
              )}
              {offer.company.email && (
                <p>
                  <span className="font-medium">{language === 'bg' ? 'Имейл:' : 'Email:'}:</span> {offer.company.email}
                </p>
              )}
              {offer.company.website && (
                <p>
                  <span className="font-medium">{language === 'bg' ? 'Уебсайт:' : 'Website:'}:</span> {offer.company.website}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Client and offer details in a two-column layout */}
      <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
        {/* Left side - Will be replaced by ClientInfoSection */}
        <div className="flex-1">
          {/* ClientInfoSection will be rendered separately */}
        </div>
        
        {/* Right side - Offer details */}
        <div className="flex-1 mt-4 md:mt-0 md:ml-4 p-4 bg-gray-50 rounded-md">
          <h3 className="font-semibold text-lg mb-2">
            {language === 'bg' ? 'Детайли на офертата' : 'Offer Details'}
          </h3>
          
          <div className="text-sm space-y-2">
            {offer.details.offerNumber && (
              <p>
                <span className="font-medium">{language === 'bg' ? 'Номер:' : 'Number:'}</span> {offer.details.offerNumber}
              </p>
            )}
            
            {offer.details.date && (
              <p>
                <span className="font-medium">{language === 'bg' ? 'Дата:' : 'Date:'}</span> {formatDate(offer.details.date, language)}
              </p>
            )}
            
            {offer.details.validUntil && (
              <p>
                <span className="font-medium">{language === 'bg' ? 'Валидна до:' : 'Valid until:'}</span> {formatDate(offer.details.validUntil, language)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferHeader;
