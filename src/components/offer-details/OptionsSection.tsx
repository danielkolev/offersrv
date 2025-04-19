
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';

interface OptionsSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const OptionsSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: OptionsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="showPartNumber"
          checked={offerDetails.showPartNumber}
          onCheckedChange={(checked) => updateOfferDetails({ showPartNumber: checked })}
        />
        <Label htmlFor="showPartNumber">{t.offerDetails?.showPartNumber || "Show Part Number"}</Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="includeVat"
          checked={offerDetails.includeVat}
          onCheckedChange={(checked) => updateOfferDetails({ includeVat: checked })}
        />
        <Label htmlFor="includeVat">
          {offerDetails.includeVat 
            ? (t.offerDetails?.vatIncluded || "Prices include VAT") 
            : (t.offerDetails?.vatExcluded || "Prices exclude VAT")}
        </Label>
      </div>
    </div>
  );
};

export default OptionsSection;

