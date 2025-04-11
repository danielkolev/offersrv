
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, FileEdit, FileDown, Printer } from 'lucide-react';

interface OfferActionButtonsProps {
  onPreview: () => void;
  onEdit: () => void;
  onPrint: () => void;
  onExport: () => void;
  previewTitle: string;
  editTitle: string;
  printTitle: string;
  exportTitle: string;
}

const OfferActionButtons = ({
  onPreview,
  onEdit,
  onPrint,
  onExport,
  previewTitle,
  editTitle,
  printTitle,
  exportTitle
}: OfferActionButtonsProps) => {
  return (
    <>
      <Button 
        variant="outline" 
        size="icon"
        title={previewTitle}
        onClick={onPreview}
      >
        <Eye className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon"
        title={editTitle}
        onClick={onEdit}
      >
        <FileEdit className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title={printTitle}
        onClick={onPrint}
      >
        <Printer className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline"
        size="icon"
        title={exportTitle}
        onClick={onExport}
      >
        <FileDown className="h-4 w-4" />
      </Button>
    </>
  );
};

export default OfferActionButtons;
