
import { Offer } from '../../types/offer';

export const calculateSubtotal = (offer: Offer): number => {
  return offer.products.reduce((sum, product) => {
    return sum + product.quantity * product.unitPrice;
  }, 0);
};

export const calculateVat = (offer: Offer): number => {
  return offer.details.includeVat 
    ? calculateSubtotal(offer) * (offer.details.vatRate / 100) 
    : 0;
};

export const calculateTotal = (offer: Offer): number => {
  const subtotal = calculateSubtotal(offer);
  const vat = calculateVat(offer);
  return subtotal + vat + offer.details.transportCost + offer.details.otherCosts;
};
