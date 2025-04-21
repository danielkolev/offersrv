
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';
import { useIsMobile } from '@/hooks/use-mobile';

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
  attentionText
}) => {
  const isMobile = useIsMobile();
  
  // Get correct language-specific texts
  const sectionTitle = displayLanguage === 'bg' ? 'Информация за клиента' : 'Client Information';
  const defaultAttentionText = displayLanguage === 'bg' ? 'на вниманието на' : 'attention to';
  const vatLabel = displayLanguage === 'bg' ? 'ДДС №' : 'VAT No';
  const companyIdLabel = displayLanguage === 'bg' ? 'ЕИК' : 'Company ID';
  const phoneLabel = displayLanguage === 'bg' ? 'Тел' : 'Phone';

  // Use the provided attentionText or fall back to the default based on language
  const displayAttentionText = attentionText || defaultAttentionText;

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
        <p className="font-semibold break-words">{client.name}</p>
        
        {client.contactPerson && (
          <p className="break-words">
            <span className="text-gray-600">{displayAttentionText}:</span> {client.contactPerson}
          </p>
        )}
        
        {client.address && <p className="break-words">{client.address}</p>}
        
        {(client.city || client.country) && (
          <p className="break-words">
            {client.city}
            {client.city && client.country && ', '}
            {client.country}
          </p>
        )}
        
        {client.vatNumber && (
          <p className="break-words">
            <span className="text-gray-600">{vatLabel}:</span> {client.vatNumber}
          </p>
        )}
        
        {client.eikNumber && (
          <p className="break-words">
            <span className="text-gray-600">{companyIdLabel}:</span> {client.eikNumber}
          </p>
        )}
        
        {(client.phone || client.email) && isMobile ? (
          <>
            {client.phone && (
              <p className="break-words">
                <span className="text-gray-600">{phoneLabel}:</span> {client.phone}
              </p>
            )}
            {client.email && (
              <p className="break-words">
                <span className="text-gray-600">Email:</span> {client.email}
              </p>
            )}
          </>
        ) : (client.phone || client.email) && (
          <p className="break-words">
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
