
import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Company } from '@/types/company';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface CompanySelectorProps {
  companies: Company[];
  selectedCompanyId: string | null;
  onSelectCompany: (companyId: string) => void;
  onCreateCompany: () => void;
  className?: string;
  placement?: 'top' | 'bottom' | 'right' | 'left';
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onCreateCompany,
  className,
  placement = 'bottom',
}) => {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Find the currently selected company
  useEffect(() => {
    const company = companies.find((company) => company.id === selectedCompanyId);
    setSelectedCompany(company || null);
  }, [selectedCompanyId, companies]);

  // Display company name based on selected language
  const getCompanyDisplayName = (company: Company) => {
    if (language === 'en' && company.name_en) {
      return company.name_en;
    }
    return company.name;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {selectedCompany ? (
            <span className="truncate">{getCompanyDisplayName(selectedCompany)}</span>
          ) : (
            <span className="text-muted-foreground">{t.company.selectPlaceholder}</span>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0" align="start" side={placement}>
        <Command>
          <CommandInput placeholder={t.company.selectPlaceholder} />
          <CommandList>
            <CommandEmpty>{t.company.noCompanies}</CommandEmpty>
            <CommandGroup heading={t.company.selectCompany}>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.id}
                  onSelect={() => {
                    onSelectCompany(company.id || '');
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedCompanyId === company.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {getCompanyDisplayName(company)}
                </CommandItem>
              ))}
            </CommandGroup>
            
            <Separator className="my-1" />
            
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onCreateCompany();
                  setOpen(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.company.createNew}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelector;
