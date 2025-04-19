
import React from 'react';
import { Translations } from '@/types/language';

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
      <div>
        {t.offer.createdAt || "Created"}: {creationDate}
      </div>
      <div>
        {t.offer.lastEdited || "Last edited"}: {lastSaved || "-"}
      </div>
    </div>
  );
};

export default TimestampsSection;
