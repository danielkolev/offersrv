
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Languages, Trash2 } from 'lucide-react';
import { TemplateType } from '@/types/template';

interface TemplateCardProps {
  template: TemplateType;
  isUserTemplate?: boolean;
  onSelectTemplate: (template: any) => void;
  onDeleteTemplate?: (templateId: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isUserTemplate = false,
  onSelectTemplate,
  onDeleteTemplate
}) => {
  const { t } = useLanguage();

  // Check if language property exists directly on the template or in the settings
  const templateLanguage = template.language || 
                          (template.settings?.templateType) || 
                          'en';

  return (
    <Card 
      key={template.id} 
      className="hover:border-offer-blue transition-colors cursor-pointer"
    >
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-medium flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              {template.name}
            </h4>
            {templateLanguage && templateLanguage !== 'all' && (
              <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                <Languages className="h-3 w-3" /> 
                {templateLanguage === 'bg' ? 'Български' : 'English'}
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
          </div>
          {isUserTemplate && onDeleteTemplate && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTemplate(template.id);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-center mt-auto"
          onClick={(e) => {
            e.stopPropagation();
            onSelectTemplate(template);
          }}
        >
          {t.offer.templates.useTemplate}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
