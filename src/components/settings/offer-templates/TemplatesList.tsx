
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import TemplateCard from './TemplateCard';
import EmptyTemplateState from './EmptyTemplateState';
import { TemplateType } from '@/types/template';

interface TemplatesListProps {
  templates: TemplateType[];
  isLoading: boolean;
  isUserTemplates: boolean;
  onCreateNew: () => void;
  onDeleteTemplate?: (id: string) => void;
  onEditTemplate?: (id: string) => void;
}

const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  isLoading,
  isUserTemplates,
  onCreateNew,
  onDeleteTemplate,
  onEditTemplate
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <div className="text-center py-8">{t.common.loading}</div>;
  }

  if (templates.length === 0) {
    if (isUserTemplates) {
      return <EmptyTemplateState onCreateNew={onCreateNew} />;
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-muted/40">
          <CardContent className="p-4 flex items-center justify-center h-32">
            <p className="text-muted-foreground italic">{t.settings.defaultTemplatesDescription}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map(template => (
        <TemplateCard 
          key={template.id}
          template={template} 
          isUserTemplate={isUserTemplates}
          onDelete={onDeleteTemplate}
          onEdit={onEditTemplate}
        />
      ))}
    </div>
  );
};

export default TemplatesList;
