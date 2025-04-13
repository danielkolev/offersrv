
import React from 'react';
import { SavedOffer } from '@/types/database';
import { Loader2, FileEdit, Eye, Trash2, Info } from 'lucide-react';
import { Translations } from '@/types/language';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { SupportedLanguage } from '@/types/language/base';
import { Badge } from '@/components/ui/badge';
import { calculateTotal } from '@/context/offer/calculations';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import OfferPreviewModal from './saved-offer-item/OfferPreviewModal';
import DeleteOfferDialog from './saved-offer-item/DeleteOfferDialog';

interface SavedOffersListProps {
  savedOffers: SavedOffer[];
  isLoading: boolean;
  searchTerm: string;
  loadOffer: (offer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  language: string;
  currency: string;
  t: Translations;
}

const SavedOffersList: React.FC<SavedOffersListProps> = ({
  savedOffers,
  isLoading,
  searchTerm,
  loadOffer,
  deleteOffer,
  language,
  currency,
  t
}) => {
  const [previewOffer, setPreviewOffer] = React.useState<SavedOffer | null>(null);
  const [deleteDialogOffer, setDeleteDialogOffer] = React.useState<SavedOffer | null>(null);

  // Форматиране на номера на офертата
  const formatOfferNumber = (offer: SavedOffer) => {
    // За чернови оферти показваме кода на черновата вместо номера на офертата
    if (offer.is_draft && offer.draft_code) {
      return offer.draft_code;
    }
    
    // За обикновени оферти показваме номера на офертата
    return offer.offer_data?.details?.offerNumber || t.common.noName;
  };

  // Форматиране на дата
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  // Получаване на статус баджа
  const getStatusBadge = (offer: SavedOffer) => {
    if (offer.is_draft) {
      return (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          <FileEdit className="h-3 w-3 mr-1" />
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

  // Изчисляване на общата сума
  const calculateOfferTotal = (offer: SavedOffer) => {
    if (!offer.offer_data) return 0;
    return calculateTotal(offer.offer_data);
  };

  // Обработка на клик върху бутон за преглед
  const handlePreview = (offer: SavedOffer) => {
    setPreviewOffer(offer);
  };

  // Обработка на клик върху бутон за изтриване
  const handleDelete = (offer: SavedOffer) => {
    setDeleteDialogOffer(offer);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (savedOffers.length === 0) {
    // Показване на съобщение, когато няма намерени оферти
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {searchTerm 
            ? t.savedOffers.noOffersFoundSearch 
            : t.savedOffers.noOffersFound}
        </p>
      </div>
    );
  }

  // Конвертиране на string към SupportedLanguage
  const typedLanguage = (language === 'bg' || language === 'en') ? language as SupportedLanguage : 'en';

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t.savedOffers.offerNumber}</TableHead>
            <TableHead>{t.savedOffers.client}</TableHead>
            <TableHead>{t.offer.status}</TableHead>
            <TableHead className="text-right">{t.savedOffers.amount}</TableHead>
            <TableHead>{t.savedOffers.date}</TableHead>
            <TableHead className="text-right">{t.savedOffers.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedOffers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">
                #{formatOfferNumber(offer)}
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">
                    {offer.offer_data?.client?.name || t.common.noName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {offer.offer_data?.client?.email || ''}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getStatusBadge(offer)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(calculateOfferTotal(offer), typedLanguage, currency as any)}
              </TableCell>
              <TableCell>
                <div className="text-sm">
                  {formatDate(offer.created_at)}
                  <div className="text-xs text-muted-foreground">
                    {t.common.update}: {formatDate(offer.updated_at)}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => handlePreview(offer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.savedOffers.viewOffer}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => loadOffer(offer)}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.savedOffers.loadOffer}</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(offer)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{t.savedOffers.deleteOffer}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Модален прозорец за преглед на оферта */}
      {previewOffer && (
        <OfferPreviewModal 
          savedOffer={previewOffer} 
          isOpen={Boolean(previewOffer)} 
          onClose={() => setPreviewOffer(null)} 
        />
      )}

      {/* Диалог за потвърждение на изтриване */}
      {deleteDialogOffer && (
        <DeleteOfferDialog 
          isOpen={Boolean(deleteDialogOffer)} 
          onClose={() => setDeleteDialogOffer(null)} 
          onConfirm={() => {
            if (deleteDialogOffer) {
              deleteOffer(deleteDialogOffer.id);
              setDeleteDialogOffer(null);
            }
          }} 
          t={t} 
        />
      )}
    </div>
  );
};

export default SavedOffersList;
