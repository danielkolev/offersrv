
import React, { useState } from 'react';
import { SavedOffer } from '@/types/database';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { calculateTotal } from '@/context/offer/calculations';
import OfferActionButtons from './OfferActionButtons';
import { Badge } from '@/components/ui/badge';
import { Translations, SupportedLanguage } from '@/types/language';
import DeleteOfferDialog from './DeleteOfferDialog';
import OfferPreviewModal from './OfferPreviewModal';
import { Edit, Clock } from 'lucide-react';

interface SavedOfferItemProps {
  offer: SavedOffer;
  onLoad: () => void;
  onDelete: () => void;
  language: string;
  currency: string;
  t: Translations;
  displayNumber: string; // New prop for displaying either offer number or draft code
}

const SavedOfferItem: React.FC<SavedOfferItemProps> = ({
  offer,
  onLoad,
  onDelete,
  language,
  currency,
  t,
  displayNumber
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  const totalAmount = calculateTotal(offer.offer_data);
  const clientName = offer.offer_data?.client?.name || t.common.noName;
  
  // Get status display color
  const getStatusBadge = () => {
    if (offer.is_draft) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <Edit className="h-3 w-3 mr-1" />
          {t.offer.statuses.draft}
        </Badge>
      );
    }
    
    switch (offer.status) {
      case 'sent':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t.offer.statuses.sent}</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t.offer.statuses.accepted}</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t.offer.statuses.rejected}</Badge>;
      default:
        return null;
    }
  };

  // Convert language string to SupportedLanguage type
  const typedLanguage = (language === 'bg' || language === 'en') ? language as SupportedLanguage : 'en';

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left section with offer number and client */}
          <div className="p-4 flex-1">
            <div className="flex items-center mb-2 gap-2">
              <h3 className="text-lg font-semibold">
                {`#${displayNumber}`}
              </h3>
              {getStatusBadge()}
            </div>
            
            <p className="text-gray-700 mb-1">{clientName}</p>
            
            <div className="text-sm text-gray-500 mt-2">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(offer.created_at)}
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                {t.common.update}: {formatDate(offer.updated_at)}
              </p>
            </div>
          </div>
          
          {/* Right section with amount and actions */}
          <div className="bg-gray-50 p-4 md:w-64 flex flex-col justify-between">
            <div className="mb-2">
              <p className="text-sm text-gray-500">{t.savedOffers.amount}:</p>
              <p className="text-lg font-medium">
                {formatCurrency(totalAmount, typedLanguage, currency as any)}
              </p>
            </div>
            
            <OfferActionButtons
              onLoad={onLoad}
              onDelete={handleDeleteClick}
              onPreview={handlePreviewClick}
              t={t}
            />
          </div>
        </div>
      </CardContent>
      
      <DeleteOfferDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete();
          setIsDeleteDialogOpen(false);
        }}
        t={t}
      />
      
      {isPreviewModalOpen && (
        <OfferPreviewModal
          savedOffer={offer}
          isOpen={isPreviewModalOpen}
          onClose={() => setIsPreviewModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default SavedOfferItem;
