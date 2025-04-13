
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';

interface ClientInfoSectionProps {
  client: ClientInfo;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ client }) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-2">{t.offer.toLabel}</h2>
      <div className="border-l-2 border-offer-blue pl-4">
        <h3 className="font-medium">{client.name}</h3>
        {client.contactPerson && (
          <p className="text-sm">
            {t.offer.attention} {client.contactPerson}
          </p>
        )}
        {client.address && (
          <p className="text-sm">
            {client.address}
          </p>
        )}
        {(client.city || client.country) && (
          <p className="text-sm">
            {client.city}{client.city && client.country ? ', ' : ''}{client.country}
          </p>
        )}
        
        <div className="text-sm mt-2">
          {client.eikNumber && (
            <p>{t.clientInfo.eikNumber}: {client.eikNumber}</p>
          )}
          {client.vatNumber && (
            <p>{t.clientInfo.vatNumber}: {client.vatNumber}</p>
          )}
          {client.phone && (
            <p>{client.phone}</p>
          )}
          {client.email && (
            <p>{client.email}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInfoSection;
