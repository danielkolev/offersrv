
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ArrowRight, Printer, Save } from 'lucide-react';

interface OfferAccordionProps {
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
}

const OfferAccordion = ({
  isLoadingCompanyData,
  fetchError,
  selectedCompanyId,
  onSelectCompany
}: OfferAccordionProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [expandAll, setExpandAll] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("client");

  // Force rerender when expandAll changes to ensure Collapsible state syncs properly
  useEffect(() => {
    // This is just to make sure the UI reflects the expandAll state
    const sections = document.querySelectorAll('[data-state]');
    sections.forEach(section => {
      section.setAttribute('data-expanded', expandAll.toString());
    });
  }, [expandAll]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveOffer = () => {
    if (!user) {
      toast({
        title: t?.common?.error || "Error",
        description: t?.auth?.notAuthenticated || "You need to be logged in",
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaveDialogOpen(true);
  };

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

  if (!selectedCompanyId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-8">
        {t?.company?.selectFirst || "Please select a company first"}
      </div>
    );
  }

  if (isLoadingCompanyData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4">{t?.common?.loading || "Loading..."}</div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4 text-red-500">
        {t?.common?.error || "Error"}
      </div>
    );
  }

  const sections = [
    {
      id: "client",
      title: t?.client?.title || "Client",
      content: <ClientInfoForm />
    },
    {
      id: "details",
      title: t?.offer?.details || "Offer Details",
      content: <OfferDetailsForm />
    },
    {
      id: "products",
      title: t?.products?.title || "Products",
      content: <ProductsForm />
    },
    {
      id: "preview",
      title: t?.offer?.offerPreview || "Offer Preview",
      content: (
        <OfferPreview 
          isSaveDialogOpen={isSaveDialogOpen}
          setIsSaveDialogOpen={setIsSaveDialogOpen}
        />
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{t?.offer?.createOffer || "Create Offer"}</h2>
        <Button
          variant="outline"
          onClick={handleToggleAll}
          className="flex items-center gap-2"
        >
          {expandAll ? (
            <>
              <ChevronUp size={16} />
              {t?.common?.collapseAll || "Collapse All"}
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              {t?.common?.expandAll || "Expand All"}
            </>
          )}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {/* Fixed the layout shift by ensuring the headers have consistent layouts */}
        <div className={expandAll ? "expanded-sections" : "collapsed-sections"}>
          {expandAll ? (
            <Accordion
              type="multiple"
              value={sections.map(s => s.id)}
              className="w-full"
            >
              {sections.map((section, index) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="border-b last:border-b-0"
                  data-expanded="true"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-medium text-left">{section.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {section.content}
                    
                    {index < sections.length - 1 && (
                      <div className="flex justify-end mt-4">
                        <Button 
                          onClick={() => {
                            setActiveSection(sections[index + 1].id);
                            // Scroll to next section
                            setTimeout(() => {
                              const nextSection = document.getElementById(sections[index + 1].id);
                              if (nextSection) {
                                nextSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }}
                          className="flex items-center gap-2"
                        >
                          {t?.common?.next || "Next"}
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Accordion
              type="single"
              collapsible={true}
              value={activeSection ? activeSection : undefined}
              onValueChange={(value) => {
                setActiveSection(value);
              }}
              className="w-full"
            >
              {sections.map((section, index) => (
                <AccordionItem 
                  key={section.id} 
                  value={section.id}
                  className="border-b last:border-b-0"
                  data-expanded={activeSection === section.id}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex-shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-medium text-left">{section.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-2">
                    {section.content}
                    
                    {index < sections.length - 1 && (
                      <div className="flex justify-end mt-4">
                        <Button 
                          onClick={() => {
                            setActiveSection(sections[index + 1].id);
                            // Scroll to next section
                            setTimeout(() => {
                              const nextSection = document.getElementById(sections[index + 1].id);
                              if (nextSection) {
                                nextSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }}
                          className="flex items-center gap-2"
                        >
                          {t?.common?.next || "Next"}
                          <ArrowRight size={16} />
                        </Button>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-end gap-2">
        <Button 
          variant="secondary"
          onClick={handleSaveOffer}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          {t?.savedOffers?.saveOffer || "Save Offer"}
        </Button>
        <Button
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          {t?.common?.print || "Print"}
        </Button>
      </div>
    </div>
  );
};

export default OfferAccordion;
