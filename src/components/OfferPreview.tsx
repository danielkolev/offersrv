
import React, { useState } from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';
import SaveOfferDialog from './SaveOfferDialog';
import { useAuth } from '@/context/AuthContext';
import { saveOfferToDatabase } from './management/offers/savedOffersService';

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
  
  // Use either external or internal state based on what's provided
  const [internalIsSaveDialogOpen, setInternalIsSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const isSaveDialogOpen = externalIsSaveDialogOpen !== undefined 
    ? externalIsSaveDialogOpen 
    : internalIsSaveDialogOpen;
    
  const setIsSaveDialogOpen = externalSetIsSaveDialogOpen || setInternalIsSaveDialogOpen;

  const handlePrint = () => {
    // Добавяме print-content клас към body, за да улесним печата
    document.body.classList.add('print-content');
    window.print();
    // Премахваме класа след печат
    setTimeout(() => {
      document.body.classList.remove('print-content');
    }, 500);
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
        onCopy={handleCopy}
      />
      
      <CardContent className="card-content">
        <div className="print-container offer-preview-content">
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
