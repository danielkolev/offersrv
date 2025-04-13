
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

// Define the proper section type that matches what's used in OfferAccordion
export interface AccordionSection {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  content?: any; // Make this optional to match the expected type
}

export function useSections({ isSaveDialogOpen, setIsSaveDialogOpen }: UseSectionsProps): AccordionSection[] {
  const { t } = useLanguage();
  
  return [
    {
      id: "company",
      title: t.companyInfo.title || "Company Info",
      description: t.companyInfo.title || "Enter your company information", // Using title as fallback since description doesn't exist
      component: <CompanyInfoForm />,
      content: null // Add this property to match the expected type
    },
    {
      id: "details",
      title: t.offerDetails.title || "Offer Details",
      description: t.offerDetails.title || "Enter offer details", // Using title as fallback since description doesn't exist
      component: <OfferDetailsForm />,
      content: null
    },
    {
      id: "client",
      title: t.clientInfo.title || "Client Info",
      description: t.clientInfo.title || "Enter client information", // Using title as fallback since description doesn't exist
      component: <ClientInfoForm />,
      content: null
    },
    {
      id: "products",
      title: t.products.title || "Products",
      description: t.products.description || t.common.description || "Add products to your offer",
      component: <ProductsForm />,
      content: null
    },
    {
      id: "preview",
      title: t.offer.previewTitle || "Offer Preview",
      description: t.offer.previewDescription || "Review your offer before saving",
      component: <OfferPreview 
                    isSaveDialogOpen={isSaveDialogOpen} 
                    setIsSaveDialogOpen={setIsSaveDialogOpen} 
                  />,
      content: null
    }
  ];
}
