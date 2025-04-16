
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import CompanySettingsForm from '@/components/company/CompanySettingsForm';
import { useCompanySelection } from '@/hooks/useCompanySelection';

interface CompanyManagerProps {
  onSelectCompany: (companyId: string) => void;
  selectedCompanyId: string | null;
  disableCreate?: boolean; // Add this prop
}

const CompanyManager = ({ 
  onSelectCompany, 
  selectedCompanyId,
  disableCreate = false // Default to false to maintain backward compatibility
}: CompanyManagerProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [openSettings, setOpenSettings] = useState(false);
  const { 
    selectedCompanyId: currentCompanyId,
    isLoading,
    error,
    setCompanyId,
    resetCompanySelection,
    refreshCompanySelection
  } = useCompanySelection();
  
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => setOpenSettings(false);

  // Define the CompanySelector as a functional component
  const InnerCompanySelector = () => {
    const [companies, setCompanies] = useState<{ id: string; name: string; }[]>([]);
    const [isLoadingCompanies, setIsLoadingCompanies] = useState(true);
    const [errorCompanies, setErrorCompanies] = useState<string | null>(null);
  
    const fetchCompanies = useCallback(async () => {
      if (!user) return;
  
      setIsLoadingCompanies(true);
      setErrorCompanies(null);
  
      try {
        // Fixed query to join organization_members table instead of using 'members' column
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name')
          .eq('owner_id', user.id);
  
        if (error) {
          setErrorCompanies(error.message);
          toast({
            title: t.company.error,
            description: t.company.error + ': ' + error.message,
            variant: "destructive",
          })
          console.error("CompanySelector: Error fetching companies:", error);
        } else {
          if (data && data.length > 0) {
            const formattedCompanies = data.map(company => ({
              id: company.id,
              name: company.name,
            }));
            setCompanies(formattedCompanies);
          } else {
            console.log("CompanySelector: No companies found for user");
            setCompanies([]);
          }
        }
      } catch (err: any) {
        setErrorCompanies(err.message);
        toast({
          title: t.company.error,
          description: t.company.error + ': ' + err.message,
          variant: "destructive",
        })
        console.error("CompanySelector: Unexpected error fetching companies:", err);
      } finally {
        setIsLoadingCompanies(false);
      }
    }, [user, t, toast]);
  
    useEffect(() => {
      fetchCompanies();
    }, [fetchCompanies]);
  
    const handleSelect = (value: string) => {
      setCompanyId(value);
      onSelectCompany(value);
    };
  
    return (
      <Select onValueChange={handleSelect} defaultValue={selectedCompanyId || ""}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder={t.company.selectPlaceholder || "Select company"} />
        </SelectTrigger>
        <SelectContent>
          {isLoadingCompanies ? (
            <SelectItem value="loading" disabled>{t.common?.loading || "Loading..."}</SelectItem>
          ) : errorCompanies ? (
            <SelectItem value="error" disabled>{t.company.error || "Error"}: {errorCompanies}</SelectItem>
          ) : companies.length > 0 ? (
            companies.map((company) => (
              <SelectItem key={company.id} value={company.id}>
                {company.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-companies" disabled>
              {t.company.noCompanies || "No companies"}
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <InnerCompanySelector />
      {!disableCreate && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleOpenSettings}
        >
          <Settings className="h-4 w-4" />
        </Button>
      )}
      <Sheet open={openSettings} onOpenChange={setOpenSettings}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{t.company.companySettings || "Company Settings"}</SheetTitle>
            <SheetDescription>
              {t.company.manageCompanies || "Manage your company settings here."}
            </SheetDescription>
          </SheetHeader>
          <CompanySettingsForm onClose={handleCloseSettings} refreshCompanySelection={refreshCompanySelection} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CompanyManager;
