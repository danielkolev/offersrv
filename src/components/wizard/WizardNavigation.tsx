
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { WizardStep } from './OfferWizardSteps';

interface WizardNavigationProps {
  currentStep: number;
  steps: WizardStep[];
  onPrevious: () => void;
  onNext: () => void;
  onSave: () => void;
  onPrint: () => void;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  steps,
  onPrevious,
  onNext,
  onSave,
  onPrint
}) => {
  const { t } = useLanguage();
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex justify-between">
      <Button
        onClick={onPrevious}
        disabled={currentStep === 0}
        variant="outline"
        className="flex items-center"
      >
        <ChevronLeft className="mr-2 h-4 w-4" /> {t.common.back || 'Back'}
      </Button>
      
      <div className="flex space-x-2">
        {isLastStep && (
          <Button 
            onClick={onSave}
            variant="secondary"
          >
            {t.savedOffers.saveOffer || 'Save Offer'}
          </Button>
        )}
        
        {!isLastStep ? (
          <Button
            onClick={onNext}
            className="flex items-center"
          >
            {t.common.next || 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onPrint}
            variant="default"
          >
            {t.common.print || 'Print'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;
