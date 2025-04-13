
import React from 'react';
import ClientInfoForm from '@/components/ClientInfoForm';
import CompanyInfoForm from '@/components/CompanyInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/products/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { useLanguage } from '@/context/LanguageContext';
import SaveOfferDialog from '@/components/SaveOfferDialog';

export const useSections = ({ isSaveDialogOpen, setIsSaveDialogOpen }: {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (open: boolean) => void;
}) => {
  const { t } = useLanguage();

  return [
    {
      id: "company",
      title: t.companyInfo.title,
      label: t.companyInfo.title,
      content: <CompanyInfoForm />,
    },
    {
      id: "client",
      title: t.clientInfo.title,
      label: t.clientInfo.title,
      content: <ClientInfoForm />,
    },
    {
      id: "details",
      title: t.offerDetails.title,
      label: t.offerDetails.title,
      content: <OfferDetailsForm />,
    },
    {
      id: "products",
      title: t.products.title,
      label: t.products.title,
      content: <ProductsForm />,
    },
    {
      id: "preview",
      title: t.offerDetails.title,
      label: "Preview", // Fallback text
      content: <OfferPreview />,
    },
    {
      id: "save",
      title: "Save Offer", // Fallback text
      label: "Save Offer", // Fallback text
      content: (
        <SaveOfferDialog
          open={isSaveDialogOpen}
          setOpen={setIsSaveDialogOpen}
        />
      ),
    },
  ];
};
