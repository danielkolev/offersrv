import React from 'react';
import { Offer } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface OfferHeaderProps {
  offer: Offer;
}

const OfferHeader = ({ offer }: OfferHeaderProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-6">
      {/* Company info with logo */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo and company name section */}
        <div className="flex items-center space-x-4">
          {offer.company.logo ? (
            <div className="flex-shrink-0">
              <img 
                src={offer.company.logo} 
                alt={offer.company.name || t.companyInfo.logo} 
                className="max-h-16 max-w-[150px] object-contain"
              />
            </div>
          ) : null}
          
          <div>
            <h2 className="text-xl font-bold">
              {offer.company.name}
            </h2>
            
            {offer.company.slogan && (
              <div className="text-sm italic text-muted-foreground">
                {offer.company.slogan}
              </div>
            )}
          </div>
        </div>
        
        {/* Company contact details */}
        <div className="text-sm text-right">
          {offer.company.address && (
            <p className="text-muted-foreground">
              {offer.company.address}
              {offer.company.city ? `, ${offer.company.city}` : ''}
              {language !== 'bg' && offer.company.country ? `, ${offer.company.country}` : ''}
            </p>
          )}
          
          <div className="mt-1 flex flex-col gap-1">
            {offer.company.eikNumber && (
              <p className="text-muted-foreground">
                <span className="font-medium">{language === 'bg' ? 'ЕИК' : 'Company ID'}:</span> {offer.company.eikNumber}
              </p>
            )}
            {offer.company.vatNumber && (
              <p className="text-muted-foreground">
                <span className="font-medium">{language === 'bg' ? 'ДДС №' : 'VAT No'}:</span> {offer.company.vatNumber}
              </p>
            )}
            <div className="flex gap-x-4 justify-end flex-wrap">
              {offer.company.phone && (
                <p className="text-muted-foreground">
                  <span className="font-medium">{language === 'bg' ? 'Тел' : 'Phone'}:</span> {offer.company.phone}
                </p>
              )}
              {offer.company.email && (
                <p className="text-muted-foreground">
                  <span className="font-medium">{language === 'bg' ? 'Имейл' : 'Email'}:</span> {offer.company.email}
                </p>
              )}
              {offer.company.website && (
                <p className="text-muted-foreground">
                  <span className="font-medium">{language === 'bg' ? 'Уеб' : 'Web'}:</span> {offer.company.website}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* OFFER title centered */}
      <h1 className="text-2xl font-bold my-3 text-center text-offer-blue">
        {language === 'bg' ? 'ОФЕРТА' : 'OFFER'}
      </h1>
      
      <Separator className="mb-4" />
      
      {/* Client and offer details in a two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* The ClientInfoSection will be rendered here by OfferPreview */}
      </div>
    </div>
  );
};

export default OfferHeader;
