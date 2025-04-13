
import React from 'react';
import CompanyInfoForm from '@/components/CompanyInfoForm';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { useLanguage } from '@/context/LanguageContext';

interface UseSectionsProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

export function useSections({ isSaveDialogOpen, setIsSaveDialogOpen }: UseSectionsProps) {
  const { t } = useLanguage();
  
  return [
    {
      id: "company",
      title: t.companyInfo.title,
      description: t.companyInfo.subtitle,
      component: <CompanyInfoForm />
    },
    {
      id: "details",
      title: t.offerDetails.title,
      description: t.offerDetails.subtitle,
      component: <OfferDetailsForm />
    },
    {
      id: "client",
      title: t.clientInfo.title,
      description: t.clientInfo.subtitle,
      component: <ClientInfoForm />
    },
    {
      id: "products",
      title: t.products.title,
      description: t.products.subtitle || t.common.stepDescription,
      component: <ProductsForm />
    },
    {
      id: "preview",
      title: t.offer.previewTitle || "Offer Preview", // Updated title for the preview section
      description: t.offer.previewDescription || "Review your offer before saving",
      component: <OfferPreview 
                    isSaveDialogOpen={isSaveDialogOpen} 
                    setIsSaveDialogOpen={setIsSaveDialogOpen} 
                  />
    }
  ];
}
