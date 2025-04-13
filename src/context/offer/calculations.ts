
import { Offer } from '../../types/offer';

export const calculateSubtotal = (offer: Offer): number => {
  return offer.products.reduce((sum, product) => {
    return sum + product.quantity * product.unitPrice;
  }, 0);
};

export const calculateVat = (offer: Offer): number => {
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
  const subtotal = calculateSubtotal(offer);
  
  if (offer.details.includeVat) {
    // If prices already include VAT, don't add VAT again
    return subtotal + offer.details.transportCost + offer.details.otherCosts;
  } else {
    // If prices don't include VAT, add VAT
    const vat = calculateVat(offer);
    return subtotal + vat + offer.details.transportCost + offer.details.otherCosts;
  }
};
