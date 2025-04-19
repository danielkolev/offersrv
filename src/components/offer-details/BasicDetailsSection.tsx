
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';
import { SupportedCurrency } from '@/types/language/base';
import { Coins } from 'lucide-react';

interface BasicDetailsSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
  currency: SupportedCurrency;
  handleCurrencyChange: (value: string) => void;
}

const BasicDetailsSection = ({
  offerDetails,
  updateOfferDetails,
  t,
  currency,
  handleCurrencyChange
}: BasicDetailsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="offerNumber">{t.offerDetails?.offerNumber || "Offer Number"}</Label>
        <Input
          id="offerNumber"
          value={offerDetails.offerNumber || '00000'}
          onChange={(e) => updateOfferDetails({ offerNumber: e.target.value })}
          placeholder="00000"
          disabled
          className={!offerDetails.offerNumber ? "bg-amber-50 text-amber-700" : ""}
        />
        <p className="text-xs text-muted-foreground">
          {t.offerDetails?.offerNumberInfo || "This number is automatically generated when the offer is saved"}
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="draftStatus">{t.offer.draftStatus || "Status"}</Label>
        <Input
          id="draftStatus"
          value={t.offer.statuses.draft || "Draft"}
          disabled
          className="bg-amber-50 text-amber-700"
        />
        <p className="text-xs text-muted-foreground">
          {t.offer.draftStatusInfo || "A number will be assigned when saved"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="offerLanguage">{t.offerDetails?.language || "Offer Language"}</Label>
        <Select
          value={offerDetails.offerLanguage}
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
        <Label htmlFor="currency">{t.offerDetails?.currency || "Currency"}</Label>
        <Select
          value={offerDetails.currency || currency}
          onValueChange={handleCurrencyChange}
        >
          <SelectTrigger id="currency" className="flex items-center">
            <Coins className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BGN">BGN (лв)</SelectItem>
            <SelectItem value="EUR">EUR (€)</SelectItem>
            <SelectItem value="USD">USD ($)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicDetailsSection;

