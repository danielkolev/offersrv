
import React from 'react';
import { SavedOffer } from '@/types/database';
import { Translations } from '@/types/language';
import OffersTable from './saved-offers-list/OffersTable';
import OfferPreviewModal from './saved-offer-item/OfferPreviewModal';
import DeleteOfferDialog from './saved-offer-item/DeleteOfferDialog';
import { useOffersActions } from './saved-offers-list/hooks/useOffersActions';

interface SavedOffersListProps {
  savedOffers: SavedOffer[];
  isLoading: boolean;
  searchTerm: string;
  loadOffer: (offer: SavedOffer) => void;
  deleteOffer: (id: string) => void;
  language: string;
  currency: string;
  t: Translations;
}

const SavedOffersList: React.FC<SavedOffersListProps> = ({
  savedOffers,
  isLoading,
  searchTerm,
  loadOffer,
  deleteOffer,
  language,
  currency,
  t
}) => {
  const {
    previewOffer,
    setPreviewOffer,
    deleteDialogOffer,
    setDeleteDialogOffer,
    handlePreview,
    handleLoad,
    handleDelete,
    handleConfirmDelete
  } = useOffersActions(loadOffer, deleteOffer);

  return (
    <div>
      <OffersTable
        savedOffers={savedOffers}
        isLoading={isLoading}
        searchTerm={searchTerm}
        onPreview={handlePreview}
        onLoad={handleLoad}
        onDelete={handleDelete}
        language={language}
        currency={currency}
        t={t}
      />

      {/* Offer preview modal */}
      {previewOffer && (
        <OfferPreviewModal 
          savedOffer={previewOffer} 
          isOpen={Boolean(previewOffer)} 
          onClose={() => setPreviewOffer(null)} 
        />
      )}

      {/* Delete confirmation dialog */}
      {deleteDialogOffer && (
        <DeleteOfferDialog 
          isOpen={Boolean(deleteDialogOffer)} 
          onClose={() => setDeleteDialogOffer(null)} 
          onConfirm={handleConfirmDelete} 
          t={t} 
        />
      )}
    </div>
  );
};

export default SavedOffersList;
