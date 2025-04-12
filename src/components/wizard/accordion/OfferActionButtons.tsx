
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Printer, Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OfferActionButtonsProps {
  onSave: () => void;
  onPrint: () => void;
}

const OfferActionButtons: React.FC<OfferActionButtonsProps> = ({
  onSave,
  onPrint
}) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSaveOffer = () => {
    if (!user) {
      toast({
        title: t?.common?.error || "Error",
        description: t?.auth?.notAuthenticated || "You need to be logged in",
        variant: 'destructive',
      });
      return;
    }
    
    onSave();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex justify-end gap-2">
      <Button 
        variant="secondary"
        onClick={handleSaveOffer}
        className="flex items-center gap-2"
      >
        <Save size={16} />
        {t?.savedOffers?.saveOffer || "Save Offer"}
      </Button>
      <Button
        onClick={onPrint}
        className="flex items-center gap-2"
      >
        <Printer size={16} />
        {t?.common?.print || "Print"}
      </Button>
    </div>
  );
};

export default OfferActionButtons;
