
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AccordionSection } from './types';

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

  return (
    <>
      {section.component}
      
      {index < totalSections - 1 && (
        <div className="flex justify-end mt-4">
          <Button 
            onClick={() => onNavigateNext(section.id)}
            className="flex items-center gap-2"
          >
            {t?.common?.next || "Next"}
            <ArrowRight size={16} />
          </Button>
        </div>
      )}
    </>
  );
};

export default AccordionSectionContent;
