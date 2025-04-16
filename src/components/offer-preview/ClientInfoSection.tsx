
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface ClientInfoSectionProps {
  client: ClientInfo;
  settings?: any;
  displayLanguage?: SupportedLanguage;
  attentionText?: string;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ 
  client, 
  settings,
  displayLanguage = 'bg',
  attentionText = displayLanguage === 'bg' ? 'на вниманието на' : 'attention to'
}) => {
  return (
    <div className={cn(
      "rounded-md p-3",
      settings?.appearance?.secondaryColor ? "" : "bg-gray-50"
    )}
    style={{ 
      backgroundColor: settings?.appearance?.secondaryColor || ""
    }}>
      <h3 className={cn(
        "text-base font-semibold mb-2",
        settings?.appearance?.primaryColor ? "" : "text-offer-blue"
      )}
      style={{ 
        color: settings?.appearance?.primaryColor || ""
      }}>
        {displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information'}
      </h3>
      
      <div className="text-sm space-y-1">
        <p className="font-semibold">{client.name}</p>
        
        {client.contactPerson && (
          <p>
            <span className="text-gray-600">{attentionText}:</span> {client.contactPerson}
          </p>
        )}
        
        {client.address && <p>{client.address}</p>}
        
        {(client.city || client.country) && (
          <p>
            {client.city}
            {client.city && client.country && ', '}
            {client.country}
          </p>
        )}
        
        {client.vatNumber && (
          <p>
            <span className="text-gray-600">{displayLanguage === 'bg' ? 'ДДС №' : 'VAT No'}:</span> {client.vatNumber}
          </p>
        )}
        
        {client.eikNumber && (
          <p>
            <span className="text-gray-600">{displayLanguage === 'bg' ? 'ЕИК' : 'Company ID'}:</span> {client.eikNumber}
          </p>
        )}
        
        {(client.phone || client.email) && (
          <p>
            {client.phone && (
              <span>
                <span className="text-gray-600">{displayLanguage === 'bg' ? 'Тел' : 'Phone'}:</span> {client.phone}
              </span>
            )}
            {client.phone && client.email && ' | '}
            {client.email && (
              <span>
                <span className="text-gray-600">Email:</span> {client.email}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ClientInfoSection;
