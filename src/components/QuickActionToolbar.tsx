import React from 'react';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Copy, FileText, Save, Printer, Trash, Plus, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { printContent } from './offer-preview/utils/printUtils';
import { generatePdf, getOfferFileName } from './offer-preview/utils/pdfExport';

interface QuickActionToolbarProps {
  onPreview: () => void;
  onSave?: () => void;
}

const QuickActionToolbar = ({ onPreview, onSave }: QuickActionToolbarProps) => {
  const { resetOffer, addProduct, offer } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();

  const getOfferFileName = () => {
    const clientName = offer.client.name || 'Client';
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    return `Offer-${clientName}-${date}`;
  };

  const handleAddProduct = () => {
    addProduct({
      name: 'New Product',
      description: 'Product description',
      partNumber: '',
      quantity: 1,
      unitPrice: 0
    });
    
    toast({
      title: t.common.success,
      description: 'New product added',
    });
  };

  const handleCopyOffer = () => {
    // This is a placeholder for future functionality
    toast({
      title: t.common.success,
      description: 'Offer copied (placeholder)',
    });
  };

  const handlePrint = () => {
    onPreview();
    setTimeout(() => {
      printContent();
    }, 500);
  };

  const handleExportPDF = () => {
    onPreview();
    setTimeout(() => {
      const element = document.querySelector('.offer-preview-content');
      if (!element) return;
      
      const filename = `${getOfferFileName(offer.client.name)}.pdf`;
      
      generatePdf(
        element,
        filename,
        () => {
          toast({
            title: t.common.processing,
            description: "Generating PDF...",
          });
        },
        () => {
          toast({
            title: t.common.success,
            description: "PDF successfully generated",
          });
        },
        (error) => {
          console.error("PDF generation error:", error);
          
          toast({
            title: t.common.error,
            description: "Failed to generate PDF",
            variant: 'destructive',
          });
        }
      );
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm(t.common.areYouSure)) {
      resetOffer();
      toast({
        title: t.common.success,
        description: 'Offer reset successfully',
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 no-print">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAddProduct}
          title={t.products.addProduct}
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPreview} 
          title={t.common.preview}
        >
          <FileText className="h-5 w-5" />
        </Button>
        
        {onSave && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSave}
            title={t.savedOffers.saveOffer}
          >
            <Save className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handlePrint}
          title={t.common.print}
        >
          <Printer className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleExportPDF}
          title="Export PDF"
        >
          <FileDown className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopyOffer}
          title={t.common.copy}
        >
          <Copy className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleReset}
          className="hover:text-red-500"
          title={t.common.reset}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuickActionToolbar;
