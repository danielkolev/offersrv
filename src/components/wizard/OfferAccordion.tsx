
import React, { useState, useEffect, useRef } from 'react';

// Import our components
import AccordionHeader from './accordion/AccordionHeader';
import ExpandedAccordion from './accordion/ExpandedAccordion';
import CollapsedAccordion from './accordion/CollapsedAccordion';
import OfferActionButtons from './accordion/OfferActionButtons';
import NoCompanySelected from './accordion/NoCompanySelected';
import { useSections } from './accordion/useSections';
import { OfferAccordionProps } from './accordion/types';

const OfferAccordion = ({
  isLoadingCompanyData,
  fetchError,
  selectedCompanyId
}: OfferAccordionProps) => {
  const [expandAll, setExpandAll] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("client"); // Set first step to client
  const accordionRef = useRef<HTMLDivElement>(null);
  const renderCountRef = useRef(0);
  
  // Log render count (for debugging)
  useEffect(() => {
    renderCountRef.current += 1;
    console.log(`OfferAccordion rendering: ${renderCountRef.current}`);
  });
  
  // Log selected company information
  useEffect(() => {
    if (selectedCompanyId) {
      console.log("OfferAccordion: Using company ID:", selectedCompanyId);
    } else {
      console.log("OfferAccordion: No company selected");
    }
  }, [selectedCompanyId]);

  // Get sections
  const sections = useSections({
    isSaveDialogOpen,
    setIsSaveDialogOpen
  });
  
  // Force rerender when expandAll changes to ensure Collapsible state syncs properly
  useEffect(() => {
    // This is just to make sure the UI reflects the expandAll state
    const sections = document.querySelectorAll('[data-state]');
    sections.forEach(section => {
      section.setAttribute('data-expanded', expandAll.toString());
    });
  }, [expandAll]);

  // Add stabilization effect for the preview step
  useEffect(() => {
    // Prevent infinite rerenders in preview step
    if (activeSection === "preview" && accordionRef.current) {
      const previewSection = document.getElementById("preview");
      if (previewSection) {
        previewSection.classList.add("preview-section-stable");
      }
    }
    
    return () => {
      // Cleanup when component unmounts
      const previewSection = document.getElementById("preview");
      if (previewSection) {
        previewSection.classList.remove("preview-section-stable");
      }
    };
  }, [activeSection]);

  const handleToggleAll = () => {
    // Use function form to ensure we get latest state
    setExpandAll(prevState => !prevState);
    
    // If expanding all sections, set activeSection to null
    // If collapsing, set it to the first section
    if (!expandAll) {
      setActiveSection(null);
    } else {
      setActiveSection("client");
    }
  };

  const handleNavigateNext = (currentSectionId: string) => {
    const currentIndex = sections.findIndex(section => section.id === currentSectionId);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setActiveSection(nextSection.id);
      
      // Scroll to next section
      setTimeout(() => {
        const nextSectionElement = document.getElementById(nextSection.id);
        if (nextSectionElement) {
          nextSectionElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  if (!selectedCompanyId) {
    return <NoCompanySelected />;
  }

  if (isLoadingCompanyData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-gray-600">Зареждане...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <p className="text-red-600">Възникна грешка при зареждането</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" ref={accordionRef}>
      <AccordionHeader
        expandAll={expandAll}
        onToggleAll={handleToggleAll}
      />

      <div className="bg-white rounded-lg shadow-sm">
        <div className={expandAll ? "expanded-sections" : "collapsed-sections"}>
          {expandAll ? (
            <ExpandedAccordion
              sections={sections}
              onNavigateNext={handleNavigateNext}
            />
          ) : (
            <CollapsedAccordion
              sections={sections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              onNavigateNext={handleNavigateNext}
            />
          )}
        </div>
      </div>
      
      <OfferActionButtons
        onSave={() => setIsSaveDialogOpen(true)}
      />
    </div>
  );
};

export default OfferAccordion;
