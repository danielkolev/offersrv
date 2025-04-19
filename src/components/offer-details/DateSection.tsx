
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';

interface DateSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const DateSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: DateSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="offerDate" className="after:content-['*'] after:text-red-500 after:ml-0.5">
          {t.offerDetails?.date || "Date"}
        </Label>
        <Input
          id="offerDate"
          type="date"
          value={offerDetails.date}
          onChange={(e) => updateOfferDetails({ date: e.target.value })}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="offerValidUntil">{t.offerDetails?.validUntil || "Valid Until"}</Label>
        <Input
          id="offerValidUntil"
          type="date"
          value={offerDetails.validUntil}
          onChange={(e) => updateOfferDetails({ validUntil: e.target.value })}
          placeholder={t.offerDetails?.validUntilPlaceholder || "Select expiration date"}
        />
      </div>
    </div>
  );
};

export default DateSection;

