
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OfferDetailsForm = () => {
  const { offer, updateOfferDetails } = useOffer();
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.offerDetails.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="offerNumber">{t.offerDetails.offerNumber}</Label>
            <Input
              id="offerNumber"
              value={offer.details.offerNumber}
              onChange={(e) => updateOfferDetails({ offerNumber: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerLanguage">{t.offerDetails.language}</Label>
            <Select
              value={offer.details.offerLanguage}
              onValueChange={(value: 'bg' | 'en') => updateOfferDetails({ offerLanguage: value })}
            >
              <SelectTrigger id="offerLanguage">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg">{t.offer.languageOptions.bulgarian}</SelectItem>
                <SelectItem value="en">{t.offer.languageOptions.english}</SelectItem>
              </SelectContent>
            </Select>
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="vatRate">{t.offerDetails.vatRate}</Label>
            <Input
              id="vatRate"
              type="number"
              value={offer.details.vatRate}
              onChange={(e) => updateOfferDetails({ vatRate: Number(e.target.value) })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transportCost">{t.offerDetails.transportCost}</Label>
            <Input
              id="transportCost"
              type="number"
              value={offer.details.transportCost}
              onChange={(e) => updateOfferDetails({ transportCost: Number(e.target.value) })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otherCosts">{t.offerDetails.otherCosts}</Label>
            <Input
              id="otherCosts"
              type="number"
              value={offer.details.otherCosts}
              onChange={(e) => updateOfferDetails({ otherCosts: Number(e.target.value) })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="offerNotes">{t.offerDetails.notes}</Label>
          <Textarea
            id="offerNotes"
            value={offer.details.notes}
            onChange={(e) => updateOfferDetails({ notes: e.target.value })}
            placeholder={t.offerDetails.notesPlaceholder}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferDetailsForm;
