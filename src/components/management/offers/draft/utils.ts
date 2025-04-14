
import { v4 as uuidv4 } from 'uuid';
import { Offer } from '@/types/offer';

// Generate a unique draft code (alphanumeric)
export const generateDraftCode = (): string => {
  // Create a shortened UUID-based code - first 8 chars
  return `DRAFT-${uuidv4().substring(0, 8)}`;
};

// Helper to check if an offer has meaningful content worth saving
export const hasMeaningfulContent = (offer: Offer): boolean => {
  if (!offer || !offer.client || !offer.products || !offer.details) {
    console.log("Invalid offer structure for meaningful content check");
    return false;
  }
  
  // Check if client has at least a name
  const hasClientInfo = offer.client?.name && offer.client.name.trim() !== '';
  
  // Check if there are any products
  const hasProducts = offer.products && offer.products.length > 0;
  
  // Check if there are meaningful offer details (notes, custom number, etc.)
  const hasOfferDetails = 
    (offer.details?.notes && offer.details.notes.trim() !== '') || 
    (offer.details?.offerNumber && 
     offer.details.offerNumber !== '00000' && 
     offer.details.offerNumber.trim() !== '');
  
  return hasClientInfo || hasProducts || hasOfferDetails;
};
