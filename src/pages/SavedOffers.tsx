import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, Loader2, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SavedOffersList from '@/components/management/offers/SavedOffersList';
import { fetchSavedOffers, saveOfferToDatabase, deleteOfferFromDatabase } from '@/components/management/offers/savedOffersService';
import MainSidebar from '@/components/navigation/MainSidebar';

const SavedOffersPage = () => {
  const { user } = useAuth();
  const { offer, resetOffer } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const navigate = useNavigate();
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      handleFetchSavedOffers();
    }
  }, [user]);

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
    
    toast({
      title: t.common.success,
      description: t.savedOffers.offerLoaded,
    });
  };

  const handleCreateNewOffer = () => {
    resetOffer();
    navigate('/');
  };

  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{t.savedOffers.title}</h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="gap-2"
              onClick={handleCreateNewOffer}
            >
              <PlusCircle className="h-4 w-4" />
              {t.savedOffers.createNew}
            </Button>
            
            <Button 
              onClick={handleSaveOffer} 
              className="gap-2"
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {t.savedOffers.saveOffer}
            </Button>
          </div>
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
    </div>
  );
};

export default SavedOffersPage;
