
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OfferWizardSteps, { WizardStep } from './OfferWizardSteps';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import OfferTemplates from '@/components/templates/OfferTemplates';
import SaveOfferDialog from '@/components/SaveOfferDialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

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
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  // Start from the client step (index 0) instead of company step
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  
  // Define steps - removed company step
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

  // Render the current step content
  const renderStepContent = () => {
    if (!selectedCompanyId) {
      return (
        <div className="text-center py-8">
          {t.company.selectFirst}
        </div>
      );
    }

    if (isLoadingCompanyData) {
      return (
        <div className="text-center py-4">{t.common.loading}</div>
      );
    }

    if (fetchError) {
      return (
        <div className="text-center py-4 text-red-500">
          {t.common.error}
        </div>
      );
    }

    switch (currentStep) {
      case 0: // Client
        return (
          <div className="space-y-6">
            <ClientInfoForm />
          </div>
        );
      case 1: // Offer Details
        return (
          <div className="space-y-6">
            <OfferTemplates />
            <OfferDetailsForm />
          </div>
        );
      case 2: // Products
        return (
          <div className="space-y-6">
            <ProductsForm />
          </div>
        );
      case 3: // Preview
        return (
          <OfferPreview 
            isSaveDialogOpen={isSaveDialogOpen}
            setIsSaveDialogOpen={setIsSaveDialogOpen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <OfferWizardSteps 
        steps={wizardSteps}
        currentStepIndex={currentStep}
        progress={progress}
      />
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> {t.common.back || 'Back'}
        </Button>
        
        <div className="flex space-x-2">
          {currentStep === wizardSteps.length - 1 && (
            <Button 
              onClick={handleOpenSaveDialog}
              variant="secondary"
            >
              {t.savedOffers.saveOffer || 'Save Offer'}
            </Button>
          )}
          
          {currentStep < wizardSteps.length - 1 ? (
            <Button
              onClick={handleNext}
              className="flex items-center"
            >
              {t.common.next || 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={() => window.print()}
              variant="default"
            >
              {t.common.print || 'Print'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfferWizard;
