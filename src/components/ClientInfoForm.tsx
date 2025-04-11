
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ClientInfoForm = () => {
  const { offer, updateClientInfo } = useOffer();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Company</Label>
            <Input
              id="clientName"
              value={offer.client.name}
              onChange={(e) => updateClientInfo({ name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientContactPerson">Contact Person</Label>
            <Input
              id="clientContactPerson"
              value={offer.client.contactPerson}
              onChange={(e) => updateClientInfo({ contactPerson: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Address</Label>
            <Input
              id="clientAddress"
              value={offer.client.address}
              onChange={(e) => updateClientInfo({ address: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientCity">City</Label>
            <Input
              id="clientCity"
              value={offer.client.city}
              onChange={(e) => updateClientInfo({ city: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientCountry">Country</Label>
            <Input
              id="clientCountry"
              value={offer.client.country}
              onChange={(e) => updateClientInfo({ country: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientVat">VAT Number</Label>
            <Input
              id="clientVat"
              value={offer.client.vatNumber}
              onChange={(e) => updateClientInfo({ vatNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              value={offer.client.email}
              onChange={(e) => updateClientInfo({ email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone</Label>
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
