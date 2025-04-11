
import React from 'react';
import { useOffer } from '@/context/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/context/LanguageContext';

const OfferDetailsForm = () => {
  const { offer, updateOfferDetails } = useOffer();
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.offerDetails.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="offerNumber">{t.offerDetails.offerNumber}</Label>
            <Input
              id="offerNumber"
              value={offer.details.offerNumber}
              onChange={(e) => updateOfferDetails({ offerNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerDate">{t.offerDetails.date}</Label>
            <Input
              id="offerDate"
              type="date"
              value={offer.details.date}
              onChange={(e) => updateOfferDetails({ date: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerValidUntil">{t.offerDetails.validUntil}</Label>
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
            <Label htmlFor="showPartNumber">{t.offerDetails.showPartNumber}</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="includeVat"
              checked={offer.details.includeVat}
              onCheckedChange={(checked) => updateOfferDetails({ includeVat: checked })}
            />
            <Label htmlFor="includeVat">{t.offerDetails.includeVat}</Label>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vatRate">{t.offerDetails.vatRate}</Label>
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
            <Label htmlFor="transportCost">{t.offerDetails.transportCost}</Label>
            <Input
              id="transportCost"
              type="number"
              min="0"
              value={offer.details.transportCost}
              onChange={(e) => updateOfferDetails({ transportCost: parseFloat(e.target.value) || 0 })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otherCosts">{t.offerDetails.otherCosts}</Label>
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
          <Label htmlFor="notes">{t.offerDetails.notes}</Label>
          <Textarea
            id="notes"
            rows={3}
            value={offer.details.notes}
            onChange={(e) => updateOfferDetails({ notes: e.target.value })}
            placeholder={t.offerDetails.notesPlaceholder}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferDetailsForm;
