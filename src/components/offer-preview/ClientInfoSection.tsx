
import React from 'react';
import { ClientInfo } from '@/types/offer';
import { useLanguage } from '@/context/LanguageContext';

interface ClientInfoSectionProps {
  client: ClientInfo;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ client }) => {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-2">{t.offer.toLabel}</h2>
      <div className="border-l-2 border-offer-blue pl-4">
        <h3 className="font-medium">{client.name}</h3>
        <p className="text-sm">
          {t.offer.attention} {client.contactPerson}<br />
          {client.address}<br />
          {client.city}, {client.country}<br />
          {t.clientInfo.vatNumber}: {client.vatNumber}
        </p>
        <p className="text-sm mt-2">
          {client.phone}<br />
          {client.email}
        </p>
      </div>
    </div>
  );
};

export default ClientInfoSection;
