
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import BasicDetailsSection from './offer-details/BasicDetailsSection';
import DateSection from './offer-details/DateSection';
import TimestampsSection from './offer-details/TimestampsSection';
import OptionsSection from './offer-details/OptionsSection';
import CostsSection from './offer-details/CostsSection';
import NotesSection from './offer-details/NotesSection';
import PaymentDeliverySection from './offer-details/PaymentDeliverySection';
import { SupportedCurrency } from '@/types/language/base';

const OfferDetailsForm = () => {
  const { offer, updateOfferDetails, lastSaved } = useOffer();
  const { t, currency, setCurrency } = useLanguage();

  // Convert Date object to string format
  const creationDate = offer.details.date 
    ? new Date(offer.details.date).toLocaleString() 
    : new Date().toLocaleString();
    
  const handleCurrencyChange = (value: string) => {
    const currencyValue = value as SupportedCurrency;
    setCurrency(currencyValue);
    updateOfferDetails({ currency: currencyValue });
  };

  return (
    <Card className="mb-6 bg-gray-50">
      <CardHeader>
        <CardTitle>{t.offerDetails?.title || "Offer Details"}</CardTitle>
      </CardHeader>
      <CardContent>
        <BasicDetailsSection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
          currency={currency}
          handleCurrencyChange={handleCurrencyChange}
        />
        
        <DateSection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
        />
        
        <PaymentDeliverySection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
        />
        
        <TimestampsSection
          creationDate={creationDate}
          lastSaved={lastSaved ? lastSaved.toLocaleString() : null}
          t={t}
        />
        
        <OptionsSection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
        />
        
        <CostsSection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
        />
        
        <NotesSection
          offerDetails={offer.details}
          updateOfferDetails={updateOfferDetails}
          t={t}
        />
      </CardContent>
    </Card>
  );
};

export default OfferDetailsForm;
