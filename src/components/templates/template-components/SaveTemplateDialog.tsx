
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

interface SaveTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (name: string) => Promise<void>;
  isLoading: boolean;
}

const SaveTemplateDialog: React.FC<SaveTemplateDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  isLoading
}) => {
  const { t } = useLanguage();
  const [templateName, setTemplateName] = useState('');

  const handleSave = async () => {
    await onSave(templateName);
    setTemplateName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.offer.templates.saveAsTemplate}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">{t.offer.templates.templateName}</Label>
            <Input 
              id="template-name" 
              value={templateName} 
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. My Standard Offer"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
          >
            {t.common.cancel}
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isLoading || !templateName.trim()}
          >
            {isLoading ? t.common.saving : t.offer.templates.saveAsTemplate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveTemplateDialog;
