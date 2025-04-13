
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Copy, FileText, Save, Trash, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QuickActionToolbarProps {
  onPreview: () => void;
  onSave?: () => void;
}

const QuickActionToolbar = ({ onPreview, onSave }: QuickActionToolbarProps) => {
  const { resetOffer, addProduct, offer } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleAddProduct = () => {
    addProduct({
      name: '',
      description: '',
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
      <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex justify-center items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleAddProduct}
          title={t.products.addProduct}
          className="hover:bg-blue-50"
        >
          <Plus className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onPreview} 
          title={t.common.preview}
          className="hover:bg-blue-50"
        >
          <FileText className="h-5 w-5" />
        </Button>
        
        {onSave && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onSave}
            title={t.savedOffers.saveOffer}
            className="hover:bg-blue-50"
          >
            <Save className="h-5 w-5" />
          </Button>
        )}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleCopyOffer}
          title={t.common.copy}
          className="hover:bg-blue-50"
        >
          <Copy className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleReset}
          className="hover:bg-red-50 text-red-500"
          title={t.common.reset}
        >
          <Trash className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default QuickActionToolbar;
