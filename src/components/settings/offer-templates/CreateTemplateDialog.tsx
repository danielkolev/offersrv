
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
import { PlusCircle } from 'lucide-react';

interface CreateTemplateDialogProps {
  onSave: (name: string, description: string) => Promise<void>;
  isLoading: boolean;
}

const CreateTemplateDialog: React.FC<CreateTemplateDialogProps> = ({ 
  onSave, 
  isLoading 
}) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');

  const handleSave = async () => {
    await onSave(templateName, templateDescription);
    setTemplateName('');
    setTemplateDescription('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          {t.settings.newTemplate}
        </Button>
      </DialogTrigger>
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
            onClick={() => setOpen(false)}
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
