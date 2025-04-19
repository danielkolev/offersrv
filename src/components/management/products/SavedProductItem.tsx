
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil, Package } from 'lucide-react';
import { Product } from '@/types/offer';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SavedProductItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onSelect?: (product: Product) => void;
  selectable?: boolean;
}

const SavedProductItem: React.FC<SavedProductItemProps> = ({
  product,
  onEdit,
  onDelete,
  onSelect,
  selectable = false
}) => {
  const { t, language, currency } = useLanguage();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <h3 className="font-medium text-lg leading-tight">{product.name}</h3>
            {product.partNumber && (
              <div className="text-xs text-muted-foreground">
                {t.offer.partNumber}: {product.partNumber}
              </div>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description || t.common.noDescription}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-between">
            <div className="text-lg font-semibold">
              {formatCurrency(product.unitPrice, language, currency as any)}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2 md:justify-end">
              {selectable && onSelect && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => onSelect(product)}
                      >
                        <Package className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.savedProducts.selectProduct}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => onEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.savedProducts.editProduct}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.savedProducts.deleteProduct}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedProductItem;
