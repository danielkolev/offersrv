
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Client } from '@/types/database';
import { fetchClients } from '../clientsService';
import { useToast } from '@/hooks/use-toast';
import { Translations } from '@/types/language';

export const useClientsFetching = (t: Translations) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const fetchClientsList = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchClientsList();
    }
  }, [user]);

  return {
    clients,
    setClients,
    isLoading,
    fetchClientsList
  };
};
