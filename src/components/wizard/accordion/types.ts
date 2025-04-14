
export interface OfferAccordionProps {
  isLoadingCompanyData: boolean;
  fetchError: boolean;
  selectedCompanyId: string | null;
}

export interface AccordionHeaderProps {
  expandAll: boolean;
  onToggleAll: () => void;
}

export interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
  isActive?: boolean;
  onNavigateNext?: (sectionId: string) => void;
}

export interface ExpandedAccordionProps {
  sections: SectionProps[];
  onNavigateNext: (sectionId: string) => void;
}

export interface CollapsedAccordionProps {
  sections: SectionProps[];
  activeSection: string | null;
  onSectionChange: (sectionId: string | null) => void;
  onNavigateNext: (sectionId: string) => void;
}

export interface OfferActionButtonsProps {
  onSave: () => void;
}

export interface AccordionSectionContentProps {
  section: SectionProps;
  onNavigateNext: (sectionId: string) => void;
}
