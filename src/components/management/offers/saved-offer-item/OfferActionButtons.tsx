
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import { Translations } from '@/types/language';

interface OfferActionButtonsProps {
  onLoad: () => void;
  onDelete: () => void;
  onPreview: () => void;
  t: Translations;
}

const OfferActionButtons = ({
  onLoad,
  onDelete,
  onPreview,
  t
}: OfferActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.viewOffer}
        onClick={onPreview}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.loadOffer}
        onClick={onLoad}
      >
        <FileEdit className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title={t.savedOffers.deleteOffer}
        onClick={onDelete}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default OfferActionButtons;
