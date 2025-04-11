
import React from 'react';
import { Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import SavedOfferItem from './SavedOfferItem';
import { SavedOffersListProps } from './types';
import { SupportedLanguage, SupportedCurrency } from '@/types/language/base';

const SavedOffersList = ({ 
  savedOffers, 
  isLoading, 
  searchTerm, 
  loadOffer, 
  deleteOffer, 
  language, 
  currency, 
  t 
}: SavedOffersListProps) => {
  const filteredOffers = savedOffers.filter(offer => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    const clientName = offer.offer_data.client.name.toLowerCase();
    const offerNumber = offer.offer_data.details.offerNumber.toLowerCase();
    const offerDate = new Date(offer.offer_data.details.date)
      .toLocaleDateString(language as SupportedLanguage)
      .toLowerCase();
    
    return clientName.includes(searchLower) || 
           offerNumber.includes(searchLower) ||
           offerDate.includes(searchLower);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (filteredOffers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {searchTerm 
          ? t.savedOffers.noOffersFoundSearch 
          : t.savedOffers.noOffersFound}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.savedOffers.offerNumber}</TableHead>
          <TableHead>{t.savedOffers.date}</TableHead>
          <TableHead>{t.savedOffers.clientName}</TableHead>
          <TableHead className="text-right">{t.savedOffers.amount}</TableHead>
          <TableHead className="text-right">{t.savedOffers.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOffers.map((savedOffer) => (
          <SavedOfferItem
            key={savedOffer.id}
            savedOffer={savedOffer}
            loadOffer={loadOffer}
            deleteOffer={deleteOffer}
            language={language}
            currency={currency}
            t={t}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedOffersList;
