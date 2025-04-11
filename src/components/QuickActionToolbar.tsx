
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Copy, FileText, Save, Printer, Trash, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionToolbarProps {
  onPreview: () => void;
  onSave?: () => void;
}

const QuickActionToolbar = ({ onPreview, onSave }: QuickActionToolbarProps) => {
  const { resetOffer, addProduct } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();

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
      // Добавяме print-content клас към body, за да улесним печата
      document.body.classList.add('print-content');
      window.print();
      // Премахваме класа след печат
      setTimeout(() => {
        document.body.classList.remove('print-content');
      }, 500);
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
