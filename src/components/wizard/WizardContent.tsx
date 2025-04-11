
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import OfferTemplates from '@/components/templates/OfferTemplates';

interface WizardContentProps {
  currentStep: number;
  selectedCompanyId: string | null;
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (open: boolean) => void;
}

const WizardContent: React.FC<WizardContentProps> = ({
  currentStep,
  selectedCompanyId,
  isLoadingCompanyData,
  fetchError,
  isSaveDialogOpen,
  setIsSaveDialogOpen
}) => {
  const { t } = useLanguage();

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

export default WizardContent;
