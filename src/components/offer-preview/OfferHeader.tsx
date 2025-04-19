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
  
  // Get company slogan based on language
  const companySlogan = displayLanguage === 'en' && offer.company.slogan_en
    ? offer.company.slogan_en
    : offer.company.slogan;
  
  // Get appropriate logo based on language
  const companyLogo = displayLanguage === 'en' && offer.company.logo_url_en
    ? offer.company.logo_url_en
    : offer.company.logo_url;
  
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
  
  // Get company address based on language
  const address = displayLanguage === 'en' && offer.company.addressEn 
    ? offer.company.addressEn 
    : offer.company.address;

  // Get company city based on language
  const city = displayLanguage === 'en' && offer.company.cityEn 
    ? offer.company.cityEn 
    : offer.company.city;

  // Get company country based on language
  const country = displayLanguage === 'en' && offer.company.countryEn 
    ? offer.company.countryEn 
    : offer.company.country;
  
  return (
    <div className="mb-6 flex justify-between items-start">
      <div className="flex items-start gap-4">
        {showLogo && companyLogo && (
          <div className="flex flex-col items-center">
            <img 
              src={companyLogo} 
              alt={companyName} 
              className="w-16 h-16 object-contain pdf-preserve-ratio" 
              style={{ maxWidth: '64px', maxHeight: '64px' }}
            />
            {companySlogan && (
              <div 
                className="text-xs text-center mt-1 max-w-32" 
                style={{ color: headerTextColor || settings?.appearance?.textColor || 'rgb(75, 85, 99)' }}
              >
                {companySlogan}
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
            {/* Display address */}
            {address && <p>{address}</p>}
            
            {/* Display city and country */}
            {(city || country) && (
              <p>
                {city}
                {city && country && ', '}
                {country}
              </p>
            )}
            
            {/* Display contact info */}
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
