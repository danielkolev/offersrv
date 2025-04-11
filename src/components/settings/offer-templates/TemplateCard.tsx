
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { FileText, Languages, Trash2 } from 'lucide-react';

interface TemplateType {
  id: string;
  name: string;
  description: string;
  language: 'bg' | 'en' | 'all';
  isDefault?: boolean;
}

interface TemplateCardProps {
  template: TemplateType;
  isUserTemplate?: boolean;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isUserTemplate = false,
  onDelete,
  onEdit
}) => {
  const { t } = useLanguage();

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
            {template.language && template.language !== 'all' && (
              <div className="text-xs inline-flex items-center gap-1 text-muted-foreground mb-2">
                <Languages className="h-3 w-3" /> 
                {template.language === 'bg' ? 'Български' : 'English'}
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
          </div>
          {isUserTemplate && onDelete && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(template.id);
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
            if (onEdit) {
              onEdit(template.id);
            }
          }}
        >
          {isUserTemplate ? t.settings.editTemplate : t.settings.viewTemplate}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
