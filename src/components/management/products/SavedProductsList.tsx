
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
    <div className="w-full overflow-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">{t?.products?.name || "Name"}</TableHead>
            <TableHead className="w-1/4 hidden md:table-cell">{t?.products?.description || "Description"}</TableHead>
            <TableHead className="w-1/6 hidden sm:table-cell">{t?.products?.partNumber || "Part Number"}</TableHead>
            <TableHead className="w-1/6 text-right">{t?.products?.unitPrice || "Unit Price"}</TableHead>
            <TableHead className="w-1/6 text-right">{t?.common?.actions || "Actions"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium truncate max-w-[150px]">{product.name}</TableCell>
              <TableCell className="hidden md:table-cell truncate max-w-[200px]">
                {product.description || "-"}
              </TableCell>
              <TableCell className="hidden sm:table-cell truncate">
                {product.part_number || "-"}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {formatCurrency(product.unit_price, language, currency)}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
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
    </div>
  );
};

export default SavedProductsList;
