
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { useOffer } from '@/context/offer/OfferContext';
import { saveOfferToDatabase } from '../management/offers/savedOffersService';
import { deleteDraftFromDatabase } from '../management/offers/draftOffersService';
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
    
    // Validate client name before saving
    if (!offer.client.name || offer.client.name.trim() === '') {
      toast({
        title: t.common.error,
        description: t.clientInfo.nameRequired,
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
      
      // This will also check and save new clients and products
      const savedOffer = await saveOfferToDatabase(user.id, offerToSave);
      
      // Update the current offer with the server-assigned offer number
      setOffer(savedOffer.offer_data);
      
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSavedWithDetails,
      });

      // Delete any associated draft after successfully saving the offer
      // This is a new step to ensure drafts don't remain after finalizing
      try {
        await deleteDraftFromDatabase(user.id);
        console.log('Draft deleted after saving final offer');
      } catch (draftError) {
        console.error('Error deleting draft after save:', draftError);
        // We don't want to block the save confirmation if draft deletion fails
      }
      
      setIsSaveDialogOpen(false);
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
