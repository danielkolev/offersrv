
import React, { useState } from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { formatCurrency, formatDate } from '@/lib/utils';
import { SavedOfferItemProps } from '../types';
import { SupportedLanguage, SupportedCurrency } from '@/types/language/base';
import { useOffer } from '@/context/offer/OfferContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getOfferFileName, exportToPdf, handlePrint } from './helpers';
import OfferPreviewModal from './OfferPreviewModal';
import DeleteOfferDialog from './DeleteOfferDialog';
import OfferActionButtons from './OfferActionButtons';

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
  const { toast } = useToast();

  const handlePreviewOffer = () => {
    // Temporarily apply the saved offer data to the context for preview
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
  };

  const handleEditOffer = () => {
    loadOffer(savedOffer);
    navigate('/');
  };

  const handleExportPdf = () => {
    // Temporarily apply the saved offer data to the context for export
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
    
    // Defines the export function, which will run after the preview opens
    setTimeout(() => {
      const element = document.querySelector('.offer-preview-content');
      const filename = getOfferFileName(
        savedOffer.offer_data.client.name, 
        savedOffer.offer_data.details.offerNumber
      );
      
      exportToPdf(
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
          setPreviewOpen(false);
          // Restore original offer after export
          resetOffer();
        },
        (error) => {
          toast({
            title: t.common.error,
            description: "Failed to generate PDF",
            variant: 'destructive',
          });
          setPreviewOpen(false);
          // Restore original offer after export
          resetOffer();
        }
      );
    }, 500);
  };

  const handlePrintOffer = () => {
    // Temporarily apply the saved offer data to the context for printing
    applyTemplate(savedOffer.offer_data);
    setPreviewOpen(true);
    
    handlePrint(
      () => {}, // Before print
      () => {
        setPreviewOpen(false);
        // Restore original offer after printing
        resetOffer();
      }  // After print
    );
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
            <OfferActionButtons
              onPreview={handlePreviewOffer}
              onEdit={handleEditOffer}
              onPrint={handlePrintOffer}
              onExport={handleExportPdf}
              previewTitle={t.common.preview}
              editTitle={t.common.edit}
              printTitle={t.common.print}
              exportTitle={t.common.export}
            />
            
            <DeleteOfferDialog
              onDelete={() => deleteOffer(savedOffer.id)}
              confirmationText={t.savedOffers.confirmDelete}
              confirmationTitle={t.common.confirmation}
              deleteButtonText={t.common.delete}
              cancelButtonText={t.common.cancel}
            />
          </div>
        </TableCell>
      </TableRow>

      <OfferPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </>
  );
};

export default SavedOfferItem;
