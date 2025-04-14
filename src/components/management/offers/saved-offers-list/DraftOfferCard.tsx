
import React from 'react';
import { FileEdit } from 'lucide-react';
import { Translations } from '@/types/language';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DraftOfferCardProps {
  onOpenDraft: () => void;
  t: Translations;
}

const DraftOfferCard: React.FC<DraftOfferCardProps> = ({ onOpenDraft, t }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">{t.offer.draftStatus}</h2>
      <Card 
        className="hover:shadow-md transition-shadow cursor-pointer border-amber-200 bg-amber-50"
        onClick={onOpenDraft}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-full text-amber-700">
                <FileEdit size={18} />
              </div>
              <div>
                <div className="font-medium text-amber-800">
                  {t.offer.draftInProgress}
                </div>
                <div className="text-sm text-amber-600">
                  {t.offer.continueWorking}
                </div>
              </div>
            </div>
            <Button variant="outline" className="border-amber-400 text-amber-700 hover:bg-amber-100">
              {t.offer.openDraft}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DraftOfferCard;
