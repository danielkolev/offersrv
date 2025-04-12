
import React, { useState } from 'react';
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

  const handlePrint = () => {
    window.print();
  };

  const handleSaveOffer = () => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated || "You need to be logged in",
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaveDialogOpen(true);
  };

  const handleToggleAll = () => {
    if (expandAll) {
      // Collapse all sections
      setActiveSection(null);
    } else {
      // Expand all sections by using "all" as a special value
      setActiveSection("all");
    }
    setExpandAll(!expandAll);
  };

  if (!selectedCompanyId) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-8">
        {t.company.selectFirst}
      </div>
    );
  }

  if (isLoadingCompanyData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4">{t.common.loading}</div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center py-4 text-red-500">
        {t.common.error}
      </div>
    );
  }

  const sections = [
    {
      id: "client",
      title: t.client.title,
      content: <ClientInfoForm />
    },
    {
      id: "details",
      title: t.offer.details,
      content: <OfferDetailsForm />
    },
    {
      id: "products",
      title: t.products.title,
      content: <ProductsForm />
    },
    {
      id: "preview",
      title: t.offer.offerPreview,
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
        <h2 className="text-xl font-semibold">{t.offer.createOffer}</h2>
        <Button
          variant="outline"
          onClick={handleToggleAll}
          className="flex items-center gap-2"
        >
          {expandAll ? (
            <>
              <ChevronUp size={16} />
              {t.common.collapseAll}
            </>
          ) : (
            <>
              <ChevronDown size={16} />
              {t.common.expandAll}
            </>
          )}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Accordion
          type="multiple"
          value={activeSection === "all" ? sections.map(s => s.id) : activeSection ? [activeSection] : []}
          onValueChange={(value) => {
            if (value.length === 0) {
              setActiveSection(null);
              setExpandAll(false);
            } else if (value.length === sections.length) {
              setActiveSection("all");
              setExpandAll(true);
            } else {
              setActiveSection(value[value.length - 1]);
              setExpandAll(false);
            }
          }}
          className="w-full"
        >
          {sections.map((section, index) => (
            <AccordionItem 
              key={section.id} 
              value={section.id}
              className="border-b last:border-b-0"
            >
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-medium">{section.title}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 pt-2">
                {section.content}
                
                {index < sections.length - 1 && (
                  <div className="flex justify-end mt-4">
                    <Button 
                      onClick={() => setActiveSection(sections[index + 1].id)}
                      className="flex items-center gap-2"
                    >
                      {t.common.next}
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-4 flex justify-end gap-2">
        <Button 
          variant="secondary"
          onClick={handleSaveOffer}
          className="flex items-center gap-2"
        >
          <Save size={16} />
          {t.savedOffers.saveOffer}
        </Button>
        <Button
          onClick={handlePrint}
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          {t.common.print}
        </Button>
      </div>
    </div>
  );
};

export default OfferAccordion;
