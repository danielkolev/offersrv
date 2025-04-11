
import { useState } from 'react';
import { Client } from '@/types/database';

export const useClientDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | undefined>(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const handleOpenAddDialog = () => {
    setCurrentClient(undefined);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  return {
    isDialogOpen,
    setIsDialogOpen,
    currentClient,
    setCurrentClient,
    isEditMode,
    setIsEditMode,
    handleOpenAddDialog,
    handleEditClient
  };
};
