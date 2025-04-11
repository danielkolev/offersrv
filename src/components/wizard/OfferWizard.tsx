
import React from 'react';
import OfferWizardSteps from './OfferWizardSteps';
import WizardNavigation from './WizardNavigation';
import WizardContent from './WizardContent';
import { useOfferWizard } from '@/hooks/useOfferWizard';

interface OfferWizardProps {
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
}

const OfferWizard = ({ 
  isLoadingCompanyData, 
  fetchError, 
  selectedCompanyId,
  onSelectCompany
}: OfferWizardProps) => {
  const {
    currentStep,
    wizardSteps,
    progress,
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    handleNext,
    handlePrevious,
    handleOpenSaveDialog
  } = useOfferWizard(isLoadingCompanyData, fetchError, selectedCompanyId);

  return (
    <div className="space-y-6">
      <OfferWizardSteps 
        steps={wizardSteps}
        currentStepIndex={currentStep}
        progress={progress}
      />
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <WizardContent 
          currentStep={currentStep}
          selectedCompanyId={selectedCompanyId}
          isLoadingCompanyData={isLoadingCompanyData}
          fetchError={fetchError}
          isSaveDialogOpen={isSaveDialogOpen}
          setIsSaveDialogOpen={setIsSaveDialogOpen}
        />
      </div>
      
      <WizardNavigation 
        currentStep={currentStep}
        steps={wizardSteps}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSave={handleOpenSaveDialog}
        onPrint={() => window.print()}
      />
    </div>
  );
};

export default OfferWizard;
