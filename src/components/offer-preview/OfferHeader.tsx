
import React from 'react';
import { Offer } from '@/types/offer';
import { cn } from '@/lib/utils';

interface OfferHeaderProps {
  offer: Offer;
  settings?: any;
}

const OfferHeader: React.FC<OfferHeaderProps> = ({ offer, settings }) => {
  // Use company name if passed, otherwise use default from offer
  const companyName = offer.company.name || 'Company Name';
  
  // Whether to show the logo or not (default to true)
  const showLogo = settings?.layout?.showLogo !== false;
  
  // Whether to show the offer title or not (default to true)
  const showTitle = settings?.header?.showTitle !== false;
  
  // Get the custom offer title or use a default
  const offerTitle = settings?.header?.customTitle || 'ОФЕРТА';
  
  // Primary color for styling
  const primaryColor = settings?.appearance?.primaryColor || '';
  
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
              <div className="text-xs text-center mt-1 max-w-32 text-gray-600">{offer.company.slogan}</div>
            )}
          </div>
        )}
        
        <div>
          <h1 className={cn(
            "text-xl font-bold",
            primaryColor ? "" : "text-gray-900"
          )}
          style={{ color: primaryColor }}>
            {companyName}
          </h1>
          
          <div className="text-sm text-gray-600 mt-1">
            {offer.company.address && <p>{offer.company.address}</p>}
            {(offer.company.city || offer.company.country) && (
              <p>
                {offer.company.city}
                {offer.company.city && offer.company.country && ', '}
                {offer.company.country}
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
        <div className={cn(
          "text-right font-bold text-2xl",
          primaryColor ? "" : "text-blue-600"
        )}
        style={{ color: primaryColor }}>
          {offerTitle}
        </div>
      )}
    </div>
  );
};

export default OfferHeader;
