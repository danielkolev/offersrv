
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Pencil, Package } from 'lucide-react';
import { SavedProduct } from '@/types/database';
import { formatCurrency } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

interface SavedProductItemProps {
  product: SavedProduct;
  onEdit: (product: SavedProduct) => void;
  onDelete: (productId: string) => void;
  onSelect?: (product: SavedProduct) => void;
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
  const isMobile = useIsMobile();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="space-y-1">
            <h3 className="font-medium text-lg leading-tight">{product.name}</h3>
            {product.part_number && (
              <div className="text-xs text-muted-foreground">
                {t.offer.partNumber}: {product.part_number}
              </div>
            )}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description || t.common.description}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-between">
            <div className="text-lg font-semibold mt-2 md:mt-0">
              {formatCurrency(product.unit_price, language, currency as any)}
            </div>
            
            {isMobile ? (
              // На мобилни устройства - по-големи бутони с етикети
              <div className="flex flex-wrap gap-2 mt-3">
                {selectable && onSelect && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelect(product)}
                    className="flex-1"
                  >
                    <Package className="h-4 w-4 mr-1" />
                    {t.savedProducts.selectProduct}
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(product)}
                  className="flex-1"
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  {t.common.edit}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  {t.common.delete}
                </Button>
              </div>
            ) : (
              // На настолни устройства - малки бутони с подсказки
              <div className="flex flex-wrap gap-2 mt-2 md:justify-end">
                {selectable && onSelect && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => onSelect(product)}
                          className="h-8 w-8"
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
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t.common.edit}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
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
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedProductItem;
