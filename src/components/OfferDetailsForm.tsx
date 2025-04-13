
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
  const { offer, updateOfferDetails, lastSaved, hasUserInteracted } = useOffer();
  const { t } = useLanguage();

  // Format last edited date
  const formatLastEdited = () => {
    if (!lastSaved) return "-";
    return new Date(lastSaved).toLocaleString();
  };

  // Format creation date (using current date when it's a new offer)
  const creationDate = offer.details.date 
    ? new Date(offer.details.date).toLocaleString() 
    : new Date().toLocaleString();

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{t.offerDetails?.title || "Offer Details"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Only show the offer number field when it's not a draft or it has been saved before */}
          {!hasUserInteracted || offer.details.offerNumber !== '00000' ? (
            <div className="space-y-2">
              <Label htmlFor="offerNumber">{t.offerDetails?.offerNumber || "Offer Number"}</Label>
              <Input
                id="offerNumber"
                value={offer.details.offerNumber || ''}
                onChange={(e) => updateOfferDetails({ offerNumber: e.target.value })}
                placeholder="00000"
                disabled
              />
              <p className="text-xs text-muted-foreground">
                {t.offerDetails?.offerNumberInfo || "This number is automatically generated when the offer is saved"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="draftStatus">{t.offer?.draftStatus || "Status"}</Label>
              <Input
                id="draftStatus"
                value={t.offer?.statuses?.draft || "Draft"}
                disabled
                className="bg-amber-50 text-amber-700"
              />
              <p className="text-xs text-muted-foreground">
                {t.offer?.draftStatusInfo || "A number will be assigned when saved"}
              </p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="offerLanguage">{t.offerDetails?.language || "Offer Language"}</Label>
            <Select
              value={offer.details.offerLanguage}
              onValueChange={(value: 'bg' | 'en') => updateOfferDetails({ offerLanguage: value })}
            >
              <SelectTrigger id="offerLanguage">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bg">{t.offer?.languageOptions?.bulgarian || "Bulgarian"}</SelectItem>
                <SelectItem value="en">{t.offer?.languageOptions?.english || "English"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerDate" className="after:content-['*'] after:text-red-500 after:ml-0.5">
              {t.offerDetails?.date || "Date"}
            </Label>
            <Input
              id="offerDate"
              type="date"
              value={offer.details.date}
              onChange={(e) => updateOfferDetails({ date: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="offerValidUntil">{t.offerDetails?.validUntil || "Valid Until"}</Label>
            <Input
              id="offerValidUntil"
              type="date"
              value={offer.details.validUntil}
              onChange={(e) => updateOfferDetails({ validUntil: e.target.value })}
              placeholder={t.offerDetails?.validUntilPlaceholder || "Select expiration date"}
            />
          </div>
        </div>

        {/* Display creation and last edited timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
          <div>
            {t.offer?.createdAt || "Created"}: {creationDate}
          </div>
          <div>
            {t.offer?.lastEdited || "Last edited"}: {formatLastEdited()}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="showPartNumber"
              checked={offer.details.showPartNumber}
              onCheckedChange={(checked) => updateOfferDetails({ showPartNumber: checked })}
            />
            <Label htmlFor="showPartNumber">{t.offerDetails?.showPartNumber || "Show Part Number"}</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="includeVat"
              checked={offer.details.includeVat}
              onCheckedChange={(checked) => updateOfferDetails({ includeVat: checked })}
            />
            <Label htmlFor="includeVat">{t.offerDetails?.includeVat || "Include VAT"}</Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="vatRate">{t.offerDetails?.vatRate || "VAT Rate (%)"}</Label>
            <Input
              id="vatRate"
              type="number"
              value={offer.details.vatRate}
              onChange={(e) => updateOfferDetails({ vatRate: Number(e.target.value) })}
              placeholder="20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="transportCost">{t.offerDetails?.transportCost || "Transport Cost"}</Label>
            <Input
              id="transportCost"
              type="number"
              value={offer.details.transportCost}
              onChange={(e) => updateOfferDetails({ transportCost: Number(e.target.value) })}
              placeholder={t.offerDetails?.transportCostPlaceholder || "0.00"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="otherCosts">{t.offerDetails?.otherCosts || "Other Costs"}</Label>
            <Input
              id="otherCosts"
              type="number"
              value={offer.details.otherCosts}
              onChange={(e) => updateOfferDetails({ otherCosts: Number(e.target.value) })}
              placeholder={t.offerDetails?.otherCostsPlaceholder || "0.00"}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="offerNotes">{t.offerDetails?.notes || "Notes"}</Label>
          <Textarea
            id="offerNotes"
            value={offer.details.notes}
            onChange={(e) => updateOfferDetails({ notes: e.target.value })}
            placeholder={t.offerDetails?.notesPlaceholder || "Additional information or terms"}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferDetailsForm;
