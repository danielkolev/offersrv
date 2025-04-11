
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import OfferPreview from '@/components/OfferPreview';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';

interface OfferPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OfferPreviewModal = ({ open, onOpenChange }: OfferPreviewModalProps) => {
  const { resetOffer } = useOffer();
  const { t } = useLanguage();
  
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    // Restore original offer when dialog is closed
    if (!open) resetOffer();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
