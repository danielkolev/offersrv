
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { SavedProduct } from '@/types/database';
import { useLanguage } from '@/context/LanguageContext';
import SavedProductItem from './SavedProductItem';

interface SavedProductsListProps {
  products: SavedProduct[];
  filteredProducts: SavedProduct[];
  isLoading: boolean;
  onSelectProduct: (product: SavedProduct) => void;
  onDeleteProduct: (id: string) => void;
}

const SavedProductsList = ({ 
  products, 
  filteredProducts, 
  isLoading, 
  onSelectProduct, 
  onDeleteProduct 
}: SavedProductsListProps) => {
  const { t } = useLanguage();

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
        {t.savedProducts.noProductsFound}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t.products.name}</TableHead>
          <TableHead>{t.products.partNumber}</TableHead>
          <TableHead className="text-right">{t.products.unitPrice}</TableHead>
          <TableHead className="text-right">{t.common.actions}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredProducts.map((product) => (
          <SavedProductItem
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
            onDelete={onDeleteProduct}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SavedProductsList;
