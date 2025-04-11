
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { SavedProduct } from '@/types/database';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
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

interface SavedProductItemProps {
  product: SavedProduct;
  onSelect: (product: SavedProduct) => void;
  onDelete: (id: string) => void;
}

const SavedProductItem = ({ product, onSelect, onDelete }: SavedProductItemProps) => {
  const { t, language, currency } = useLanguage();

  return (
    <TableRow key={product.id}>
      <TableCell>
        <div className="font-medium">{product.name}</div>
        {product.description && (
          <div className="text-sm text-muted-foreground">{product.description}</div>
        )}
      </TableCell>
      <TableCell>{product.part_number || '-'}</TableCell>
      <TableCell className="text-right">{formatCurrency(product.unit_price, language, currency)}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onSelect(product)}
          >
            {t.savedProducts.selectProduct}
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
                  {t.savedProducts.deleteConfirmation}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(product.id)}
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

export default SavedProductItem;
