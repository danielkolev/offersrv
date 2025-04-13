
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface OfferActionButtonsProps {
  onSave: () => void;
}

const OfferActionButtons: React.FC<OfferActionButtonsProps> = ({
  onSave
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
        variant="default"
        onClick={handleSaveOffer}
        className="flex items-center gap-2"
      >
        <Save size={16} />
        {t?.savedOffers?.saveOffer || "Save Offer"}
      </Button>
    </div>
  );
};

export default OfferActionButtons;
