
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionHeaderProps {
  expandAll: boolean;
  onToggleAll: () => void;
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  expandAll,
  onToggleAll
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold">{t?.offer?.createOffer || "Create Offer"}</h2>
      <Button
        variant="outline"
        onClick={onToggleAll}
        className="flex items-center gap-2"
      >
        {expandAll ? (
          <>
            <ChevronUp size={16} />
            {t?.common?.collapseAll || "Collapse All"}
          </>
        ) : (
          <>
            <ChevronDown size={16} />
            {t?.common?.expandAll || "Expand All"}
          </>
        )}
      </Button>
    </div>
  );
};

export default AccordionHeader;
