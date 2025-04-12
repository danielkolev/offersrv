
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { SavedOfferItemProps } from '../types';
import { formatCurrencyValue } from './helpers';
import OfferActionButtons from './OfferActionButtons';

const SavedOfferItem = ({ 
  savedOffer, 
  loadOffer, 
  deleteOffer, 
  language, 
  currency, 
  t 
}: SavedOfferItemProps) => {
  const { offer_data, created_at } = savedOffer;
  
  // Safely handle missing or incomplete offer data
  const offerDetails = offer_data?.details || {};
  const offerClient = offer_data?.client || {};

  // Calculate the total amount from the offer data
  const calculateTotal = () => {
    try {
      let subtotal = 0;
      
      // Calculate the subtotal from products
      (offer_data?.products || []).forEach(product => {
        subtotal += product.quantity * product.unitPrice;
      });
      
      // Add additional costs
      const total = subtotal + 
        (offerDetails.transportCost || 0) +
        (offerDetails.otherCosts || 0);
      
      // Add VAT if needed
      return offerDetails.includeVat 
        ? total * (1 + (offerDetails.vatRate || 0) / 100) 
        : total;
    } catch (error) {
      console.error('Error calculating total:', error);
      return 0;
    }
  };

  // Format the date safely
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Get the name of the offer with multiple fallbacks
  const offerName = savedOffer.name || 
    offer_data?.name || 
    offerClient.name || 
    'Unnamed Offer';
  
  // Safely display offer number with fallback
  const displayOfferNumber = `#${offerDetails.offerNumber || '---'}`;

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{displayOfferNumber}</div>
        {offerName && offerName !== offerClient.name && (
          <div className="text-sm text-muted-foreground">{offerName}</div>
        )}
      </TableCell>
      <TableCell>{formatDate(created_at)}</TableCell>
      <TableCell>{offerClient.name || 'Unknown Client'}</TableCell>
      <TableCell className="text-right">
        {formatCurrencyValue(calculateTotal(), currency)}
      </TableCell>
      <TableCell>
        <OfferActionButtons
          savedOffer={savedOffer}
          loadOffer={loadOffer}
          deleteOffer={deleteOffer}
          t={t}
        />
      </TableCell>
    </TableRow>
  );
};

export default SavedOfferItem;
