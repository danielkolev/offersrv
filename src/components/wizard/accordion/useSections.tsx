
import React from 'react';
import CompanyInfoForm from '@/components/CompanyInfoForm';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/products/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { useLanguage } from '@/context/LanguageContext';

interface UseSectionsProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

// Use the AccordionSection type from the types.ts file
import { AccordionSection } from './types';

export function useSections({ isSaveDialogOpen, setIsSaveDialogOpen }: UseSectionsProps): AccordionSection[] {
  const { t } = useLanguage();
  
  return [
    {
      id: "client",
      title: t.clientInfo.title || "Client Info",
      description: t.clientInfo.description || t.clientInfo.title || "Enter client information",
      component: <ClientInfoForm />,
      content: null
    },
    {
      id: "details",
      title: t.offerDetails.title || "Offer Details",
      description: t.offerDetails.description || t.offerDetails.title || "Enter offer details",
      component: <OfferDetailsForm />,
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
