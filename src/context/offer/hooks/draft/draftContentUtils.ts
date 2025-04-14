
import { Offer } from '@/types/offer';

// Helper to check if an offer has meaningful content
export const hasMeaningfulContent = (offer: Offer): boolean => {
  // Ensure we have a valid offer object with all required properties
  if (!offer || !offer.client || !offer.products || !offer.details) {
    console.log("Invalid offer structure for meaningful content check");
    return false;
  }
  
  // Check if client has at least a name
  const hasClientInfo = offer.client.name && offer.client.name.trim() !== '';
  
  // Check if there are any products
  const hasProducts = offer.products && offer.products.length > 0;
  
  // Check if there are meaningful offer details (notes, custom number, etc.)
  const hasOfferDetails = 
    (offer.details.notes && offer.details.notes.trim() !== '') || 
    (offer.details.offerNumber && 
     offer.details.offerNumber !== '00000' && 
     offer.details.offerNumber.trim() !== '');
  
  return hasClientInfo || hasProducts || hasOfferDetails;
};
