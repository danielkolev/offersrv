
import React from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  TableRow,
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SavedOfferItemProps } from './types';
import { SupportedLanguage, SupportedCurrency } from '@/types/language/base';

const SavedOfferItem = ({ 
  savedOffer, 
  loadOffer, 
  deleteOffer, 
  language, 
  currency, 
  t 
}: SavedOfferItemProps) => {
  return (
    <TableRow key={savedOffer.id}>
      <TableCell>
        {savedOffer.offer_data.details.offerNumber}
      </TableCell>
      <TableCell>
        {formatDate(savedOffer.offer_data.details.date, language as SupportedLanguage)}
      </TableCell>
      <TableCell>
        {savedOffer.offer_data.client.name}
      </TableCell>
      <TableCell className="text-right">
        {formatCurrency(
          savedOffer.offer_data.products.reduce(
            (sum, product) => sum + product.quantity * product.unitPrice,
            0
          ),
          language as SupportedLanguage,
          currency as SupportedCurrency
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => loadOffer(savedOffer)}
          >
            {t.savedOffers.loadOffer}
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t.common.confirmation}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t.savedOffers.confirmDelete}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteOffer(savedOffer.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t.common.delete}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SavedOfferItem;
