
import React from 'react';
import { SavedOffer } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, FileUp, Trash } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Translations } from '@/types/language';
import OfferStatusBadge from './OfferStatusBadge';

interface MobileOfferCardProps {
  offer: SavedOffer;
  onPreview: (offer: SavedOffer) => void;
  onLoad: (offer: SavedOffer) => void;
  onDelete: (offer: SavedOffer) => void;
  language: string;
  currency: string;
  t: Translations;
}

const MobileOfferCard: React.FC<MobileOfferCardProps> = ({
  offer,
  onPreview,
  onLoad,
  onDelete,
  language,
  currency,
  t
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'bg' ? 'bg-BG' : 'en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  };

  // Extract data from offer_data instead of directly from offer
  const offerNumber = offer.offer_data?.details?.offerNumber || '';
  const clientName = offer.offer_data?.client?.name || t.common.noName || '';
  const totalAmount = offer.offer_data?.details?.totalAmount || 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Номер на оферта и статус */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{offerNumber}</div>
              <div className="text-sm text-muted-foreground">
                {formatDate(offer.created_at || '')}
              </div>
            </div>
            <OfferStatusBadge 
              status={offer.status || 'saved'} 
              t={t}
              isDraft={offer.is_draft}
            />
          </div>
          
          {/* Информация за клиента */}
          <div>
            <div className="text-sm font-medium">{t.savedOffers.client}:</div>
            <div className="text-sm">{clientName}</div>
          </div>
          
          {/* Сума */}
          <div>
            <div className="text-sm font-medium">{t.savedOffers.amount}:</div>
            <div className="text-base font-semibold">
              {formatCurrency(totalAmount, language === 'bg' ? 'bg' : 'en', currency as any)}
            </div>
          </div>
          
          {/* Бутони за действия */}
          <div className="flex flex-wrap gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPreview(offer)}
              className="flex-1"
            >
              <Eye className="h-4 w-4 mr-1" />
              {t.common.view}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onLoad(offer)}
              className="flex-1"
            >
              <FileUp className="h-4 w-4 mr-1" />
              {t.savedOffers.loadOffer}
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(offer)}
              className="flex-1"
            >
              <Trash className="h-4 w-4 mr-1" />
              {t.common.delete}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileOfferCard;
