
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface ClientInfoSectionProps {
  client: ClientInfo;
  settings?: any;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ client, settings }) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-4">
      <h3 className={cn(
        "text-base font-semibold mb-2",
        settings?.appearance?.primaryColor ? "" : "text-offer-blue"
      )}
      style={{ 
        color: settings?.appearance?.primaryColor || ""
      }}>
        {t.offer.toLabel}
      </h3>
      <div className={cn(
        "border-l-2 pl-3",
        settings?.appearance?.primaryColor ? "" : "border-offer-blue"
      )}
      style={{ 
        borderColor: settings?.appearance?.primaryColor || ""
      }}>
        <h4 className="font-medium">{client.name}</h4>
        {client.contactPerson && (
          <p className="text-sm">
            {t.offer.attention} {client.contactPerson}
          </p>
        )}
        {client.address && (
          <p className="text-sm">
            {client.address}
            {client.city && `, ${client.city}`}
            {language !== 'bg' && client.country ? `, ${client.country}` : ''}
          </p>
        )}
        
        <div className="text-sm mt-2 space-y-1">
          {client.eikNumber && (
            <p><span className="font-medium">{t.clientInfo.eikNumber}:</span> {client.eikNumber}</p>
          )}
          {client.vatNumber && (
            <p><span className="font-medium">{t.clientInfo.vatNumber}:</span> {client.vatNumber}</p>
          )}
          {client.phone && (
            <p><span className="font-medium">{t.clientInfo.phone}:</span> {client.phone}</p>
          )}
          {client.email && (
            <p><span className="font-medium">{t.clientInfo.email}:</span> {client.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfoSection;
