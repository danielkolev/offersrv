
import React from 'react';
import { Offer } from '@/types/offer';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface OfferHeaderProps {
  offer: Offer;
  settings?: any;
  displayLanguage?: SupportedLanguage;
}

const OfferHeader: React.FC<OfferHeaderProps> = ({ offer, settings, displayLanguage = 'bg' }) => {
  // Use company name based on language if available
  const companyName = displayLanguage === 'en' && offer.company.nameEn 
    ? offer.company.nameEn 
    : offer.company.name;
  
  // Use company address based on language if available
  const companyAddress = displayLanguage === 'en' && offer.company.addressEn 
    ? offer.company.addressEn 
    : offer.company.address;
    
  // Use city and country based on language if available
  const companyCity = displayLanguage === 'en' && offer.company.cityEn 
    ? offer.company.cityEn 
    : offer.company.city;
    
  const companyCountry = displayLanguage === 'en' && offer.company.countryEn 
    ? offer.company.countryEn 
    : offer.company.country;

  // Whether to show the logo or not (default to true)
  const showLogo = settings?.header?.showLogo !== false;
  
  // Whether to show the offer title or not (default to true)
  const showTitle = settings?.header?.showTitle !== false;
  
  // Get the custom offer title or use a default based on language
  const defaultOfferTitle = displayLanguage === 'en' ? 'OFFER' : 'ОФЕРТА';
  const offerTitle = settings?.header?.customTitle || defaultOfferTitle;
  
  return (
    <div className="mb-6 flex justify-between items-start">
      <div className="flex items-start gap-4">
        {showLogo && offer.company.logo && (
          <div className="flex flex-col items-center">
            <img 
              src={offer.company.logo} 
              alt={companyName} 
              className="w-16 h-16 object-contain pdf-preserve-ratio" 
              style={{ maxWidth: '64px', maxHeight: '64px' }}
            />
            {offer.company.slogan && (
              <div className="text-xs text-center mt-1 max-w-32 text-muted-foreground">
                {offer.company.slogan}
              </div>
            )}
          </div>
        )}
        
        <div>
          <h1 className="text-xl font-bold text-foreground">{companyName}</h1>
          
          <div className="text-sm mt-1 text-muted-foreground">
            {companyAddress && <p>{companyAddress}</p>}
            
            {(companyCity || companyCountry) && (
              <p>
                {companyCity}
                {companyCity && companyCountry && ', '}
                {companyCountry}
              </p>
            )}
            
            {(offer.company.phone || offer.company.email || offer.company.website) && (
              <p>
                {offer.company.phone && <span>{offer.company.phone}</span>}
                {offer.company.phone && (offer.company.email || offer.company.website) && <span> | </span>}
                {offer.company.email && <span>{offer.company.email}</span>}
                {offer.company.email && offer.company.website && <span> | </span>}
                {offer.company.website && <span>{offer.company.website}</span>}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {showTitle && (
        <div className="text-right font-bold text-2xl text-primary">
          {offerTitle}
        </div>
      )}
    </div>
  );
};

export default OfferHeader;
