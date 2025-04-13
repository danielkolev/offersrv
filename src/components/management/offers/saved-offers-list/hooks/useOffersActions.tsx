
import React from 'react';
import { SavedOffer } from '@/types/database';

export const useOffersActions = (
  loadOffer: (offer: SavedOffer) => void,
  deleteOffer: (id: string) => void
) => {
  const [previewOffer, setPreviewOffer] = React.useState<SavedOffer | null>(null);
  const [deleteDialogOffer, setDeleteDialogOffer] = React.useState<SavedOffer | null>(null);

  // Handle preview button click
  const handlePreview = (offer: SavedOffer) => {
    setPreviewOffer(offer);
  };

  // Handle load button click
  const handleLoad = (offer: SavedOffer) => {
    loadOffer(offer);
  };

  // Handle delete button click
  const handleDelete = (offer: SavedOffer) => {
    setDeleteDialogOffer(offer);
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (deleteDialogOffer) {
      deleteOffer(deleteDialogOffer.id);
      setDeleteDialogOffer(null);
    }
  };

  return {
    previewOffer,
    setPreviewOffer,
    deleteDialogOffer,
    setDeleteDialogOffer,
    handlePreview,
    handleLoad,
    handleDelete,
    handleConfirmDelete
  };
};
