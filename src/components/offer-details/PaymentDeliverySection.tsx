
import React from 'react';
import { OfferDetails } from '@/types/offer';
import { Translations } from '@/types/language';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PaymentDeliverySectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const PaymentDeliverySection: React.FC<PaymentDeliverySectionProps> = ({
  offerDetails,
  updateOfferDetails,
  t
}) => {
  // Common payment terms options
  const paymentTermsOptions = [
    { value: 'advance', label: t.offerDetails.paymentTermsAdvance || 'Advanced Payment' },
    { value: 'net15', label: t.offerDetails.paymentTermsNet15 || 'Net 15 Days' },
    { value: 'net30', label: t.offerDetails.paymentTermsNet30 || 'Net 30 Days' },
    { value: 'net60', label: t.offerDetails.paymentTermsNet60 || 'Net 60 Days' },
    { value: 'custom', label: t.offerDetails.paymentTermsCustom || 'Custom' }
  ];

  // Common delivery terms options
  const deliveryTermsOptions = [
    { value: 'immediate', label: t.offerDetails.deliveryImmediate || 'Immediate' },
    { value: '1week', label: t.offerDetails.delivery1Week || '1 Week' },
    { value: '2weeks', label: t.offerDetails.delivery2Weeks || '2 Weeks' },
    { value: '1month', label: t.offerDetails.delivery1Month || '1 Month' },
    { value: 'custom', label: t.offerDetails.deliveryCustom || 'Custom' }
  ];

  return (
    <div className="border p-4 rounded-md mb-4 bg-white">
      <h3 className="text-lg font-medium mb-4">
        {t.offerDetails.paymentDeliveryTitle || "Payment & Delivery Terms"}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="payment_terms">
            {t.offerDetails.paymentTerms || "Payment Terms"}
          </Label>
          <Select
            value={offerDetails.paymentTerms || 'advance'}
            onValueChange={(value) => updateOfferDetails({ paymentTerms: value })}
          >
            <SelectTrigger id="payment_terms">
              <SelectValue placeholder={t.offerDetails.selectPaymentTerms || "Select payment terms"} />
            </SelectTrigger>
            <SelectContent>
              {paymentTermsOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {offerDetails.paymentTerms === 'custom' && (
            <div className="mt-2">
              <Textarea
                id="custom_payment_terms"
                value={offerDetails.customPaymentTerms || ''}
                onChange={(e) => updateOfferDetails({ customPaymentTerms: e.target.value })}
                placeholder={t.offerDetails.customPaymentTermsPlaceholder || "Enter custom payment terms..."}
                rows={2}
              />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="delivery_terms">
            {t.offerDetails.deliveryTerms || "Delivery Terms"}
          </Label>
          <Select
            value={offerDetails.deliveryTerms || 'immediate'}
            onValueChange={(value) => updateOfferDetails({ deliveryTerms: value })}
          >
            <SelectTrigger id="delivery_terms">
              <SelectValue placeholder={t.offerDetails.selectDeliveryTerms || "Select delivery terms"} />
            </SelectTrigger>
            <SelectContent>
              {deliveryTermsOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {offerDetails.deliveryTerms === 'custom' && (
            <div className="mt-2">
              <Textarea
                id="custom_delivery_terms"
                value={offerDetails.customDeliveryTerms || ''}
                onChange={(e) => updateOfferDetails({ customDeliveryTerms: e.target.value })}
                placeholder={t.offerDetails.customDeliveryTermsPlaceholder || "Enter custom delivery terms..."}
                rows={2}
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="discount">
          {t.offerDetails.discount || "Discount (%)"}
        </Label>
        <Input
          id="discount"
          type="number"
          min="0"
          max="100"
          value={offerDetails.discount || 0}
          onChange={(e) => updateOfferDetails({ discount: parseFloat(e.target.value) || 0 })}
          placeholder="0"
          className="w-full md:w-1/4"
        />
      </div>
    </div>
  );
};

export default PaymentDeliverySection;
