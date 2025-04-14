
import { useState } from 'react';
import { SavedOffer } from '@/types/database';

export const useOfferFilters = (savedOffers: SavedOffer[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  
  const getFilteredOffers = () => {
    let filtered = [...savedOffers];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => {
        // Check if offer_data exists before accessing properties
        if (!offer.offer_data) return false;
        
        const clientName = offer.offer_data.client?.name?.toLowerCase() || '';
        const offerNumber = offer.offer_data.details?.offerNumber?.toLowerCase() || '';
        return clientName.includes(searchLower) || offerNumber.includes(searchLower);
      });
    }
    
    // Apply status filter
    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(offer => {
        if (statusFilter === 'draft') {
          return offer.is_draft === true;
        }
        // Add more status filters when implemented
        return true;
      });
    }
    
    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(offer => {
        const offerDate = new Date(offer.created_at);
        return offerDate.toDateString() === filterDate.toDateString();
      });
    }
    
    // Only show non-draft offers in the main list
    return filtered.filter(offer => !offer.is_draft);
  };
  
  const resetFilters = () => {
    setStatusFilter('all');
    setDateFilter(undefined);
    setSearchTerm('');
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    dateFilter,
    setDateFilter,
    showFilters,
    setShowFilters,
    getFilteredOffers,
    resetFilters
  };
};
