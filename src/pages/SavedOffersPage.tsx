
import React from 'react';
import { OfferProvider } from '@/context/offer/OfferContext';
import SavedOffersContent from '@/components/management/offers/SavedOffersContent';

const SavedOffersPage: React.FC = () => {
  return (
    <OfferProvider>
      <SavedOffersContent />
    </OfferProvider>
  );
};

export default SavedOffersPage;
