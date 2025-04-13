
import React from 'react';
import { SavedOffer } from '@/types/database';
import { Loader2 } from 'lucide-react';
import SavedOfferItem from './saved-offer-item';
import { Translations } from '@/types/language';

interface SavedOffersListProps {
  savedOffers: SavedOffer[];
  isLoading: boolean;
  searchTerm: string;
  loadOffer: (offer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  language: string;
  currency: string;
  t: Translations;
}

const SavedOffersList: React.FC<SavedOffersListProps> = ({
  savedOffers,
  isLoading,
  searchTerm,
  loadOffer,
  deleteOffer,
  language,
  currency,
  t
}) => {
  const formatOfferNumber = (offer: SavedOffer) => {
    // For draft offers, display the draft code instead of the offer number
    if (offer.is_draft && offer.draft_code) {
      return offer.draft_code;
    }
    
    // For regular offers, show the offer number normally
    return offer.offer_data?.details?.offerNumber || t.common.noName;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (savedOffers.length === 0) {
    // Display a message when no offers are found
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {searchTerm 
            ? t.savedOffers.noOffersFoundSearch 
            : t.savedOffers.noOffersFound}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {savedOffers.map((offer) => (
        <SavedOfferItem
          key={offer.id}
          offer={offer}
          onLoad={() => loadOffer(offer)}
          onDelete={() => deleteOffer(offer.id)}
          language={language}
          currency={currency}
          t={t}
          displayNumber={formatOfferNumber(offer)}
        />
      ))}
    </div>
  );
};

export default SavedOffersList;
