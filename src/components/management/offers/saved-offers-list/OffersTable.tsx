
import React from 'react';
import { SavedOffer } from '@/types/database';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Translations } from '@/types/language';
import OfferTableRow from './OfferTableRow';
import { useIsMobile } from '@/hooks/use-mobile';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileOfferCard from './MobileOfferCard';

interface OffersTableProps {
  savedOffers: SavedOffer[];
  isLoading: boolean;
  searchTerm: string;
  onPreview: (offer: SavedOffer) => void;
  onLoad: (offer: SavedOffer) => void;
  onDelete: (offer: SavedOffer) => void;
  language: string;
  currency: string;
  t: Translations;
}

const OffersTable: React.FC<OffersTableProps> = ({
  savedOffers,
  isLoading,
  searchTerm,
  onPreview,
  onLoad,
  onDelete,
  language,
  currency,
  t
}) => {
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (savedOffers.length === 0) {
    // Show message when no offers found
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

  // Мобилен изглед с карти
  if (isMobile) {
    return (
      <div className="space-y-4">
        {savedOffers.map((offer) => (
          <MobileOfferCard
            key={offer.id}
            offer={offer}
            onPreview={onPreview}
            onLoad={onLoad}
            onDelete={onDelete}
            language={language}
            currency={currency}
            t={t}
          />
        ))}
      </div>
    );
  }

  // Десктоп изглед с таблица и хоризонтален скрол
  return (
    <ScrollArea className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.savedOffers.offerNumber}</TableHead>
            <TableHead>{t.savedOffers.client}</TableHead>
            <TableHead>{t.offer.status}</TableHead>
            <TableHead className="text-right">{t.savedOffers.amount}</TableHead>
            <TableHead>{t.savedOffers.date}</TableHead>
            <TableHead className="text-right">{t.savedOffers.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedOffers.map((offer) => (
            <OfferTableRow
              key={offer.id}
              offer={offer}
              onPreview={onPreview}
              onLoad={onLoad}
              onDelete={onDelete}
              language={language}
              currency={currency}
              t={t}
            />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default OffersTable;
