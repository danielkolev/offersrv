
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useOffer } from '@/context/offer';
import { useToast } from '@/hooks/use-toast';
import AccordionHeader from './accordion/AccordionHeader';
import ExpandedAccordion from './accordion/ExpandedAccordion';
import CollapsedAccordion from './accordion/CollapsedAccordion';
import OfferActionButtons from './accordion/OfferActionButtons';
import NoCompanySelected from './accordion/NoCompanySelected';
import LoadingErrorStates from './accordion/LoadingErrorStates';
import { useSections } from './accordion/useSections';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface SimpleOfferAccordionProps {
  isLoading: boolean;
  hasError: boolean;
  selectedCompanyId: string | null;
}

const SimpleOfferAccordion: React.FC<SimpleOfferAccordionProps> = ({
  isLoading,
  hasError,
  selectedCompanyId
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { offer, isDirty, saveDraft } = useOffer();
  const [expandAll, setExpandAll] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("client");
  const [progress, setProgress] = useState(25); // 25% прогресс при начале с первой секции
  
  // Получаем секции
  const sections = useSections({
    isSaveDialogOpen,
    setIsSaveDialogOpen
  });
  
  // Обрабатываем изменение активной секции для прогресса
  useEffect(() => {
    if (!activeSection) return;
    
    const sectionIndex = sections.findIndex(s => s.id === activeSection);
    if (sectionIndex >= 0) {
      const newProgress = ((sectionIndex + 1) / sections.length) * 100;
      setProgress(newProgress);
    }
  }, [activeSection, sections]);

  // Навигация к следующей секции
  const handleNavigateNext = (currentSectionId: string) => {
    const currentIndex = sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      setActiveSection(nextSection.id);
      
      // Автоматическое сохранение черновика при переходе к следующей секции
      if (isDirty) {
        saveDraft();
      }
      
      // Прокрутка к следующей секции
      setTimeout(() => {
        const nextSectionElement = document.getElementById(nextSection.id);
        if (nextSectionElement) {
          nextSectionElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Переключение между режимами отображения (свернуто/развернуто)
  const handleToggleAll = () => {
    setExpandAll(prev => !prev);
    
    if (!expandAll) {
      setActiveSection(null);
    } else {
      setActiveSection("client");
    }
  };

  if (isLoading) {
    return <LoadingErrorStates isLoading={true} hasError={false} />;
  }

  if (hasError) {
    return <LoadingErrorStates isLoading={false} hasError={true} />;
  }

  return (
    <div className="space-y-4">
      {!selectedCompanyId ? (
        <NoCompanySelected />
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold mb-2 md:mb-0">
                {expandAll ? t.offer.workflow.quickMode : t.offer.workflow.stepByStep}
              </h2>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleToggleAll}
                  className="flex items-center gap-1"
                >
                  {expandAll ? (
                    <>
                      <ChevronUp size={16} /> {t.common.collapseAll}
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} /> {t.common.expandAll}
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {!expandAll && (
              <div className="mb-4">
                <Progress value={progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{t.clientInfo.title}</span>
                  <span>{t.offerDetails.title}</span>
                  <span>{t.products.title}</span>
                  <span>{t.offer.previewTitle}</span>
                </div>
              </div>
            )}
          </div>

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
        </>
      )}
    </div>
  );
};

export default SimpleOfferAccordion;
