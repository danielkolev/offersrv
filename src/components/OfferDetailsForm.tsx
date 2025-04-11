import React, { useEffect } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/context/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

const OfferDetailsForm = () => {
  const { offer, updateOfferDetails } = useOffer();
  const { t } = useLanguage();
  const { user } = useAuth();

  // Generate a unique offer number when the component mounts if none exists
  useEffect(() => {
    const generateOfferNumber = async () => {
      // Only generate if the offer doesn't already have a number
      if (!offer.details.offerNumber || offer.details.offerNumber === '') {
        try {
          if (!user) {
            console.error("User not authenticated");
            return;
          }

          // Get the highest offer number from the database for the current user
          const { data, error } = await supabase
            .from('saved_offers')
            .select('offer_data')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1);

          if (error) {
            console.error('Error fetching latest offer number:', error);
            return;
          }

          let nextNumber = 1;
          
          // If there are existing offers, extract the highest number and increment it
          if (data && data.length > 0 && data[0].offer_data) {
            // Convert to the expected type and access the details safely
            const offerData = data[0].offer_data as any;
            if (offerData.details && offerData.details.offerNumber) {
              const lastOfferNumber = offerData.details.offerNumber;
              // Try to parse the numerical part of the offer number
              const numericPart = parseInt(lastOfferNumber.replace(/\D/g, ''), 10);
              if (!isNaN(numericPart)) {
                nextNumber = numericPart + 1;
              }
            }
          }
          
          // Format the number with leading zeros
          const formattedNumber = nextNumber.toString().padStart(5, '0');
          updateOfferDetails({ offerNumber: formattedNumber });
        } catch (err) {
          console.error('Error generating offer number:', err);
          // Fallback to a timestamp-based number if there's an error
          const timestamp = new Date().getTime().toString().slice(-5);
          updateOfferDetails({ offerNumber: timestamp });
        }
      }
    };

    generateOfferNumber();
  }, [user]);

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
