
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCompanyData } from '@/hooks/useCompanyData';
import { CompanyManager } from '@/components/company/CompanyManager';

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
  const [activeSection, setActiveSection] = useState<string | null>("client"); // Set first step to client
  const accordionRef = useRef<HTMLDivElement>(null);
  
  // Fetch company data and automatically populate the offer
  const { isLoading: isLoadingCompany, error: companyError } = useCompanyData(selectedCompanyId);
  
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
  
  // Visible sections are all sections
  const visibleSections = sections;

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
    const currentIndex = visibleSections.findIndex(section => section.id === currentSectionId);
    if (currentIndex < visibleSections.length - 1) {
      const nextSection = visibleSections[currentIndex + 1];
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

  // Add company selector at the top of the accordion when no company is selected
  const renderCompanySelector = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{user?.email ? user.email : 'User'}</h3>
          <CompanyManager 
            onSelectCompany={onSelectCompany}
            selectedCompanyId={selectedCompanyId}
          />
        </div>
      </div>
    );
  };

  if (isLoadingCompanyData || isLoadingCompany) {
    return (
      <LoadingErrorStates 
        isLoading={true} 
        hasError={false} 
      />
    );
  }

  if (fetchError || companyError) {
    return (
      <LoadingErrorStates 
        isLoading={false} 
        hasError={true} 
      />
    );
  }

  return (
    <div className="space-y-4" ref={accordionRef}>
      {renderCompanySelector()}
      
      {!selectedCompanyId ? (
        <NoCompanySelected />
      ) : (
        <>
          <AccordionHeader
            expandAll={expandAll}
            onToggleAll={handleToggleAll}
          />

          <div className="bg-white rounded-lg shadow-sm">
            <div className={expandAll ? "expanded-sections" : "collapsed-sections"}>
              {expandAll ? (
                <ExpandedAccordion
                  sections={visibleSections}
                  onNavigateNext={handleNavigateNext}
                />
              ) : (
                <CollapsedAccordion
                  sections={visibleSections}
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
        </>
      )}
    </div>
  );
};

export default OfferAccordion;
