
import React, { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, FileDown, Trash2, Printer } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SavedOfferItemProps } from './types';
import { SupportedLanguage, SupportedCurrency } from '@/types/language/base';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useOffer } from '@/context/offer/OfferContext';
import OfferPreview from '@/components/OfferPreview';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

const SavedOfferItem = ({ 
  savedOffer, 
  loadOffer, 
  deleteOffer, 
  language, 
  currency, 
  t 
}: SavedOfferItemProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const navigate = useNavigate();
  const { resetOffer, applyTemplate } = useOffer();

  const handlePreviewOffer = () => {
    // Temporarily apply the saved offer data to the context for preview
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
  };

  const handleEditOffer = () => {
    loadOffer(savedOffer);
    navigate('/');
  };

  const getOfferFileName = () => {
    const clientName = savedOffer.offer_data.client.name.replace(/\s+/g, '-');
    const offerNumber = savedOffer.offer_data.details.offerNumber;
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    return `Offer-${clientName}-${offerNumber}-${date}`;
  };

  const handleExportPdf = () => {
    // Temporarily apply the saved offer data to the context for export
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
    
    // Defines the export function, which will run after the preview opens
    setTimeout(() => {
      const element = document.querySelector('.offer-preview-content');
      if (!element) return;
      
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
      
      html2pdf().set(options).from(element).save().then(() => {
        // Remove temporary class
        element.classList.remove('pdf-export');
        setPreviewOpen(false);
        // Restore original offer after export
        resetOffer();
      }).catch((error) => {
        console.error("PDF generation error:", error);
        element.classList.remove('pdf-export');
        setPreviewOpen(false);
        // Restore original offer after export
        resetOffer();
      });
    }, 500);
  };

  const handlePrint = () => {
    // Temporarily apply the saved offer data to the context for printing
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
    
    setTimeout(() => {
      const originalOverflow = document.body.style.overflow;
      document.body.classList.add('print-content');
      document.body.style.overflow = 'visible';
      
      window.print();
      
      setTimeout(() => {
        document.body.classList.remove('print-content');
        document.body.style.overflow = originalOverflow;
        setPreviewOpen(false);
        // Restore original offer after printing
        resetOffer();
      }, 500);
    }, 500);
  };

  return (
    <>
      <TableRow key={savedOffer.id}>
        <TableCell>
          <button 
            onClick={handlePreviewOffer}
            className="text-primary hover:underline focus:outline-none"
          >
            {savedOffer.offer_data.details.offerNumber}
          </button>
        </TableCell>
        <TableCell>
          {formatDate(savedOffer.offer_data.details.date, language as SupportedLanguage)}
        </TableCell>
        <TableCell>
          {savedOffer.offer_data.client.name}
        </TableCell>
        <TableCell className="text-right">
          {formatCurrency(
            savedOffer.offer_data.products.reduce(
              (sum, product) => sum + product.quantity * product.unitPrice,
              0
            ),
            language as SupportedLanguage,
            currency as SupportedCurrency
          )}
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="icon"
              title={t.common.preview}
              onClick={handlePreviewOffer}
            >
              <Eye className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              title={t.common.edit}
              onClick={handleEditOffer}
            >
              <FileEdit className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline"
              size="icon"
              title={t.common.print}
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline"
              size="icon"
              title={t.common.export}
              onClick={handleExportPdf}
            >
              <FileDown className="h-4 w-4" />
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  title={t.common.delete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t.savedOffers.confirmDelete}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => deleteOffer(savedOffer.id)}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t.common.delete}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={previewOpen} onOpenChange={(open) => {
        setPreviewOpen(open);
        // Restore original offer when dialog is closed
        if (!open) resetOffer();
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
          <OfferPreview
            isSaveDialogOpen={false}
            setIsSaveDialogOpen={() => {}}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavedOfferItem;
