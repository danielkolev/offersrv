
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { SavedOfferItemProps } from '../types';
import { formatCurrencyValue } from './helpers';
import OfferActionButtons from './OfferActionButtons';
import { OfferDetails, ClientInfo } from '@/types/offer';

const SavedOfferItem = ({ 
  savedOffer, 
  loadOffer, 
  deleteOffer, 
  language, 
  currency, 
  t 
}: SavedOfferItemProps) => {
  const { offer_data, created_at, updated_at } = savedOffer;
  
  // Safely handle missing or incomplete offer data with proper typing
  const offerDetails: OfferDetails = offer_data?.details || {
    offerNumber: '',
    date: '',
    validUntil: '',
    showPartNumber: false,
    includeVat: false,
    vatRate: 0,
    transportCost: 0,
    otherCosts: 0,
    notes: '',
    offerLanguage: 'bg'
  };
  
  const offerClient: ClientInfo = offer_data?.client || {
    name: '',
    contactPerson: '',
    address: '',
    city: '',
    country: '',
    vatNumber: '',
    email: '',
    phone: ''
  };

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

  // Get status of the offer (draft, sent, accepted, rejected)
  const getOfferStatus = () => {
    // For now, determine if it's a draft based on is_draft flag
    if (savedOffer.is_draft) {
      return t.offer.statuses.draft;
    }
    
    // In the future, we can get this from the offer_data
    return '';
  };

  // Get the name of the offer with multiple fallbacks
  const offerName = savedOffer.name || 
    offer_data?.name || 
    offerClient.name || 
    'Unnamed Offer';
  
  // Safely display offer number with fallback
  const displayOfferNumber = `#${offerDetails.offerNumber || '---'}`;
  
  // Get offer status
  const offerStatus = getOfferStatus();

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{displayOfferNumber}</div>
        {offerName && offerName !== offerClient.name && (
          <div className="text-sm text-muted-foreground">{offerName}</div>
        )}
        {offerStatus && (
          <div className="mt-1">
            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
              {offerStatus}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell>
        <div>{formatDate(created_at)}</div>
        {updated_at && updated_at !== created_at && (
          <div className="text-xs text-muted-foreground">
            {t.offer.lastEdited}: {formatDate(updated_at)}
          </div>
        )}
      </TableCell>
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
