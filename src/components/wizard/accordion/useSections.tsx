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
      label: t.companyInfo.title,
      content: <CompanyInfoForm />,
    },
    {
      id: "client",
      label: t.clientInfo.title,
      content: <ClientInfoForm />,
    },
    {
      id: "details",
      label: t.offerDetails.title,
      content: <OfferDetailsForm />,
    },
    {
      id: "products",
      label: t.products.title,
      content: <ProductsForm />,
    },
    {
      id: "preview",
      label: t.offer.preview,
      content: <OfferPreview />,
    },
    {
      id: "save",
      label: t.offer.saveOffer,
      content: (
        <SaveOfferDialog
          open={isSaveDialogOpen}
          onOpenChange={setIsSaveDialogOpen}
        />
      ),
    },
  ];
};
