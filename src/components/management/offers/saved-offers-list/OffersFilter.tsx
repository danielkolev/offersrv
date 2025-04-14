
import React from 'react';
import { Translations } from '@/types/language';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

interface OffersFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: Date | undefined;
  setDateFilter: (date: Date | undefined) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  resetFilters: () => void;
  t: Translations;
}

const OffersFilter: React.FC<OffersFilterProps> = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  showFilters,
  setShowFilters,
  resetFilters,
  t
}) => {
  return (
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
                  <SelectItem value="all">{t.common.all}</SelectItem>
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
  );
};

export default OffersFilter;
