
import React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { AccordionSection } from './types';
import AccordionSectionContent from './AccordionSectionContent';

interface CollapsedAccordionProps {
  sections: AccordionSection[];
  activeSection: string | null;
  onSectionChange: (value: string) => void;
  onNavigateNext: (sectionId: string) => void;
}

const CollapsedAccordion: React.FC<CollapsedAccordionProps> = ({ 
  sections,
  activeSection,
  onSectionChange,
  onNavigateNext
}) => {
  return (
    <Accordion
      type="single"
      collapsible={true}
      value={activeSection ? activeSection : undefined}
      onValueChange={onSectionChange}
      className="w-full"
    >
      {sections.map((section, index) => (
        <AccordionItem 
          key={section.id} 
          value={section.id}
          id={section.id}
          className="border-b last:border-b-0"
          data-expanded={activeSection === section.id}
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                {index + 1}
              </div>
              <h3 className="text-lg font-medium text-left">
                {section.title}
              </h3>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2">
            <AccordionSectionContent 
              section={section} 
              index={index} 
              totalSections={sections.length} 
              onNavigateNext={onNavigateNext}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default CollapsedAccordion;
