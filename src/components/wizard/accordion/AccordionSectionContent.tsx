
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react';
import { AccordionSection } from './types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AccordionSectionContentProps {
  section: AccordionSection;
  index: number;
  totalSections: number;
  onNavigateNext: (sectionId: string) => void;
}

const AccordionSectionContent: React.FC<AccordionSectionContentProps> = ({
  section,
  index,
  totalSections,
  onNavigateNext
}) => {
  const { t } = useLanguage();

  // Советы для каждой секции процесса
  const getTipForSection = (sectionId: string) => {
    switch(sectionId) {
      case 'client':
        return t.clientInfo.description || "Fill client information to proceed";
      case 'details':
        return t.offerDetails.description || "Set important details like offer number, date and currency";
      case 'products':
        return "Add products or services to include in your offer";
      case 'preview':
        return "Review your offer before saving or finalizing";
      default:
        return "";
    }
  };

  const tip = getTipForSection(section.id);

  return (
    <div className="space-y-6">
      {/* Компонент секции */}
      <div className="mb-4">
        {section.component}
      </div>
      
      {/* Область с подсказками и кнопками навигации */}
      <div className="border-t pt-4 mt-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Область с подсказками */}
          {tip && (
            <div className="flex items-start gap-2 text-sm text-gray-500 max-w-md">
              <HelpCircle size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p>{tip}</p>
            </div>
          )}
          
          {/* Кнопки навигации */}
          <div className="flex gap-2 ml-auto">
            {index < totalSections - 1 && (
              <Button 
                onClick={() => onNavigateNext(section.id)}
                className="flex items-center gap-2"
              >
                {t?.offer?.workflow?.nextStep || t?.common?.next || "Next"}
                <ArrowRight size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionSectionContent;
