
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import ClientSelector from './client-selector/ClientSelector';

const ClientInfoForm = () => {
  const { offer, updateClientInfo } = useOffer();
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t.clientInfo.title}</CardTitle>
        <ClientSelector onSelectClient={updateClientInfo} />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">{t.clientInfo.name}</Label>
            <Input
              id="clientName"
              value={offer.client.name}
              onChange={(e) => updateClientInfo({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientContactPerson">{t.clientInfo.contactPerson}</Label>
            <Input
              id="clientContactPerson"
              value={offer.client.contactPerson}
              onChange={(e) => updateClientInfo({ contactPerson: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientAddress">{t.clientInfo.address}</Label>
            <Input
              id="clientAddress"
              value={offer.client.address}
              onChange={(e) => updateClientInfo({ address: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientCity">{t.clientInfo.city}</Label>
            <Input
              id="clientCity"
              value={offer.client.city}
              onChange={(e) => updateClientInfo({ city: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientCountry">{t.clientInfo.country}</Label>
            <Input
              id="clientCountry"
              value={offer.client.country}
              onChange={(e) => updateClientInfo({ country: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientVat">{t.clientInfo.vatNumber}</Label>
            <Input
              id="clientVat"
              value={offer.client.vatNumber}
              onChange={(e) => updateClientInfo({ vatNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">{t.clientInfo.email}</Label>
            <Input
              id="clientEmail"
              value={offer.client.email}
              onChange={(e) => updateClientInfo({ email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientPhone">{t.clientInfo.phone}</Label>
            <Input
              id="clientPhone"
              value={offer.client.phone}
              onChange={(e) => updateClientInfo({ phone: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfoForm;
