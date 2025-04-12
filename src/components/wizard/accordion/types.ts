
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

export interface OfferActionButtonsProps {
  onSave: () => void;
  onPrint: () => void;
}

export interface LoadingErrorStatesProps {
  isLoading: boolean;
  hasError: boolean;
}

export interface NoCompanySelectedProps {
  message?: string;
}
