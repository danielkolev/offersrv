import React from 'react';
import { SavedOffer } from '@/types/database';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage, SupportedCurrency } from '@/types/language/base';
import { Translations } from '@/types/language';
import { format } from 'date-fns';
import { calculateTotal } from '@/context/offer/calculations';
import OfferStatusBadge from './OfferStatusBadge';

interface OfferTableRowProps {
  offer: SavedOffer;
  onPreview: (offer: SavedOffer) => void;
  onLoad: (offer: SavedOffer) => void;
  onDelete: (offer: SavedOffer) => void;
  language: string;
  currency: string;
  t: Translations;
}

const OfferTableRow: React.FC<OfferTableRowProps> = ({
  offer,
  onPreview,
  onLoad,
  onDelete,
  language,
  currency,
  t
}) => {
  // Format offer number
  const formatOfferNumber = (offer: SavedOffer) => {
    // For draft offers, show the draft code instead of the offer number
    if (offer.is_draft && offer.draft_code) {
      return offer.draft_code;
    }
    
    // For regular offers, show the offer number
    return offer.offer_data?.details?.offerNumber || t.common.noName;
  };

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  // Calculate total amount - with safety checks
  const calculateOfferTotal = (offer: SavedOffer) => {
    try {
      if (!offer.offer_data) return 0;
      return calculateTotal(offer.offer_data);
    } catch (error) {
      console.error("Error calculating offer total:", error, offer);
      return 0;
    }
  };

  // Convert string to SupportedLanguage
  const typedLanguage = (language === 'bg' || language === 'en') ? language as SupportedLanguage : 'en';

  // Get the currency from the offer data or use the global currency as fallback
  const getOfferCurrency = () => {
    return (offer.offer_data?.details?.currency || currency) as SupportedCurrency;
  };

  // Safely get client name
  const getClientName = () => {
    return offer.offer_data?.client?.name || t.common.noName;
  };

  // Safely get client email
  const getClientEmail = () => {
    return offer.offer_data?.client?.email || '';
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        #{formatOfferNumber(offer)}
      </TableCell>
      <TableCell>
        <div>
          <div className="font-medium">
            {getClientName()}
          </div>
          <div className="text-xs text-muted-foreground">
            {getClientEmail()}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <OfferStatusBadge 
          status={offer.status || 'saved'} 
          t={t} 
          isDraft={offer.is_draft} 
        />
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(calculateOfferTotal(offer), typedLanguage, getOfferCurrency())}
      </TableCell>
      <TableCell>
        <div className="text-sm">
          {formatDate(offer.created_at)}
          <div className="text-xs text-muted-foreground">
            {t.common.update}: {formatDate(offer.updated_at)}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => onPreview(offer)}>
                  <Eye className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.savedOffers.viewOffer}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => onLoad(offer)}>
                  <FileEdit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.savedOffers.loadOffer}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => onDelete(offer)}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t.savedOffers.deleteOffer}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OfferTableRow;
