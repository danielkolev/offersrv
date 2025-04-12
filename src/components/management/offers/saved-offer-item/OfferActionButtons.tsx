
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, Trash2 } from 'lucide-react';
import { SavedOffer } from '@/types/database';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import OfferPreviewModal from './OfferPreviewModal';

interface OfferActionButtonsProps {
  savedOffer: SavedOffer;
  loadOffer: (savedOffer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  t: any;
}

const OfferActionButtons = ({
  savedOffer,
  loadOffer,
  deleteOffer,
  t
}: OfferActionButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const handlePreview = () => {
    setIsPreviewOpen(true);
  };
  
  const handleEdit = () => {
    console.log('Loading offer:', savedOffer.id);
    loadOffer(savedOffer);
    // We'll let the loadOffer function handle navigation
  };
  
  const handleDelete = () => {
    deleteOffer(savedOffer.id);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.viewOffer}
        onClick={handlePreview}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        title={t.savedOffers.loadOffer}
        onClick={handleEdit}
      >
        <FileEdit className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title={t.savedOffers.deleteOffer}
        onClick={handleDelete}
        className="text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      
      {isPreviewOpen && (
        <OfferPreviewModal
          savedOffer={savedOffer}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
};

export default OfferActionButtons;
