import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useProducts } from '@/context/products/ProductsContext';
import { Product } from '@/types/product';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from 'lucide-react';

interface ProductSelectorProps {
  onAddProduct: (product: Product) => void;
}

const ProductSelector = ({ onAddProduct }) => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.partNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const onSelectProduct = () => {
    if (selectedProduct) {
      onAddProduct(selectedProduct);
    }
  };
  
  // Use the Button component with appropriate sizing for mobile
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size={isMobile ? "sm" : "default"}
          className={isMobile ? "text-xs px-2 py-1 h-auto" : ""}
        >
          {t.products.selectExisting}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%]">
        <DialogHeader>
          <DialogTitle>{t.products.selectExistingProduct}</DialogTitle>
          <DialogDescription>
            {t.products.browseAndSelect}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <Input
              id="search"
              placeholder={t.products.searchProducts}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>
          <div className="overflow-auto max-h-[400px]">
            <Table>
              <TableCaption>{t.products.availableProducts}</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">{t.products.name}</TableHead>
                  <TableHead>{t.products.description}</TableHead>
                  <TableHead className="text-right">{t.products.price}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} onClick={() => handleSelectProduct(product)} className={`cursor-pointer ${selectedProduct?.id === product.id ? 'bg-accent' : ''}`}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell className="text-right">{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSelectProduct} disabled={!selectedProduct}>{t.products.addProduct}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductSelector;
