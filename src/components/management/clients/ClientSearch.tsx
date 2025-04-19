
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Translations } from '@/types/language';

interface ClientSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  searchType: 'name' | 'vat' | 'eik' | 'email';
  setSearchType: (value: 'name' | 'vat' | 'eik' | 'email') => void;
  t: Translations;
}

const ClientSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  searchType, 
  setSearchType, 
  t 
}: ClientSearchProps) => {
  return (
    <Tabs 
      defaultValue="name" 
      value={searchType} 
      onValueChange={(value) => setSearchType(value as 'name' | 'vat' | 'eik' | 'email')}
    >
      <TabsList className="mb-4">
        <TabsTrigger value="name">{t.savedClients.searchByName}</TabsTrigger>
        <TabsTrigger value="vat">{t.savedClients.searchByVat}</TabsTrigger>
        <TabsTrigger value="eik">{t.savedClients.searchByEik || "Search by EIK"}</TabsTrigger>
        <TabsTrigger value="email">{t.savedClients.searchByEmail || "Search by Email"}</TabsTrigger>
      </TabsList>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.savedClients.searchPlaceholder}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </Tabs>
  );
};

export default ClientSearch;
