
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { SavedProduct } from '@/types/database';
import { Product } from '@/types/offer';
import { formatCurrency } from '@/lib/utils';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, Trash2, Loader2, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SavedProductsManager = () => {
  const { user } = useAuth();
  const { offer, addProduct } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'partNumber'>('name');
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (user && open) {
      fetchProducts();
    }
  }, [user, open]);

  const fetchProducts = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_products')
        .select('*')
        .order('name', { ascending: true });
        
      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveProduct = async (product: Product) => {
    if (!user) {
      toast({
        title: t.common.error,
        description: t.auth.notAuthenticated,
        variant: 'destructive',
      });
      return;
    }
    
    setIsSaving(true);
    try {
      const { data, error } = await supabase
        .from('saved_products')
        .insert({
          user_id: user.id,
          name: product.name,
          description: product.description || null,
          part_number: product.partNumber || null,
          unit_price: product.unitPrice,
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      setProducts(prev => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
      toast({
        title: t.common.success,
        description: 'Product saved successfully',
      });
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_products')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: t.common.success,
        description: 'Product deleted successfully',
      });
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const selectProduct = (savedProduct: SavedProduct) => {
    const product: Omit<Product, 'id'> = {
      name: savedProduct.name,
      description: savedProduct.description || undefined,
      partNumber: savedProduct.part_number || undefined,
      quantity: 1,
      unitPrice: savedProduct.unit_price,
    };
    
    addProduct(product);
    setOpen(false);
    
    toast({
      title: t.common.success,
      description: 'Product added to offer',
    });
  };

  const filteredProducts = products.filter(product => {
    if (searchType === 'name') {
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else {
      return product.part_number?.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {t.savedProducts.title}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.savedProducts.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <Tabs defaultValue="name" value={searchType} onValueChange={(value) => setSearchType(value as 'name' | 'partNumber')}>
              <TabsList className="mb-4">
                <TabsTrigger value="name">{t.savedProducts.searchByName}</TabsTrigger>
                <TabsTrigger value="partNumber">{t.savedProducts.searchByPartNumber}</TabsTrigger>
              </TabsList>
              
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.savedProducts.searchPlaceholder}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Tabs>
            
            {offer.products.length > 0 && (
              <div className="border rounded-lg p-4 mb-4 bg-slate-50">
                <h3 className="font-medium mb-2">Current offer products</h3>
                <div className="grid gap-2">
                  {offer.products.map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{product.name}</div>
                        {product.partNumber && <div className="text-sm text-muted-foreground">{product.partNumber}</div>}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => saveProduct(product)}
                        disabled={isSaving}
                      >
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-offer-blue" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t.savedProducts.noProductsFound}
              </div>
            ) : (
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
                            onClick={() => selectProduct(product)}
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
                                  onClick={() => deleteProduct(product.id)}
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
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t.common.close}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SavedProductsManager;
