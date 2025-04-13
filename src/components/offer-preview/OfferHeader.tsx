
import React from 'react';
import { Offer } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';

interface OfferHeaderProps {
  offer: Offer;
}

const OfferHeader: React.FC<OfferHeaderProps> = ({ offer }) => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
      <div className="flex-1">
        {offer.company.logo && (
          <img 
            src={offer.company.logo} 
            alt="Company Logo" 
            className="h-16 object-contain mb-4"
          />
        )}
        <h1 className="text-2xl font-bold text-offer-gray">{offer.company.name}</h1>
        <p className="text-sm text-muted-foreground">
          {offer.company.address}<br />
          {offer.company.city}, {offer.company.country}
        </p>
        <p className="text-sm mt-2">
          {offer.company.eikNumber && (
            <>{t.clientInfo.eikNumber}: {offer.company.eikNumber}<br /></>
          )}
          {offer.company.vatNumber && (
            <>{t.clientInfo.vatNumber}: {offer.company.vatNumber}<br /></>
          )}
          {offer.company.phone}<br />
          {offer.company.email}<br />
          {offer.company.website}
        </p>
      </div>
      
      <div className="min-w-[250px] border rounded-md p-4 bg-offer-lightgray">
        <h2 className="text-xl font-medium text-offer-blue">{t.offer.offerLabel}</h2>
        <div className="grid grid-cols-2 gap-1 mt-2">
          <p className="text-sm font-medium">{t.offer.number}</p>
          <p className="text-sm text-right">{offer.details.offerNumber}</p>
          
          <p className="text-sm font-medium">{t.offer.date}</p>
          <p className="text-sm text-right">{formatDate(offer.details.date, language)}</p>
          
          <p className="text-sm font-medium">{t.offer.validUntil}</p>
          <p className="text-sm text-right">{formatDate(offer.details.validUntil, language)}</p>
        </div>
      </div>
    </div>
  );
};

export default OfferHeader;
