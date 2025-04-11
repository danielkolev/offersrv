
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { useOffer } from '@/context/offer/OfferContext';
import { saveOfferToDatabase } from '../management/offers/savedOffersService';
import SaveOfferDialog from '../SaveOfferDialog';
import { useNavigate } from 'react-router-dom';

interface SaveOfferHandlerProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const SaveOfferHandler: React.FC<SaveOfferHandlerProps> = ({ 
  isSaveDialogOpen, 
  setIsSaveDialogOpen 
}) => {
  const { user } = useAuth();
  const { offer, setOffer } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSaveOffer = async (offerName: string) => {
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
      // Create a copy of the offer with the custom name
      const offerToSave = {
        ...offer,
        name: offerName,
      };
      
      const savedOffer = await saveOfferToDatabase(user.id, offerToSave);
      
      // Update the current offer with the server-assigned offer number
      setOffer(savedOffer.offer_data);
      
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSaved,
      });
      
      setIsSaveDialogOpen(false);
      
      // Optionally navigate to saved offers page to see the new offer
      // navigate('/saved-offers');
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
    <SaveOfferDialog
      open={isSaveDialogOpen}
      onClose={() => setIsSaveDialogOpen(false)}
      onSave={handleSaveOffer}
      isLoading={isSaving}
      defaultName={`${offer.client.name} - #${offer.details.offerNumber || ''} - ${new Date().toLocaleDateString()}`}
    />
  );
};

export default SaveOfferHandler;
