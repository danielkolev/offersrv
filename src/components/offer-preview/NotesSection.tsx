
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface NotesSectionProps {
  notes: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes }) => {
  const { t } = useLanguage();

  if (!notes) return null;
  
  return (
    <div className="mb-8 print-visible">
      <h3 className="font-medium mb-2">{t.offer.notes}</h3>
      <div className="border rounded-md p-4 bg-offer-lightgray whitespace-pre-line text-sm">
        {notes}
      </div>
    </div>
  );
};

export default NotesSection;
