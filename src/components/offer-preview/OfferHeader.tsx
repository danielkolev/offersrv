
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
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {language === 'bg' ? 'ОФЕРТА' : 'OFFER'}
          </h1>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-medium">{language === 'bg' ? 'Номер' : 'Number'}:</span> {offer.details.offerNumber || '-'}
            </p>
            <p>
              <span className="font-medium">{language === 'bg' ? 'Дата' : 'Date'}:</span> {formatDate(offer.details.date, language)}
            </p>
            {offer.details.validUntil && (
              <p>
                <span className="font-medium">{language === 'bg' ? 'Валидна до' : 'Valid until'}:</span> {formatDate(offer.details.validUntil, language)}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0 mt-4 sm:mt-0">
          {offer.company.logo ? (
            <div className="h-20 max-w-[200px]">
              <img 
                src={offer.company.logo} 
                alt={offer.company.name || t.companyInfo.logo} 
                className="h-full object-contain"
              />
            </div>
          ) : offer.company.name ? (
            <div className="text-xl font-bold">{offer.company.name}</div>
          ) : null}
        </div>
      </div>
      
      <div className="border-b pb-4 mb-4">
        <div className="text-sm space-y-1">
          <h3 className="font-semibold text-lg mb-2">
            {language === 'bg' ? 'Данни за фирмата' : 'Company Details'}
          </h3>
          <p className="font-medium">{offer.company.name}</p>
          {offer.company.address && (
            <p>{offer.company.address}{offer.company.city ? `, ${offer.company.city}` : ''}</p>
          )}
          {offer.company.country && <p>{offer.company.country}</p>}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-2">
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
  );
};

export default OfferHeader;
