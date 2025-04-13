
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { SavedOffer } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Save, Loader2, PlusCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SavedOffersList from '@/components/management/offers/SavedOffersList';
import { fetchSavedOffers, saveOfferToDatabase, deleteOfferFromDatabase } from '@/components/management/offers/savedOffersService';
import BackButton from '@/components/navigation/BackButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from 'date-fns';

const SavedOffersContent: React.FC = () => {
  const { user } = useAuth();
  const { offer, setOffer, resetOffer } = useOffer();
  const { toast } = useToast();
  const { t, language, currency } = useLanguage();
  const navigate = useNavigate();
  const [savedOffers, setSavedOffers] = useState<SavedOffer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);

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
    console.log("Loading offer data:", savedOffer.offer_data);
    
    try {
      // Set the offer data
      setOffer(savedOffer.offer_data);
      
      toast({
        title: t.common.success,
        description: t.savedOffers.offerLoaded,
      });
      
      // Navigate to the edit page
      navigate('/new-offer');
    } catch (error) {
      console.error("Error loading offer:", error);
      toast({
        title: t.common.error,
        description: "Failed to load offer data",
        variant: 'destructive',
      });
    }
  };

  const handleCreateNewOffer = () => {
    resetOffer();
    navigate('/new-offer');
  };
  
  const getFilteredOffers = () => {
    let filtered = [...savedOffers];
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(offer => {
        const clientName = offer.offer_data.client.name.toLowerCase();
        const offerNumber = offer.offer_data.details.offerNumber.toLowerCase();
        return clientName.includes(searchLower) || offerNumber.includes(searchLower);
      });
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(offer => {
        if (statusFilter === 'draft') {
          return offer.is_draft === true;
        }
        // Add more status filters when implemented
        return true;
      });
    }
    
    // Apply date filter
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filtered = filtered.filter(offer => {
        const offerDate = new Date(offer.created_at);
        return offerDate.toDateString() === filterDate.toDateString();
      });
    }
    
    return filtered;
  };
  
  const resetFilters = () => {
    setStatusFilter('');
    setDateFilter(undefined);
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <BackButton label={t.common.back} to="/" />
          <h1 className="text-2xl font-bold">{t.savedOffers.title}</h1>
        </div>
        
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
      
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.savedOffers.searchPlaceholder}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Popover open={showFilters} onOpenChange={setShowFilters}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {t.savedOffers.filter}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h3 className="font-medium">{t.savedOffers.filter}</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.offer.status}</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.offer.status} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem value="draft">{t.offer.statuses.draft}</SelectItem>
                    <SelectItem value="sent">{t.offer.statuses.sent}</SelectItem>
                    <SelectItem value="accepted">{t.offer.statuses.accepted}</SelectItem>
                    <SelectItem value="rejected">{t.offer.statuses.rejected}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t.savedOffers.date}</label>
                <Calendar
                  mode="single"
                  selected={dateFilter}
                  onSelect={setDateFilter}
                  className="rounded-md border"
                />
              </div>
              
              <div className="flex justify-between pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFilters}
                >
                  {t.common.reset}
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setShowFilters(false)}
                >
                  {t.common.apply}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <SavedOffersList
        savedOffers={getFilteredOffers()}
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
