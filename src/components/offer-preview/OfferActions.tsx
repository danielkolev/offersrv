
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import html2pdf from 'html2pdf.js';
import ActionButtons from './ActionButtons';

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

  const getOfferFileName = () => {
    const clientName = offer.client.name || 'Client';
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    return `Offer-${clientName}-${date}`;
  };

  const handlePrint = () => {
    // Save original body state
    const originalOverflow = document.body.style.overflow;
    
    // Hide everything before printing
    document.body.classList.add('print-content');
    document.body.style.overflow = 'visible';
    
    // Print
    window.print();
    
    // Restore original state
    setTimeout(() => {
      document.body.classList.remove('print-content');
      document.body.style.overflow = originalOverflow;
    }, 500);
  };

  const handleExportPDF = () => {
    if (!offerContentRef.current) return;

    const element = offerContentRef.current;
    const filename = `${getOfferFileName()}.pdf`;
    
    const options = {
      margin: 10,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Add temporary class for PDF export
    element.classList.add('pdf-export');
    
    toast({
      title: t.common.processing,
      description: "Generating PDF...",
    });

    html2pdf().set(options).from(element).save().then(() => {
      // Remove temporary class
      element.classList.remove('pdf-export');
      
      toast({
        title: t.common.success,
        description: "PDF successfully generated",
      });
    }).catch((error) => {
      console.error("PDF generation error:", error);
      element.classList.remove('pdf-export');
      
      toast({
        title: t.common.error,
        description: "Failed to generate PDF",
        variant: 'destructive',
      });
    });
  };

  const handleCopy = () => {
    const offerElement = document.querySelector('.offer-preview-content');
    if (offerElement) {
      const range = document.createRange();
      range.selectNode(offerElement);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      
      toast({
        title: 'Copied to clipboard',
        description: 'The offer content has been copied to your clipboard',
      });
    }
  };

  return (
    <ActionButtons 
      onSave={() => setIsSaveDialogOpen(true)}
      onPrint={handlePrint}
      onExportPDF={handleExportPDF}
      onCopy={handleCopy}
      mode={mode}
    />
  );
};

export default OfferActions;
