
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

const OfferDetailsForm = () => {
  const { offer, updateOfferDetails } = useOffer();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Offer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="offerNumber">Offer Number</Label>
            <Input
              id="offerNumber"
              value={offer.details.offerNumber}
              onChange={(e) => updateOfferDetails({ offerNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerDate">Date</Label>
            <Input
              id="offerDate"
              type="date"
              value={offer.details.date}
              onChange={(e) => updateOfferDetails({ date: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerValidUntil">Valid Until</Label>
            <Input
              id="offerValidUntil"
              type="date"
              value={offer.details.validUntil}
              onChange={(e) => updateOfferDetails({ validUntil: e.target.value })}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="showPartNumber"
              checked={offer.details.showPartNumber}
              onCheckedChange={(checked) => updateOfferDetails({ showPartNumber: checked })}
            />
            <Label htmlFor="showPartNumber">Show Part Number</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="includeVat"
              checked={offer.details.includeVat}
              onCheckedChange={(checked) => updateOfferDetails({ includeVat: checked })}
            />
            <Label htmlFor="includeVat">Include VAT</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatRate">VAT Rate (%)</Label>
            <Input
              id="vatRate"
              type="number"
              min="0"
              max="100"
              value={offer.details.vatRate}
              onChange={(e) => updateOfferDetails({ vatRate: parseFloat(e.target.value) || 0 })}
              disabled={!offer.details.includeVat}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transportCost">Transport Cost</Label>
            <Input
              id="transportCost"
              type="number"
              min="0"
              value={offer.details.transportCost}
              onChange={(e) => updateOfferDetails({ transportCost: parseFloat(e.target.value) || 0 })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otherCosts">Other Costs</Label>
            <Input
              id="otherCosts"
              type="number"
              min="0"
              value={offer.details.otherCosts}
              onChange={(e) => updateOfferDetails({ otherCosts: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            rows={3}
            value={offer.details.notes}
            onChange={(e) => updateOfferDetails({ notes: e.target.value })}
            placeholder="Delivery time, payment terms, etc."
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferDetailsForm;
