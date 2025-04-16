
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import TemplateCard from './TemplateCard';
import EmptyTemplateState from './EmptyTemplateState';
import { TemplateType } from '@/types/template';

interface TemplatesListProps {
  templates: TemplateType[];
  isLoading: boolean;
  isUserTemplates?: boolean;
  onSelectTemplate: (template: Partial<any>) => void;
  onDeleteTemplate?: (templateId: string) => void;
  onCreateTemplate: () => void;
}

const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  isLoading,
  isUserTemplates = false,
  onSelectTemplate,
  onDeleteTemplate,
  onCreateTemplate
}) => {
  const { t } = useLanguage();

  if (isLoading) {
    return <div className="text-center py-8">{t.common.loading}</div>;
  }

  if (templates.length === 0) {
    return <EmptyTemplateState onCreateTemplate={onCreateTemplate} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map(template => (
        <TemplateCard
          key={template.id} 
          template={template}
          isUserTemplate={isUserTemplates}
          onSelectTemplate={onSelectTemplate}
          onDeleteTemplate={onDeleteTemplate}
        />
      ))}
    </div>
  );
};

export default TemplatesList;
