
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';
import { fetchSavedOffers, deleteOfferFromDatabase } from '@/components/management/offers/saved';

export const useSavedOffers = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch saved offers
  const handleFetchSavedOffers = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const offers = await fetchSavedOffers();
      setSavedOffers(offers as SavedOffer[]);
    } catch (error: any) {
      console.error('Error fetching saved offers:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete an offer
  const handleDeleteOffer = async (id: string) => {
    try {
      await deleteOfferFromDatabase(id);
      setSavedOffers(prev => prev.filter(offer => offer.id !== id));
      toast({
        title: t.common.success,
        description: t.savedOffers.offerDeleted,
      });
    } catch (error: any) {
      console.error('Error deleting offer:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    if (user) {
      handleFetchSavedOffers();
    }
  }, [user]);

  return {
    savedOffers,
    setSavedOffers,
    isLoading,
    handleFetchSavedOffers,
    handleDeleteOffer
  };
};
