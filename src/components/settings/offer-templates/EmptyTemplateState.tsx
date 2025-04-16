
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface EmptyTemplateStateProps {
  onCreateNew: () => void;
}

const EmptyTemplateState: React.FC<EmptyTemplateStateProps> = ({ onCreateNew }) => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-8 text-muted-foreground">
      <Info className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
      <p>{t.offer.templates.noTemplates}</p>
      <Button 
        variant="link" 
        className="mt-2"
        onClick={onCreateNew}
      >
        {t.offer.templates.createFromCurrent}
      </Button>
    </div>
  );
};

export default EmptyTemplateState;
