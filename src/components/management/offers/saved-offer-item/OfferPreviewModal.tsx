
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
  
  // При отваряне на модалния прозорец, временно задаваме офертата за преглед
  React.useEffect(() => {
    if (isOpen && savedOffer && savedOffer.offer_data) {
      setOffer(savedOffer.offer_data);
    }
    
    // Почистване при затваряне на модалния прозорец
    return () => {
      if (!isOpen) {
        resetOffer();
      }
    };
  }, [isOpen, savedOffer, setOffer, resetOffer]);

  // Обработка на затварянето на диалога
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
      // Малко закъснение преди възстановяване на фокуса
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  // Проверка дали офертните данни съществуват
  if (!savedOffer || !savedOffer.offer_data) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <DialogTitle className="sr-only">{t.offer.offerPreview.offerPreview}</DialogTitle>
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
