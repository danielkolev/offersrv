
import { SavedOffer } from '@/types/database';
import { Translations } from '@/types/language';

export interface SavedOfferItemProps {
  savedOffer: SavedOffer;
  loadOffer: (savedOffer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  language: string;
  currency: string;
  t: any;
}

export interface SavedOffersListProps {
  savedOffers: SavedOffer[];
  isLoading: boolean;
  searchTerm: string;
  loadOffer: (savedOffer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  language: string;
  currency: string;
  t: any;
}

export interface SavedOfferDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  children: React.ReactNode;
}
