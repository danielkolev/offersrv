
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';

interface CostsSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const CostsSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: CostsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="space-y-2">
        <Label htmlFor="vatRate">{t.offerDetails?.vatRate || "VAT Rate (%)"}</Label>
        <Input
          id="vatRate"
          type="number"
          value={offerDetails.vatRate}
          onChange={(e) => updateOfferDetails({ vatRate: Number(e.target.value) })}
          placeholder="20"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="transportCost">{t.offerDetails?.transportCost || "Transport Cost"}</Label>
        <Input
          id="transportCost"
          type="number"
          value={offerDetails.transportCost}
          onChange={(e) => updateOfferDetails({ transportCost: Number(e.target.value) })}
          placeholder={t.offerDetails?.transportCostPlaceholder || "0.00"}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="otherCosts">{t.offerDetails?.otherCosts || "Other Costs"}</Label>
        <Input
          id="otherCosts"
          type="number"
          value={offerDetails.otherCosts}
          onChange={(e) => updateOfferDetails({ otherCosts: Number(e.target.value) })}
          placeholder={t.offerDetails?.otherCostsPlaceholder || "0.00"}
        />
      </div>
    </div>
  );
};

export default CostsSection;

