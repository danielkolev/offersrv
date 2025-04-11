
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';
import { 
  Dialog,
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SavedOffersList from './offers/SavedOffersList';
import SavedOfferDialog from './offers/SavedOfferDialog';
import { fetchSavedOffers, saveOfferToDatabase, deleteOfferFromDatabase } from './offers/savedOffersService';

const SavedOffersManager = () => {
  const { user } = useAuth();
  const { offer } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user && open) {
      handleFetchSavedOffers();
    }
  }, [user, open]);

  const handleFetchSavedOffers = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const offers = await fetchSavedOffers();
      setSavedOffers(offers as SavedOffer[]);
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

  const handleSaveOffer = async () => {
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
      const newOffer = await saveOfferToDatabase(user.id, offer);
      setSavedOffers(prev => [newOffer as SavedOffer, ...prev]);
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

  const handleDeleteOffer = async (id: string) => {
    try {
      await deleteOfferFromDatabase(id);
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

  const handleLoadOffer = (savedOffer: SavedOffer) => {
    if (typeof window.updateCompanyInfo === 'function') {
      window.updateCompanyInfo(savedOffer.offer_data.company);
    }
    
    if (typeof window.updateClientInfo === 'function') {
      window.updateClientInfo(savedOffer.offer_data.client);
    }
    
    if (typeof window.updateOfferDetails === 'function') {
      window.updateOfferDetails(savedOffer.offer_data.details);
    }
    
    if (typeof window.resetProducts === 'function') {
      window.resetProducts(savedOffer.offer_data.products);
    } else {
      if (typeof window.clearProducts === 'function') {
        window.clearProducts();
      }
      
      if (typeof window.addProduct === 'function') {
        savedOffer.offer_data.products.forEach(product => {
          window.addProduct(product);
        });
      }
    }
    
    setOpen(false);
    
    toast({
      title: t.common.success,
      description: 'Offer loaded successfully',
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            {t.savedOffers.title}
          </Button>
        </DialogTrigger>
        
        <SavedOfferDialog open={open} setOpen={setOpen}>
          <div className="mb-4">
            <div className="flex gap-2 my-4">
              <Button 
                onClick={handleSaveOffer} 
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
            
            <SavedOffersList
              savedOffers={savedOffers}
              isLoading={isLoading}
              searchTerm={searchTerm}
              loadOffer={handleLoadOffer}
              deleteOffer={handleDeleteOffer}
              language={language}
              currency={currency}
              t={t}
            />
          </div>
        </SavedOfferDialog>
      </Dialog>
    </>
  );
};

export default SavedOffersManager;
