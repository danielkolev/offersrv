
import React, { useState } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import ActionButtons from './ActionButtons';
import { generatePdf, getOfferFileName } from './utils/pdfExport';
import { printContent } from './utils/printUtils';
import { copyToClipboard } from './utils/copyUtils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
  const [isPrintDialogOpen, setIsPrintDialogOpen] = useState(false);
  const [includeDateAndSignature, setIncludeDateAndSignature] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    // Only allow printing in view mode
    if (mode === 'edit') {
      toast({
        title: t.common.info || "Info",
        description: t.savedOffers.saveBeforeAction || "Please save the offer before printing",
      });
      return;
    }
    
    // Open print dialog to ask about date and signature
    setIsPrintDialogOpen(true);
  };

  const handleConfirmPrint = () => {
    // Set printing state to prevent multiple clicks
    setIsPrinting(true);
    
    // First close the dialog
    setIsPrintDialogOpen(false);
    
    // Wait for dialog animation to complete before printing
    setTimeout(() => {
      // Execute print after dialog is closed
      printContent(includeDateAndSignature);
      // Reset printing state
      setIsPrinting(false);
    }, 300);
  };

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
        onPrint={handlePrint}
        onExportPDF={handleExportPDF}
        onCopy={handleCopy}
        mode={mode}
      />
      
      <Dialog open={isPrintDialogOpen} onOpenChange={setIsPrintDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.common.print || "Принтиране"}</DialogTitle>
            <DialogDescription>
              {t.offer.offerPreview.printOptionsDescription || "Изберете опции за принтиране"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-start space-x-2 my-4">
            <Checkbox 
              id="include-date-signature" 
              checked={includeDateAndSignature} 
              onCheckedChange={(checked) => setIncludeDateAndSignature(checked as boolean)}
            />
            <Label 
              htmlFor="include-date-signature" 
              className="leading-tight cursor-pointer"
            >
              {t.offer.offerPreview.includeDateAndSignature || "Добави полета за дата и подпис"}
            </Label>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPrintDialogOpen(false)}>
              {t.common.cancel || "Отказ"}
            </Button>
            <Button 
              onClick={handleConfirmPrint} 
              disabled={isPrinting}
            >
              {t.common.print || "Принтирай"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfferActions;
