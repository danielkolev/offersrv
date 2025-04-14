
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { saveOfferToDatabase } from '@/components/management/offers/saved';

// Import hooks
import { useSavedOffers } from './saved-offers-list/hooks/useSavedOffers';
import { useDraftOfferCheck } from './saved-offers-list/hooks/useDraftOfferCheck';
import { useOfferNavigation } from './saved-offers-list/hooks/useOfferNavigation';
import { useOfferFilters } from './saved-offers-list/hooks/useOfferFilters';

// Import components
import SavedOffersList from '@/components/management/offers/SavedOffersList';
import OffersHeader from './saved-offers-list/OffersHeader';
import DraftOfferCard from './saved-offers-list/DraftOfferCard';
import OffersFilter from './saved-offers-list/OffersFilter';

const SavedOffersContent: React.FC = () => {
  const { user } = useAuth();
  const { offer } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const [isSaving, setIsSaving] = useState(false);
  
  // Use custom hooks
  const { savedOffers, setSavedOffers, isLoading, handleDeleteOffer } = useSavedOffers();
  const { hasDraft } = useDraftOfferCheck();
  const { handleOpenDraftOffer, handleCreateNewOffer, handleLoadOffer } = useOfferNavigation();
  const { 
    searchTerm, setSearchTerm,
    statusFilter, setStatusFilter,
    dateFilter, setDateFilter,
    showFilters, setShowFilters,
    getFilteredOffers, resetFilters
  } = useOfferFilters(savedOffers);

  const handleSaveOffer = async () => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const newOffer = await saveOfferToDatabase(user.id, offer);
      setSavedOffers(prev => [newOffer as any, ...prev]);
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSaved,
      });
    } catch (error: any) {
      console.error('Error saving offer:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <OffersHeader 
        onCreateNew={handleCreateNewOffer}
        onSaveOffer={handleSaveOffer}
        isSaving={isSaving}
        t={t}
      />
      
      {hasDraft && (
        <DraftOfferCard onOpenDraft={handleOpenDraftOffer} t={t} />
      )}
      
      <OffersFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        resetFilters={resetFilters}
        t={t}
      />
      
      <SavedOffersList
        savedOffers={getFilteredOffers()}
        isLoading={isLoading}
        searchTerm={searchTerm}
        loadOffer={handleLoadOffer}
        deleteOffer={handleDeleteOffer}
        language={language}
        currency={currency}
        t={t}
      />
    </div>
  );
};

export default SavedOffersContent;
