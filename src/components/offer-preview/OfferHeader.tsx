
import React from 'react';
import { Offer } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { formatDate } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';

interface OfferHeaderProps {
  offer: Offer;
  settings?: any;
}

const OfferHeader = ({ offer, settings }: OfferHeaderProps) => {
  const { t, language } = useLanguage();
  
  return (
    <div className="mb-6">
      {/* Company info with logo */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo and company slogan section (left side) */}
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
          
          {(offer.company.slogan && settings?.header?.showCompanySlogan !== false) && (
            <div className="text-sm italic text-muted-foreground">
              {offer.company.slogan}
            </div>
          )}
        </div>
        
        {/* Company details (right side) */}
        <div className="text-sm text-right">
          {/* Company name and address */}
          <h2 className={cn(
            "text-xl font-bold mb-1",
            settings?.appearance?.primaryColor ? "" : ""
          )}
          style={{ 
            color: settings?.header?.companyNameSize === 'large' ? settings?.appearance?.primaryColor : '',
            fontSize: settings?.header?.companyNameSize === 'small' ? '1.1rem' :
                    settings?.header?.companyNameSize === 'large' ? '1.5rem' : '1.25rem'
          }}>
            {offer.company.name}
          </h2>
          
          {offer.company.address && (
            <p className="text-muted-foreground mb-1">
              {offer.company.address}
              {offer.company.city ? `, ${offer.company.city}` : ''}
              {language !== 'bg' && offer.company.country ? `, ${offer.company.country}` : ''}
            </p>
          )}
          
          {/* Email and phone on a single line with icons */}
          <div className="flex justify-end gap-4 mt-1">
            {offer.company.email && (
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{offer.company.email}</span>
              </div>
            )}
            {offer.company.phone && (
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-muted-foreground">{offer.company.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* OFFER title centered */}
      {settings?.header?.showOfferLabel !== false && (
        <h1 className={cn(
          "text-2xl font-bold my-3 text-center", 
          settings?.appearance?.primaryColor ? "" : "text-offer-blue"
        )}
        style={{ 
          color: settings?.appearance?.primaryColor || ""
        }}>
          {language === 'bg' ? 'ОФЕРТА' : 'OFFER'}
        </h1>
      )}
      
      <Separator className={cn(
        "mb-4",
        settings?.appearance?.primaryColor ? "" : ""
      )}
      style={{ 
        backgroundColor: settings?.appearance?.primaryColor || ""
      }} />
      
      {/* Client and offer details в двуколонен layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ClientInfoSection ще бъде рендериран тук от OfferPreview */}
      </div>
    </div>
  );
};

export default OfferHeader;
