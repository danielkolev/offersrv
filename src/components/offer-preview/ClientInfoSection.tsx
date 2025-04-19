
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface ClientInfoSectionProps {
  client: ClientInfo;
  settings?: any;
  displayLanguage?: SupportedLanguage;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ 
  client, 
  settings,
  displayLanguage = 'bg'
}) => {
  // Get correct language-specific texts
  const sectionTitle = displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information';
  const attentionText = displayLanguage === 'bg' ? 'на вниманието на' : 'attention to';
  const vatLabel = displayLanguage === 'bg' ? 'ДДС №' : 'VAT No';
  const companyIdLabel = displayLanguage === 'bg' ? 'ЕИК' : 'Company ID';
  const phoneLabel = displayLanguage === 'bg' ? 'Тел' : 'Phone';

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
        {sectionTitle}
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
            <span className="text-gray-600">{vatLabel}:</span> {client.vatNumber}
          </p>
        )}
        
        {client.eikNumber && (
          <p>
            <span className="text-gray-600">{companyIdLabel}:</span> {client.eikNumber}
          </p>
        )}
        
        {(client.phone || client.email) && (
          <p>
            {client.phone && (
              <span>
                <span className="text-gray-600">{phoneLabel}:</span> {client.phone}
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
