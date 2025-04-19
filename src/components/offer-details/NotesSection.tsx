
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Translations } from '@/types/language';
import { OfferDetails } from '@/types/offer';

interface NotesSectionProps {
  offerDetails: OfferDetails;
  updateOfferDetails: (details: Partial<OfferDetails>) => void;
  t: Translations;
}

const NotesSection = ({
  offerDetails,
  updateOfferDetails,
  t
}: NotesSectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="offerNotes">{t.offerDetails?.notes || "Notes"}</Label>
      <Textarea
        id="offerNotes"
        value={offerDetails.notes}
        onChange={(e) => updateOfferDetails({ notes: e.target.value })}
        placeholder={t.offerDetails?.notesPlaceholder || "Additional information or terms"}
        rows={4}
      />
    </div>
  );
};

export default NotesSection;

