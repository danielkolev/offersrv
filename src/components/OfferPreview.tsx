
import React, { useState, useRef } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import SaveOfferDialog from './SaveOfferDialog';
import { useAuth } from '@/context/AuthContext';
import { saveOfferToDatabase } from './management/offers/savedOffersService';
import html2pdf from 'html2pdf.js';

// Import refactored components
import OfferHeader from './offer-preview/OfferHeader';
import ClientInfoSection from './offer-preview/ClientInfoSection';
import ProductsTable from './offer-preview/ProductsTable';
import TotalsSection from './offer-preview/TotalsSection';
import NotesSection from './offer-preview/NotesSection';
import ActionButtons from './offer-preview/ActionButtons';
import SaveButton from './offer-preview/SaveButton';

interface OfferPreviewProps {
  isSaveDialogOpen?: boolean;
  setIsSaveDialogOpen?: (isOpen: boolean) => void;
}

const OfferPreview = ({ 
  isSaveDialogOpen: externalIsSaveDialogOpen, 
  setIsSaveDialogOpen: externalSetIsSaveDialogOpen 
}: OfferPreviewProps = {}) => {
  const { offer, calculateSubtotal, calculateVat, calculateTotal } = useOffer();
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const offerContentRef = useRef<HTMLDivElement>(null);
  
  // Use either external or internal state based on what's provided
  const [internalIsSaveDialogOpen, setInternalIsSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const isSaveDialogOpen = externalIsSaveDialogOpen !== undefined 
    ? externalIsSaveDialogOpen 
    : internalIsSaveDialogOpen;
    
  const setIsSaveDialogOpen = externalSetIsSaveDialogOpen || setInternalIsSaveDialogOpen;

  const getOfferFileName = () => {
    const clientName = offer.client.name || 'Client';
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    return `Offer-${clientName}-${date}`;
  };

  const handlePrint = () => {
    // Запазваме оригиналното състояние на body
    const originalOverflow = document.body.style.overflow;
    
    // Скриваме всичко преди печат
    document.body.classList.add('print-content');
    document.body.style.overflow = 'visible';
    
    // Принтираме
    window.print();
    
    // Връщаме оригиналното състояние
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

    // Добавяме временен клас за PDF експорт
    element.classList.add('pdf-export');
    
    toast({
      title: t.common.processing,
      description: "Generating PDF...",
    });

    html2pdf().set(options).from(element).save().then(() => {
      // Премахваме временния клас
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

  const handleSaveOffer = async (offerName: string) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    try {
      // Create a copy of the offer with the custom name
      const offerToSave = {
        ...offer,
        name: offerName,
      };
      
      await saveOfferToDatabase(user.id, offerToSave);
      
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSaved,
      });
      
      setIsSaveDialogOpen(false);
    } catch (error: any) {
      console.error('Error saving offer:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="mb-6">
      <ActionButtons 
        onSave={() => setIsSaveDialogOpen(true)}
        onPrint={handlePrint}
        onExportPDF={handleExportPDF}
        onCopy={handleCopy}
      />
      
      <CardContent className="card-content">
        <div ref={offerContentRef} className="print-container offer-preview-content">
          <OfferHeader offer={offer} />
          <ClientInfoSection client={offer.client} />
          <ProductsTable 
            products={offer.products} 
            showPartNumber={offer.details.showPartNumber} 
          />
          <TotalsSection 
            subtotal={calculateSubtotal()}
            vat={calculateVat()}
            vatRate={offer.details.vatRate}
            includeVat={offer.details.includeVat}
            transportCost={offer.details.transportCost}
            otherCosts={offer.details.otherCosts}
            total={calculateTotal()}
          />
          <NotesSection notes={offer.details.notes} />
          
          <div className="text-center text-sm text-muted-foreground mt-12 pt-4 border-t print-visible">
            <p>{t.offer.thankYou}</p>
          </div>
        </div>
      </CardContent>
      
      <SaveButton onClick={() => setIsSaveDialogOpen(true)} />
      
      <SaveOfferDialog
        open={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveOffer}
        isLoading={isSaving}
        defaultName={`${offer.client.name} - ${new Date().toLocaleDateString()}`}
      />
    </Card>
  );
};

export default OfferPreview;
