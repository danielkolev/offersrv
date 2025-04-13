
import { Offer } from '../../types/offer';

export const calculateSubtotal = (offer: Offer): number => {
  // Check if offer and products exist before trying to reduce
  if (!offer || !offer.products || !Array.isArray(offer.products)) {
    return 0;
  }
  
  return offer.products.reduce((sum, product) => {
    if (!product) return sum;
    return sum + (product.quantity || 0) * (product.unitPrice || 0);
  }, 0);
};

export const calculateVat = (offer: Offer): number => {
  // Make sure the offer exists before calculating
  if (!offer || !offer.details) {
    return 0;
  }
  
  const subtotal = calculateSubtotal(offer);
  
  if (offer.details.includeVat) {
    // If prices include VAT, we calculate the VAT component that's already included
    // Formula: VAT = Total × VAT_Rate ÷ (100 + VAT_Rate)
    return subtotal * (offer.details.vatRate / (100 + offer.details.vatRate));
  } else {
    // If prices don't include VAT, calculate additional VAT
    return subtotal * (offer.details.vatRate / 100);
  }
};

export const calculateTotal = (offer: Offer): number => {
  // Make sure the offer exists before calculating
  if (!offer || !offer.details) {
    return 0;
  }
  
  const subtotal = calculateSubtotal(offer);
  
  if (offer.details.includeVat) {
    // If prices already include VAT, don't add VAT again
    return subtotal + (offer.details.transportCost || 0) + (offer.details.otherCosts || 0);
  } else {
    // If prices don't include VAT, add VAT
    const vat = calculateVat(offer);
    return subtotal + vat + (offer.details.transportCost || 0) + (offer.details.otherCosts || 0);
  }
};
