
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import ActionButtons from './ActionButtons';
import { generatePdf, getOfferFileName } from './utils/pdfExport';
import { copyToClipboard } from './utils/copyUtils';

interface OfferActionsProps {
  offerContentRef: React.RefObject<HTMLDivElement>;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
  mode?: 'edit' | 'view';
}

const OfferActions: React.FC<OfferActionsProps> = ({ 
  offerContentRef, 
  setIsSaveDialogOpen,
  mode = 'edit' 
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { offer } = useOffer();

  const handleExportPDF = () => {
    // Only allow exporting in view mode
    if (mode === 'edit') {
      toast({
        title: t.common.info || "Info",
        description: t.savedOffers.saveBeforeAction || "Please save the offer before exporting to PDF",
      });
      return;
    }
    
    if (!offerContentRef.current) return;

    const element = offerContentRef.current;
    const filename = `${getOfferFileName(offer.client.name, offer.details.offerNumber)}.pdf`;
    
    generatePdf(
      element,
      filename,
      () => {
        toast({
          title: t.common.processing,
          description: t.offer.offerPreview.generatingPdf || "Generating PDF...",
        });
      },
      () => {
        toast({
          title: t.common.success,
          description: t.offer.offerPreview.pdfGenerated || "PDF successfully generated",
        });
      },
      (error) => {
        toast({
          title: t.common.error,
          description: t.offer.offerPreview.pdfError || "Failed to generate PDF",
          variant: 'destructive',
        });
      }
    );
  };

  const handleCopy = () => {
    copyToClipboard('.offer-preview-content', () => {
      toast({
        title: t.common.copied || 'Copied to clipboard',
        description: t.offer.offerPreview.contentCopied || 'The offer content has been copied to your clipboard',
      });
    });
  };

  return (
    <>
      <ActionButtons 
        onSave={() => setIsSaveDialogOpen(true)}
        onExportPDF={handleExportPDF}
        onCopy={handleCopy}
        mode={mode}
      />
    </>
  );
};

export default OfferActions;
