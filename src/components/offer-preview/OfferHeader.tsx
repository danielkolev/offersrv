
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
  const companyName = displayLanguage === 'en' && offer.company.name_en 
    ? offer.company.name_en 
    : offer.company.name;
  
  // Whether to show the logo or not (default to true)
  const showLogo = settings?.header?.showLogo !== false;
  
  // Whether to show the offer title or not (default to true)
  const showTitle = settings?.header?.showTitle !== false;
  
  // Get the custom offer title or use a default based on language
  const defaultOfferTitle = displayLanguage === 'en' ? 'OFFER' : 'ОФЕРТА';
  const offerTitle = settings?.header?.customTitle || defaultOfferTitle;
  
  // Primary color for styling
  const primaryColor = settings?.appearance?.primaryColor || '';
  
  // Header text color (if specified)
  const headerTextColor = settings?.header?.headerTextColor || '';
  
  // Use primary color as the default color if no specific header text color
  const titleColor = headerTextColor || primaryColor || '';
  
  return (
    <div className="mb-6 flex justify-between items-start">
      {/* Company info and logo on the left */}
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
              <div 
                className="text-xs text-center mt-1 max-w-32" 
                style={{ color: headerTextColor || settings?.appearance?.textColor || 'rgb(75, 85, 99)' }}
              >
                {offer.company.slogan}
              </div>
            )}
          </div>
        )}
        
        <div>
          <h1 
            className="text-xl font-bold"
            style={{ color: titleColor || 'rgb(17, 24, 39)' }}
          >
            {companyName}
          </h1>
          
          <div 
            className="text-sm mt-1"
            style={{ color: headerTextColor || settings?.appearance?.textColor || 'rgb(75, 85, 99)' }}
          >
            {/* Use address based on language */}
            {displayLanguage === 'en' && offer.company.address_en 
              ? <p>{offer.company.address_en}</p>
              : (offer.company.address && <p>{offer.company.address}</p>)
            }
            
            {/* Use city and country based on language */}
            {((displayLanguage === 'en' ? offer.company.city_en : offer.company.city) || 
              (displayLanguage === 'en' ? offer.company.country_en : offer.company.country)) && (
              <p>
                {displayLanguage === 'en' ? offer.company.city_en || offer.company.city : offer.company.city}
                {(displayLanguage === 'en' ? offer.company.city_en || offer.company.city : offer.company.city) && 
                 (displayLanguage === 'en' ? offer.company.country_en || offer.company.country : offer.company.country) && ', '}
                {displayLanguage === 'en' ? offer.company.country_en || offer.company.country : offer.company.country}
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
      
      {/* Offer title on the right */}
      {showTitle && (
        <div 
          className="text-right font-bold text-2xl"
          style={{ color: titleColor || 'rgb(37, 99, 235)' }}
        >
          {offerTitle}
        </div>
      )}
    </div>
  );
};

export default OfferHeader;
