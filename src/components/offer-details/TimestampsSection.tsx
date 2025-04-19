
import React from 'react';
import { Translations } from '@/types/language';
import { format } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';

interface TimestampsSectionProps {
  creationDate: string;
  lastSaved: string | null;
  t: Translations;
}

const TimestampsSection = ({
  creationDate,
  lastSaved,
  t
}: TimestampsSectionProps) => {
  const { language } = useLanguage();

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return language === 'bg' 
        ? format(date, 'dd.MM.yyyy HH:mm') 
        : format(date, 'MMM dd, yyyy HH:mm');
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
      <div className="flex items-center">
        <span className="font-medium mr-2">{t.offer.createdAt || "Created"}:</span> 
        {formatDate(creationDate)}
      </div>
      <div className="flex items-center">
        <span className="font-medium mr-2">{t.offer.lastEdited || "Last edited"}:</span> 
        {lastSaved ? formatDate(lastSaved) : "-"}
      </div>
    </div>
  );
};

export default TimestampsSection;
