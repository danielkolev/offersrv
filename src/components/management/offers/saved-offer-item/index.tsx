
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
  
  // Get the total amount from the offer data
  const calculateTotal = () => {
    let subtotal = 0;
    
    // Calculate the subtotal from products
    offer_data.products.forEach(product => {
      subtotal += product.quantity * product.unitPrice;
    });
    
    // Add additional costs
    const total = subtotal + 
      (offer_data.details.transportCost || 0) +
      (offer_data.details.otherCosts || 0);
    
    // Add VAT if needed
    return offer_data.details.includeVat 
      ? total * (1 + (offer_data.details.vatRate || 0) / 100) 
      : total;
  };

  // Format the date according to the current language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });
  };

  // Get the name of the offer (if available) or use client name as fallback
  const offerName = savedOffer.name || offer_data.name || offer_data.client.name;
  
  // Format display of offer details
  const displayOfferNumber = `#${offer_data.details.offerNumber || '---'}`;

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{displayOfferNumber}</div>
        {offerName && offerName !== offer_data.client.name && (
          <div className="text-sm text-muted-foreground">{offerName}</div>
        )}
      </TableCell>
      <TableCell>{formatDate(created_at)}</TableCell>
      <TableCell>{offer_data.client.name}</TableCell>
      <TableCell className="text-right">
        {formatCurrencyValue(calculateTotal(), currency)}
      </TableCell>
      <TableCell className="text-right">
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
