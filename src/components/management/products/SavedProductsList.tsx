
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Trash2, Pencil } from 'lucide-react';
import { SavedProduct } from '@/types/database';
import { useLanguage } from '@/context/LanguageContext';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SavedProductsListProps {
  products: SavedProduct[];
  filteredProducts: SavedProduct[];
  isLoading: boolean;
  onSelectProduct: (product: SavedProduct) => void;
  onDeleteProduct: (id: string) => void;
  onEditProduct: (product: SavedProduct) => void;
}

const SavedProductsList = ({ 
  products, 
  filteredProducts, 
  isLoading, 
  onSelectProduct, 
  onDeleteProduct,
  onEditProduct
}: SavedProductsListProps) => {
  const { t, language, currency } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-offer-blue" />
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {t?.savedProducts?.noProductsFound || "No products found. Add your first product!"}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t?.products?.name || "Name"}</TableHead>
          <TableHead>{t?.products?.description || "Description"}</TableHead>
          <TableHead>{t?.products?.partNumber || "Part Number"}</TableHead>
          <TableHead className="text-right">{t?.products?.unitPrice || "Unit Price"}</TableHead>
          <TableHead className="text-right">{t?.common?.actions || "Actions"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="max-w-[200px] truncate">
              {product.description || "-"}
            </TableCell>
            <TableCell>{product.part_number || "-"}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(product.unit_price, language, currency)}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => onEditProduct(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t?.savedProducts?.editProduct}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t?.savedProducts?.deleteProduct}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedProductsList;
