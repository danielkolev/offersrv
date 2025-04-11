
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchType: 'name' | 'partNumber';
  setSearchType: (type: 'name' | 'partNumber') => void;
}

const ProductSearch = ({ 
  searchTerm, 
  setSearchTerm, 
  searchType, 
  setSearchType 
}: ProductSearchProps) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="name" value={searchType} onValueChange={(value) => setSearchType(value as 'name' | 'partNumber')}>
      <TabsList className="mb-4">
        <TabsTrigger value="name">{t.savedProducts.searchByName}</TabsTrigger>
        <TabsTrigger value="partNumber">{t.savedProducts.searchByPartNumber}</TabsTrigger>
      </TabsList>
      
      <div className="relative mb-4">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={t.savedProducts.searchPlaceholder}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </Tabs>
  );
};

export default ProductSearch;
