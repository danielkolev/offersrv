
import { useState, useMemo } from 'react';
import { Client } from '@/types/database';

interface UseClientSearchProps {
  clients: Client[];
}

export const useClientSearch = ({ clients }: UseClientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'vat'>('name');

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      if (searchType === 'name') {
        return client.name.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return client.vat_number?.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  }, [clients, searchTerm, searchType]);

  return {
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType,
    filteredClients
  };
};
