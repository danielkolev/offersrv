
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import SavedOffersList from './SavedOffersList';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { useOffer } from '@/context/offer/OfferContext';

const SavedOffersContent: React.FC = () => {
  const { t, language, currency } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setOffer } = useOffer();
  
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetchOffers();
  }, []);
  
  const fetchOffers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_offers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setSavedOffers(data || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: t.common.error,
        description: t.common.error,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateNew = () => {
    navigate('/new-offer');
  };
  
  const handleLoadOffer = (offer: SavedOffer) => {
    if (offer.offer_data) {
      setOffer(offer.offer_data);
      toast({
        title: t.common.success,
        description: t.savedOffers.offerLoaded,
      });
      navigate('/new-offer');
    } else {
      toast({
        title: t.common.error,
        description: t.savedOffers.loadError,
        variant: 'destructive',
      });
    }
  };
  
  const handleDeleteOffer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('saved_offers')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setSavedOffers(savedOffers.filter(offer => offer.id !== id));
      toast({
        title: t.common.success,
        description: t.savedOffers.offerDeleted,
      });
    } catch (error) {
      console.error('Error deleting offer:', error);
      toast({
        title: t.common.error,
        description: t.savedOffers.deleteError,
        variant: 'destructive',
      });
    }
  };
  
  // Filter offers based on search term
  const filteredOffers = searchTerm
    ? savedOffers.filter(offer => 
        (offer.offer_data?.client?.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (offer.offer_data?.details?.offerNumber?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (offer.draft_code?.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : savedOffers;
  
  return (
    <div className="container py-6 flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">{t.savedOffers.title}</h1>
        
        <Button 
          variant="default" 
          onClick={handleCreateNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t.savedOffers.createNew}
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t.savedOffers.searchPlaceholder}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <SavedOffersList
        savedOffers={filteredOffers}
        isLoading={isLoading}
        searchTerm={searchTerm}
        loadOffer={handleLoadOffer}
        deleteOffer={handleDeleteOffer}
        language={language}
        currency={currency}
        t={t}
      />
    </div>
  );
};

export default SavedOffersContent;
