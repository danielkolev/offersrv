
import { ReactNode } from 'react';

export interface AccordionSection {
  id: string;
  title: string;
  content: ReactNode;
}

export interface OfferAccordionProps {
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
}
