
import { useState, useMemo } from 'react';
import { Client } from '@/types/database';

interface UseClientSearchProps {
  clients: Client[];
}

export const useClientSearch = ({ clients }: UseClientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'vat' | 'eik' | 'email'>('name');

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      if (searchTerm === '') return true;
      
      switch (searchType) {
        case 'name':
          return client.name.toLowerCase().includes(searchTerm.toLowerCase());
        case 'vat':
          return client.vat_number?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        case 'eik':
          return client.eik_number?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        case 'email':
          return client.email?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
        default:
          return true;
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
