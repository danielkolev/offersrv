
import React from 'react';
import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Edit, Plus } from 'lucide-react';
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
  onEdit: (product: SavedProduct) => void;
}

const SavedProductItem = ({ product, onSelect, onDelete, onEdit }: SavedProductItemProps) => {
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
            className="gap-1"
          >
            <Plus className="h-3 w-3" />
            {t?.products?.selectProduct || "Select"}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => onEdit(product)}
          >
            <Edit className="h-4 w-4" />
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
                <AlertDialogTitle>{t?.common?.confirmation || "Confirmation"}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t?.savedProducts?.confirmDelete || "Are you sure you want to delete this product?"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t?.common?.cancel || "Cancel"}</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => onDelete(product.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {t?.common?.delete || "Delete"}
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
