
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getLatestDraftFromDatabase } from '@/components/management/offers/draft';

export const useDraftOfferCheck = () => {
  const { user } = useAuth();
  const [hasDraft, setHasDraft] = useState(false);

  // Check for existing draft offer
  const checkForDraftOffer = async () => {
    if (!user) return;
    
    try {
      const draftOffer = await getLatestDraftFromDatabase(user.id);
      if (draftOffer) {
        setHasDraft(true);
      } else {
        setHasDraft(false);
      }
    } catch (error) {
      console.error("Error checking for draft offer:", error);
      setHasDraft(false);
    }
  };

  // Check on mount
  useEffect(() => {
    if (user) {
      checkForDraftOffer();
    }
  }, [user]);

  return { hasDraft };
};
