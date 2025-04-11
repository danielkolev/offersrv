
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SaveButtonProps {
  onClick: () => void;
}

const SaveButton: React.FC<SaveButtonProps> = ({ onClick }) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 flex justify-center no-print mt-4">
      <Button 
        onClick={onClick} 
        className="gap-2"
        size="lg"
      >
        <Save className="h-4 w-4" /> {t.savedOffers.saveOffer}
      </Button>
    </div>
  );
};

export default SaveButton;
