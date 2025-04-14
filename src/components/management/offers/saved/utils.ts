
import { SavedOffer } from '@/types/database';

/**
 * Validates and normalizes the status of a saved offer
 */
export const normalizeOfferStatus = (statusValue?: string): SavedOffer['status'] => {
  // Validate status is one of the allowed values
  if (statusValue === 'sent' || statusValue === 'accepted' || 
      statusValue === 'rejected' || statusValue === 'draft') {
    return statusValue;
  }
  
  // Default to 'saved' for any other value
  return 'saved';
};

/**
 * Generate a default offer name based on client and offer details
 */
export const generateDefaultOfferName = (
  clientName: string,
  offerNumber: string
): string => {
  return `${clientName} - #${offerNumber} - ${new Date().toLocaleDateString()}`;
};
