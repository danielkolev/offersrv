
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Copy, Save, FileDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ActionButtonsProps {
  onSave: () => void;
  onPrint: () => void;
  onExportPDF: () => void;
  onCopy: () => void;
  mode?: 'edit' | 'view';
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onSave, 
  onPrint, 
  onExportPDF, 
  onCopy,
  mode = 'edit'
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 flex justify-end gap-2 no-print">
      <Button variant="outline" onClick={onCopy} className="gap-2">
        <Copy size={16} /> {t.common.copy}
      </Button>
      
      {mode === 'edit' && (
        <Button variant="outline" onClick={onSave} className="gap-2">
          <Save size={16} /> {t.savedOffers.saveOffer}
        </Button>
      )}
      
      <Button variant="outline" onClick={onExportPDF} className="gap-2">
        <FileDown size={16} /> PDF
      </Button>
      
      <Button variant="outline" onClick={onPrint} className="gap-2">
        <Printer size={16} /> {t.common.print}
      </Button>
    </div>
  );
};

export default ActionButtons;
