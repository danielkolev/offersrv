
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';

interface FooterOptionsSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const FooterOptionsSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: FooterOptionsSectionProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex items-center space-x-2">
        <Switch
          id="showDigitalSignature"
          checked={offerDetails.showDigitalSignature}
          onCheckedChange={(checked) => updateOfferDetails({ showDigitalSignature: checked })}
        />
        <Label htmlFor="showDigitalSignature">
          {t.offerDetails?.showDigitalSignature || "Show Digital Signature"}
        </Label>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customFooterText">
          {t.offerDetails?.customFooterText || "Additional Footer Text"}
        </Label>
        <Textarea
          id="customFooterText"
          value={offerDetails.customFooterText || ''}
          onChange={(e) => updateOfferDetails({ customFooterText: e.target.value })}
          placeholder={t.offerDetails?.customFooterTextPlaceholder || "Enter terms and conditions or additional text"}
          rows={3}
        />
      </div>
    </div>
  );
};

export default FooterOptionsSection;
