
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateTemplateDialogProps {
  onCreateTemplate: (name: string, description: string) => Promise<void>;
  isLoading?: boolean;
}

const CreateTemplateDialog: React.FC<CreateTemplateDialogProps & { 
  open: boolean; 
  onOpenChange: (open: boolean) => void;
}> = ({ 
  onCreateTemplate, 
  isLoading = false,
  open,
  onOpenChange 
}) => {
  const { t } = useLanguage();
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSave = async () => {
    await onCreateTemplate(templateName, templateDescription);
    setTemplateName('');
    setTemplateDescription('');
    onOpenChange(false);
  };

  // Handle dialog closing
  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    // Small delay before restoring focus
    if (!newOpenState) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.settings.createTemplate}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="template-name">{t.offer.templates.templateName}</Label>
            <Input 
              id="template-name" 
              value={templateName} 
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder={t.settings.templateNamePlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template-description">{t.settings.templateDescription}</Label>
            <Input 
              id="template-description" 
              value={templateDescription} 
              onChange={(e) => setTemplateDescription(e.target.value)}
              placeholder={t.settings.templateDescriptionPlaceholder}
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
            {isLoading ? t.common.processing : t.settings.createTemplate}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;
