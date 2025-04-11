
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { formatCurrency, formatDate } from '@/lib/utils';
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
import { Search, Save, Trash2, Loader2 } from 'lucide-react';
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

const SavedOffersManager = () => {
  const { user } = useAuth();
  const { offer, calculateTotal } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && open) {
      fetchSavedOffers();
    }
  }, [user, open]);

  const fetchSavedOffers = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_offers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setSavedOffers(data || []);
    } catch (error: any) {
      console.error('Error fetching saved offers:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveOffer = async () => {
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
        .from('saved_offers')
        .insert({
          user_id: user.id,
          offer_data: offer,
        })
        .select();
        
      if (error) {
        throw error;
      }
      
      setSavedOffers(prev => [data[0], ...prev]);
      toast({
        title: t.common.success,
        description: t.savedOffers.offerSaved,
      });
    } catch (error: any) {
      console.error('Error saving offer:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_offers')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      setSavedOffers(prev => prev.filter(offer => offer.id !== id));
      toast({
        title: t.common.success,
        description: t.savedOffers.offerDeleted,
      });
    } catch (error: any) {
      console.error('Error deleting offer:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const loadOffer = (savedOffer: SavedOffer) => {
    if (typeof window.updateCompanyInfo === 'function') {
      window.updateCompanyInfo(savedOffer.offer_data.company);
    }
    
    // Update client info
    if (typeof window.updateClientInfo === 'function') {
      window.updateClientInfo(savedOffer.offer_data.client);
    }
    
    // Update offer details
    if (typeof window.updateOfferDetails === 'function') {
      window.updateOfferDetails(savedOffer.offer_data.details);
    }
    
    // Update products
    if (typeof window.resetProducts === 'function') {
      window.resetProducts(savedOffer.offer_data.products);
    } else {
      // Fallback if resetProducts is not defined
      if (typeof window.clearProducts === 'function') {
        window.clearProducts();
      }
      
      if (typeof window.addProduct === 'function') {
        savedOffer.offer_data.products.forEach(product => {
          window.addProduct(product);
        });
      }
    }
    
    // Close dialog
    setOpen(false);
    
    toast({
      title: t.common.success,
      description: 'Offer loaded successfully',
    });
  };

  const filteredOffers = savedOffers.filter(offer => {
    const clientName = offer.offer_data.client.name.toLowerCase();
    const offerNumber = offer.offer_data.details.offerNumber.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return clientName.includes(search) || offerNumber.includes(search);
  });

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {t.savedOffers.title}
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.savedOffers.title}</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <div className="flex gap-2 my-4">
              <Button 
                onClick={saveOffer} 
                className="gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {t.savedOffers.saveOffer}
              </Button>
            </div>
            
            <div className="relative mb-4">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.savedOffers.searchPlaceholder}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-offer-blue" />
              </div>
            ) : filteredOffers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {t.savedOffers.noOffersFound}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.savedOffers.offerNumber}</TableHead>
                    <TableHead>{t.savedOffers.date}</TableHead>
                    <TableHead>{t.savedOffers.clientName}</TableHead>
                    <TableHead className="text-right">{t.savedOffers.amount}</TableHead>
                    <TableHead className="text-right">{t.savedOffers.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((savedOffer) => (
                    <TableRow key={savedOffer.id}>
                      <TableCell>
                        {savedOffer.offer_data.details.offerNumber}
                      </TableCell>
                      <TableCell>
                        {formatDate(savedOffer.offer_data.details.date, language)}
                      </TableCell>
                      <TableCell>
                        {savedOffer.offer_data.client.name}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(
                          savedOffer.offer_data.products.reduce(
                            (sum, product) => sum + product.quantity * product.unitPrice,
                            0
                          ),
                          language,
                          currency
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => loadOffer(savedOffer)}
                          >
                            {t.savedOffers.loadOffer}
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
                                  {t.savedOffers.confirmDelete}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t.common.cancel}</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => deleteOffer(savedOffer.id)}
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

export default SavedOffersManager;
