
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, FileDown, Printer, Trash2 } from 'lucide-react';
import { SavedOffer } from '@/types/database';

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
  // These handlers would be implemented based on your application needs
  const handlePreview = () => {
    console.log('Preview offer', savedOffer.id);
    // Implementation for preview
  };
  
  const handleEdit = () => {
    loadOffer(savedOffer);
  };
  
  const handlePrint = () => {
    console.log('Print offer', savedOffer.id);
    // Implementation for printing
  };
  
  const handleExport = () => {
    console.log('Export offer', savedOffer.id);
    // Implementation for exporting
  };
  
  const handleDelete = () => {
    deleteOffer(savedOffer.id);
  };

  return (
    <div className="flex space-x-2">
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
        title="Print Offer"
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title="Export Offer"
        onClick={handleExport}
      >
        <FileDown className="h-4 w-4" />
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
    </div>
  );
};

export default OfferActionButtons;
