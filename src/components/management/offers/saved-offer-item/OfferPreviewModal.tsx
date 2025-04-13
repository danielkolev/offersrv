
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import OfferPreview from '@/components/OfferPreview';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';

interface OfferPreviewModalProps {
  savedOffer: SavedOffer;
  isOpen: boolean;
  onClose: () => void;
}

const OfferPreviewModal = ({ savedOffer, isOpen, onClose }: OfferPreviewModalProps) => {
  const { offer, setOffer, resetOffer } = useOffer();
  const { t } = useLanguage();
  
  // When the modal opens, temporarily set the offer to the saved offer for preview
  React.useEffect(() => {
    if (isOpen && savedOffer && savedOffer.offer_data) {
      setOffer(savedOffer.offer_data);
    }
    
    // Cleanup when modal closes
    return () => {
      if (!isOpen) {
        resetOffer();
      }
    };
  }, [isOpen, savedOffer, setOffer, resetOffer]);

  // Добавяме обработка на затварянето на модалния прозорец
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Малко забавяне преди да се възстанови фокуса
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <DialogTitle className="sr-only">{t.offer.offerPreview}</DialogTitle>
        <OfferPreview
          isSaveDialogOpen={false}
          setIsSaveDialogOpen={() => {}}
          mode="view"
        />
      </DialogContent>
    </Dialog>
  );
};

export default OfferPreviewModal;
