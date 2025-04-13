
import React from 'react';

export interface OfferAccordionProps {
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
}

export interface AccordionSection {
  id: string;
  title: string;
  description: string;
  component: React.ReactNode;
  content?: any; // Това е опционално, а не задължително
}

// Add the missing NoCompanySelectedProps export
export interface NoCompanySelectedProps {
  message?: string;
}
