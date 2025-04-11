
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { WizardStep } from '@/components/wizard/OfferWizardSteps';

export const useOfferWizard = (
  isLoadingCompanyData: boolean,
  fetchError: boolean,
  selectedCompanyId: string | null
) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);

  // Define steps - without company step
  const wizardSteps: WizardStep[] = [
    { 
      id: 'client', 
      title: t.client.title || 'Client',
      completed: currentStep > 0,
      current: currentStep === 0
    },
    { 
      id: 'details', 
      title: t.offer.details || 'Details',
      completed: currentStep > 1,
      current: currentStep === 1
    },
    { 
      id: 'products', 
      title: t.products.title || 'Products',
      completed: currentStep > 2,
      current: currentStep === 2
    },
    { 
      id: 'preview', 
      title: t.offer.offerPreview || 'Preview',
      completed: false,
      current: currentStep === 3
    }
  ];
  
  const progress = ((currentStep) / (wizardSteps.length - 1)) * 100;

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOpenSaveDialog = () => {
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

  return {
    currentStep,
    wizardSteps,
    progress,
    isSaveDialogOpen,
    setIsSaveDialogOpen,
    handleNext,
    handlePrevious,
    handleOpenSaveDialog,
    isLoadingCompanyData,
    fetchError,
    selectedCompanyId
  };
};
