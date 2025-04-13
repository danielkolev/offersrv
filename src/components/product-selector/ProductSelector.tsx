
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search, Plus, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { fetchSavedProducts, convertToOfferProduct } from '@/components/management/products/productsService';
import { SavedProduct } from '@/types/database';
import { Product } from '@/types/offer';
import { formatCurrency } from '@/lib/utils';

interface ProductSelectorProps {
  onSelectProduct: (product: Omit<Product, 'id'>) => void;
  buttonText?: string;
}

const ProductSelector = ({ onSelectProduct, buttonText }: ProductSelectorProps) => {
  const { t, language, currency } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'partNumber'>('name');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadProducts();
    }
  }, [isOpen]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const userId = 'current-user'; // This will be replaced by the actual user ID in the service
      const data = await fetchSavedProducts(userId);
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProduct = (savedProduct: SavedProduct) => {
    const product = convertToOfferProduct(savedProduct);
    onSelectProduct(product);
    setIsOpen(false);
  };

  const filteredProducts = products.filter(product => {
    if (searchType === 'name') {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return product.part_number?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          className="flex gap-2"
        >
          <Plus size={16} />
          {buttonText || t.products.selectExisting}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>{t.products.selectProduct}</SheetTitle>
        </SheetHeader>
        
        <div className="py-4">
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.savedProducts.searchPlaceholder}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant={searchType === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('name')}
              className="whitespace-nowrap"
            >
              {t.savedProducts.searchByName}
            </Button>
            <Button
              variant={searchType === 'partNumber' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSearchType('partNumber')}
              className="whitespace-nowrap"
            >
              {t.savedProducts.searchByPartNumber}
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p>{t.common.loading}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 rounded-md shadow-inner bg-gray-50 p-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 border rounded-md hover:bg-muted cursor-pointer bg-white"
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="font-medium">{product.name}</div>
                    {product.part_number && (
                      <div className="text-sm text-muted-foreground">
                        {t.products.partNumber}: {product.part_number}
                      </div>
                    )}
                    <div className="flex justify-between mt-1">
                      <div className="text-sm text-muted-foreground">
                        {product.description?.substring(0, 50)}{product.description?.length > 50 ? '...' : ''}
                      </div>
                      <div className="font-medium text-gray-800">
                        {formatCurrency(product.unit_price, language, currency)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProducts.length > 5 && (
                <div className="text-center mt-2 text-muted-foreground text-sm">
                  <ChevronDown className="h-4 w-4 inline-block" /> Scroll for more products
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm 
                ? t.savedProducts.noProductsFoundSearch 
                : t.savedProducts.noProductsFound}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProductSelector;
