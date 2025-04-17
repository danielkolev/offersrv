
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';

interface EmptyTemplateStateProps {
  onCreateNew: () => void;
}

const EmptyTemplateState: React.FC<EmptyTemplateStateProps> = ({ onCreateNew }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8 border border-dashed rounded-lg">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{t.offer.templates.emptyState?.title || t.offer.templates.noTemplates}</h3>
      <p className="text-muted-foreground mb-4 text-center">
        {t.offer.templates.emptyState?.description || t.offer.templates.empty}
      </p>
      <Button onClick={onCreateNew} className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        {t.offer.templates.emptyState?.createFirst || t.offer.templates.create}
      </Button>
    </div>
  );
};

export default EmptyTemplateState;
