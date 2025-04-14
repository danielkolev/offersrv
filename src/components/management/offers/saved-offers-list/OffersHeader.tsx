
import React from 'react';
import { Translations } from '@/types/language';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save, Loader2 } from 'lucide-react';
import BackButton from '@/components/navigation/BackButton';

interface OffersHeaderProps {
  onCreateNew: () => void;
  onSaveOffer: () => void;
  isSaving: boolean;
  t: Translations;
}

const OffersHeader: React.FC<OffersHeaderProps> = ({
  onCreateNew,
  onSaveOffer,
  isSaving,
  t
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <BackButton label={t.common.back} to="/" />
        <h1 className="text-2xl font-bold">{t.savedOffers.title}</h1>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline"
          className="gap-2"
          onClick={onCreateNew}
        >
          <PlusCircle className="h-4 w-4" />
          {t.savedOffers.createNew}
        </Button>
        
        <Button 
          onClick={onSaveOffer} 
          className="gap-2"
          disabled={isSaving}
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {t.savedOffers.saveOffer}
        </Button>
      </div>
    </div>
  );
};

export default OffersHeader;
