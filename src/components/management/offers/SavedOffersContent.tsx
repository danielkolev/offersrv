
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Search, ChevronRight } from 'lucide-react';
import SavedOffersList from './SavedOffersList';
import { supabase } from '@/integrations/supabase/client';
import { SavedOffer } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { useOffer } from '@/context/offer/OfferContext';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

// Помощна функция за изчистване на offerNumber и стари данни при клониране на оферта като драфт
function resetOfferForDraft(offerData: any) {
  // Дълбоко копие и изчистване на нужните полета
  const cleaned = JSON.parse(JSON.stringify(offerData));
  // Изчистваме номера на офертата и датите, ако има такива
  if (cleaned.details) {
    cleaned.details.offerNumber = '';
    cleaned.details.date = new Date().toISOString().slice(0,10);
    cleaned.details.validUntil = '';
    // Други специфични полета може да добавите тук, ако има такива
  }
  // Изчистваме темплейти и други ID-та, ако има
  if (cleaned.templateId) cleaned.templateId = undefined;
  if (cleaned.createdAt) cleaned.createdAt = undefined;
  if (cleaned.lastEdited) cleaned.lastEdited = undefined;

  return cleaned;
}

const SavedOffersContent: React.FC = () => {
  const { t, language, currency } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setOffer, resetOffer } = useOffer();
  
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
      // Cast data to SavedOffer type
      const typedData = (data || []) as unknown as SavedOffer[];
      setSavedOffers(typedData);
    } catch (error) {
      console.error('Error fetching offers:', error);
      toast({
        title: t.common.error,
        description: t.common.error || "An error occurred",
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCreateNew = () => {
    navigate('/new-offer');
  };

  // Зарежда оферта като драфт (копие) и пренасочва към редактора за редакция
  const handleLoadOffer = (offer: SavedOffer) => {
    if (offer.offer_data) {
      // Приемаме, че това е дълбоко копие на офертата – ще се третира като нова чернова
      const newDraft = resetOfferForDraft(offer.offer_data);
      
      // First call resetOffer (which returns void), then proceed with setOffer
      resetOffer();
      setOffer(newDraft);
      
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
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/dashboard">{t.navigation.home}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{t.navigation.savedOffers}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
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
