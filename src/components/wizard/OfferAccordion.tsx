
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCompanyData } from '@/hooks/useCompanyData';

// Import our components
import AccordionHeader from './accordion/AccordionHeader';
import ExpandedAccordion from './accordion/ExpandedAccordion';
import CollapsedAccordion from './accordion/CollapsedAccordion';
import OfferActionButtons from './accordion/OfferActionButtons';
import NoCompanySelected from './accordion/NoCompanySelected';
import LoadingErrorStates from './accordion/LoadingErrorStates';
import { useSections } from './accordion/useSections';
import { OfferAccordionProps } from './accordion/types';

const OfferAccordion = ({
  isLoadingCompanyData,
  fetchError,
  selectedCompanyId,
  onSelectCompany
}: OfferAccordionProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandAll, setExpandAll] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("details");
  
  // Fetch company data and automatically populate the offer
  const { isLoading: isLoadingCompany, error: companyError } = useCompanyData(selectedCompanyId);

  // Get sections but skip the company section since we're auto-populating it
  const allSections = useSections({
    isSaveDialogOpen,
    setIsSaveDialogOpen
  });
  
  // Filter out the company section
  const sections = allSections.filter(section => section.id !== "company");

  // Force rerender when expandAll changes to ensure Collapsible state syncs properly
  useEffect(() => {
    // This is just to make sure the UI reflects the expandAll state
    const sections = document.querySelectorAll('[data-state]');
    sections.forEach(section => {
      section.setAttribute('data-expanded', expandAll.toString());
    });
  }, [expandAll]);

  const handleToggleAll = () => {
    // Use function form to ensure we get latest state
    setExpandAll(prevState => !prevState);
    
    // If expanding all sections, set activeSection to null
    // If collapsing, set it to the first section
    if (!expandAll) {
      setActiveSection(null);
    } else {
      setActiveSection("details");
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

  if (isLoadingCompanyData || isLoadingCompany || fetchError || companyError) {
    return (
      <LoadingErrorStates 
        isLoading={isLoadingCompanyData || isLoadingCompany} 
        hasError={!!fetchError || !!companyError} 
      />
    );
  }

  return (
    <div className="space-y-4">
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
