
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, FileDown, Printer, Trash2 } from 'lucide-react';
import { SavedOffer } from '@/types/database';
import { useNavigate } from 'react-router-dom';
import { exportToPdf, getOfferFileName, handlePrint } from './helpers';
import { useToast } from '@/hooks/use-toast';
import OfferPreviewModal from './OfferPreviewModal';

interface OfferActionButtonsProps {
  savedOffer: SavedOffer;
  loadOffer: (savedOffer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  t: any;
}

const OfferActionButtons = ({
  savedOffer,
  loadOffer,
  deleteOffer,
  t
}: OfferActionButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };
  
  const handleEdit = () => {
    loadOffer(savedOffer);
    navigate('/');
  };
  
  const handlePrintOffer = () => {
    setIsPrinting(true);
    handlePrint(
      () => {
        toast({
          title: "Printing...",
          description: "The print dialog should open shortly.",
        });
      },
      () => {
        setIsPrinting(false);
      }
    );
  };
  
  const handleExport = () => {
    setIsExporting(true);
    const previewElement = document.querySelector('.offer-preview-content');
    const fileName = getOfferFileName(
      savedOffer.offer_data.client.name, 
      savedOffer.offer_data.details.offerNumber
    );
    
    exportToPdf(
      previewElement as Element, 
      fileName,
      () => {
        toast({
          title: "Exporting to PDF...",
          description: "Please wait while we generate your PDF.",
        });
      },
      () => {
        toast({
          title: "PDF Generated",
          description: "Your PDF has been downloaded.",
        });
        setIsExporting(false);
      },
      (error) => {
        toast({
          title: "Error",
          description: "Failed to generate PDF. Please try again.",
          variant: "destructive"
        });
        setIsExporting(false);
      }
    );
  };
  
  const handleDelete = () => {
    deleteOffer(savedOffer.id);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.viewOffer}
        onClick={handlePreview}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.loadOffer}
        onClick={handleEdit}
      >
        <FileEdit className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title="Print Offer"
        onClick={handlePrintOffer}
        disabled={isPrinting}
      >
        <Printer className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title="Export Offer"
        onClick={handleExport}
        disabled={isExporting}
      >
        <FileDown className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title={t.savedOffers.deleteOffer}
        onClick={handleDelete}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      {isPreviewOpen && (
        <OfferPreviewModal
          savedOffer={savedOffer}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
};

export default OfferActionButtons;
