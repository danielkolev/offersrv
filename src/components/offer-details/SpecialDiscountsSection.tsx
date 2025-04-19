
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Plus, Trash2 } from 'lucide-react';
import { OfferDetails } from '@/types/offer';
import { Translations } from '@/types/language';
import { Card, CardContent } from '@/components/ui/card';

interface SpecialDiscountsSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const SpecialDiscountsSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: SpecialDiscountsSectionProps) => {
  const [discountAmount, setDiscountAmount] = useState<string>('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountDescription, setDiscountDescription] = useState<string>('');

  const handleAddDiscount = () => {
    const amount = parseFloat(discountAmount);
    if (isNaN(amount) || amount <= 0) return;

    const newDiscount = {
      amount,
      type: discountType,
      description: discountDescription
    };

    const currentDiscounts = offerDetails.specialDiscounts || [];
    updateOfferDetails({
      specialDiscounts: [...currentDiscounts, newDiscount]
    });

    // Reset form
    setDiscountAmount('');
    setDiscountDescription('');
  };

  const handleRemoveDiscount = (index: number) => {
    const currentDiscounts = [...(offerDetails.specialDiscounts || [])];
    currentDiscounts.splice(index, 1);
    updateOfferDetails({ specialDiscounts: currentDiscounts });
  };

  return (
    <div className="mb-6">
      <Label className="text-base font-medium mb-2 block">
        {t.offerDetails?.specialDiscounts || "Special Discounts"}
      </Label>

      {(offerDetails.specialDiscounts || []).length > 0 && (
        <div className="mb-4 space-y-2">
          {offerDetails.specialDiscounts?.map((discount, index) => (
            <Card key={index} className="bg-slate-50">
              <CardContent className="p-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">
                    {discount.amount} {discount.type === 'percentage' ? '%' : t.common?.currency}
                    {' - '}
                    {discount.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {discount.type === 'percentage' 
                      ? t.offerDetails?.percentageDiscount 
                      : t.offerDetails?.fixedDiscount}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveDiscount(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="border p-4 rounded-md bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="discountType">
              {t.offerDetails?.discountType || "Discount Type"}
            </Label>
            <RadioGroup 
              value={discountType} 
              onValueChange={(v) => setDiscountType(v as 'percentage' | 'fixed')}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="percentage" id="percentage" />
                <Label htmlFor="percentage">
                  {t.offerDetails?.percentageDiscount || "Percentage"}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fixed" id="fixed" />
                <Label htmlFor="fixed">
                  {t.offerDetails?.fixedDiscount || "Fixed Amount"}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="discountAmount">
              {t.offerDetails?.discountAmount || "Discount Amount"}
            </Label>
            <Input
              id="discountAmount"
              type="number"
              min="0"
              step={discountType === 'percentage' ? '1' : '0.01'}
              value={discountAmount}
              onChange={(e) => setDiscountAmount(e.target.value)}
              placeholder={discountType === 'percentage' ? '10' : '100.00'}
            />
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="discountDescription" className="mb-2 block">
            {t.offerDetails?.discountDescription || "Discount Description"}
          </Label>
          <Textarea
            id="discountDescription"
            value={discountDescription}
            onChange={(e) => setDiscountDescription(e.target.value)}
            placeholder="Early payment discount"
            rows={2}
          />
        </div>

        <Button 
          type="button" 
          onClick={handleAddDiscount}
          disabled={!discountAmount || parseFloat(discountAmount) <= 0}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t.offerDetails?.addDiscount || "Add Discount"}
        </Button>
      </div>
    </div>
  );
};

export default SpecialDiscountsSection;
