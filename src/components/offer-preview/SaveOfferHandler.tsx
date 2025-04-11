
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { useOffer } from '@/context/offer/OfferContext';
import { saveOfferToDatabase } from '../management/offers/savedOffersService';
import SaveOfferDialog from '../SaveOfferDialog';

interface SaveOfferHandlerProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

const SaveOfferHandler: React.FC<SaveOfferHandlerProps> = ({ 
  isSaveDialogOpen, 
  setIsSaveDialogOpen 
}) => {
  const { user } = useAuth();
  const { offer } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

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
      
      await saveOfferToDatabase(user.id, offerToSave);
      
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSaved,
      });
      
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
      defaultName={`${offer.client.name} - ${new Date().toLocaleDateString()}`}
    />
  );
};

export default SaveOfferHandler;
