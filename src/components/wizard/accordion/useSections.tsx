
import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ClientInfoForm from '@/components/ClientInfoForm';
import OfferDetailsForm from '@/components/OfferDetailsForm';
import ProductsForm from '@/components/ProductsForm';
import OfferPreview from '@/components/OfferPreview';
import { AccordionSection } from './types';

interface UseSectionsProps {
  isSaveDialogOpen: boolean;
  setIsSaveDialogOpen: (isOpen: boolean) => void;
}

export const useSections = ({
  isSaveDialogOpen,
  setIsSaveDialogOpen
}: UseSectionsProps) => {
  const { t } = useLanguage();

  const sections = useMemo<AccordionSection[]>(() => [
    {
      id: "client",
      title: t?.client?.title || "Client",
      content: <ClientInfoForm />
    },
    {
      id: "details",
      title: t?.offer?.details || "Offer Details",
      content: <OfferDetailsForm />
    },
    {
      id: "products",
      title: t?.products?.title || "Products",
      content: <ProductsForm />
    },
    {
      id: "preview",
      title: t?.offer?.offerPreview || "Offer Preview",
      content: (
        <OfferPreview 
          isSaveDialogOpen={isSaveDialogOpen}
          setIsSaveDialogOpen={setIsSaveDialogOpen}
        />
      )
    }
  ], [t, isSaveDialogOpen, setIsSaveDialogOpen]);

  return sections;
};
