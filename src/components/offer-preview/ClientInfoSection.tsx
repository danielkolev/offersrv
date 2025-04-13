
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';

interface ClientInfoSectionProps {
  client: ClientInfo;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ client }) => {
  const { t, language } = useLanguage();

  return (
    <div className="mb-4">
      <h3 className="text-base font-semibold mb-2 text-offer-blue">{t.offer.toLabel}</h3>
      <div className="border-l-2 border-offer-blue pl-3">
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
