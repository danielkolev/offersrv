
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';

interface NotesSectionProps {
  notes: string;
  settings?: any;
  displayLanguage: SupportedLanguage;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, settings, displayLanguage }) => {
  const { t } = useLanguage();

  if (!notes) return null;
  
  return (
    <div className="mb-8 print-visible">
      <h3 className={cn(
        "font-medium mb-2",
        settings?.appearance?.primaryColor ? "" : ""
      )}
      style={{ 
        color: settings?.appearance?.primaryColor || ""
      }}>
        {displayLanguage === 'bg' ? 'Информация към офертата' : 'Offer Information'}
      </h3>
      <div className={cn(
        "border rounded-md p-4 whitespace-pre-line text-sm",
        settings?.appearance?.secondaryColor ? "" : "bg-offer-lightgray"
      )}
      style={{ 
        backgroundColor: settings?.appearance?.secondaryColor || ""
      }}>
        {notes}
      </div>
    </div>
  );
};

export default NotesSection;
