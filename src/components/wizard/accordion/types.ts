
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
  content?: any; // Make this optional to match our implementation
}

// Add the missing NoCompanySelectedProps export
export interface NoCompanySelectedProps {
  message?: string;
}

