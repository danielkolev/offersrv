
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Copy, Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from '@/context/LanguageContext';

interface ActionButtonsProps {
  onSave: () => void;
  onPrint: () => void;
  onCopy: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onPrint, onCopy }) => {
  const { t } = useLanguage();
  
  return (
    <div className="p-4 flex justify-end gap-2 no-print">
      <Button variant="outline" onClick={onCopy} className="gap-2">
        <Copy size={16} /> Copy
      </Button>
      <Button variant="outline" onClick={onSave} className="gap-2">
        <Save size={16} /> {t.savedOffers.saveOffer}
      </Button>
      <Button onClick={onPrint} className="gap-2">
        <Printer size={16} /> Print
      </Button>
    </div>
  );
};

export default ActionButtons;
