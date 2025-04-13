
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { Company } from '@/types/company';
import { useToast } from '@/hooks/use-toast';

interface CompanySelectorProps {
  onSelectCompany: (companyId: string) => void;
  onCreateCompany: () => void;
  selectedCompanyId?: string | null;
}

export const CompanySelector = ({ onSelectCompany, onCreateCompany, selectedCompanyId }: CompanySelectorProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const hasAttemptedFetch = useRef(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Set initial selection based on provided selectedCompanyId
  useEffect(() => {
    if (selectedCompanyId && !selected) {
      setSelected(selectedCompanyId);
    }
  }, [selectedCompanyId, selected]);
  
  const fetchCompanies = useCallback(async () => {
    if (!user || hasAttemptedFetch.current) return;
    
    setLoading(true);
    hasAttemptedFetch.current = true;
    
    try {
      console.log("Fetching companies for user:", user.id);
      
      // Get companies the user is a member of through the organization_members table
      const { data: memberData, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id')
        .eq('user_id', user.id);
        
      if (memberError) throw memberError;
      
      if (memberData && memberData.length > 0) {
        const companyIds = memberData.map(member => member.organization_id);
        
        // Get company details
        const { data: companiesData, error: companiesError } = await supabase
          .from('organizations')
          .select('id, name, logo_url')
          .in('id', companyIds)
          .order('name');
          
        if (companiesError) throw companiesError;
        
        if (companiesData) {
          // Map the data to our Company interface
          const formattedCompanies: Company[] = companiesData.map(org => ({
            id: org.id,
            name: org.name,
            logo_url: org.logo_url
          }));
          
          setCompanies(formattedCompanies);
          
          // Set selected company if not already set
          if (formattedCompanies.length > 0) {
            // Use either the provided selectedCompanyId, previously selected value, or the first company
            const companyToSelect = selectedCompanyId && formattedCompanies.some(c => c.id === selectedCompanyId)
              ? selectedCompanyId
              : selected || formattedCompanies[0].id;
              
            setSelected(companyToSelect);
            onSelectCompany(companyToSelect);
            console.log("Selected company:", companyToSelect);
          }
        }
      } else {
        setCompanies([]);
      }
      
      setFetchError(false);
    } catch (error: any) {
      console.error('Error fetching companies:', error);
      setFetchError(true);
      toast({
        title: t.common.error,
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [user, onSelectCompany, selectedCompanyId, selected, toast, t.common.error]);
  
  useEffect(() => {
    fetchCompanies();
  }, []);  // Intentionally empty dependency array
  
  const handleCompanyChange = (value: string) => {
    console.log("Company selection changed to:", value);
    setSelected(value);
    onSelectCompany(value);
  };
  
  const handleRetry = () => {
    hasAttemptedFetch.current = false;
    fetchCompanies();
  };
  
  if (loading) {
    return <div className="text-center py-4">{t.common.loading}</div>;
  }
  
  if (fetchError) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-red-500 mr-2">{t.common.error}</div>
        <Button onClick={handleRetry} size="sm" variant="outline">
          {t.common.retry}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {companies.length > 0 ? (
        <>
          <Select value={selected} onValueChange={handleCompanyChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={t.company.selectPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {companies.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  <div className="flex items-center gap-2">
                    {company.logo_url && (
                      <img 
                        src={company.logo_url} 
                        alt={company.name} 
                        className="h-5 w-5 object-contain" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    {company.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onCreateCompany}
            title={t.company.createNew}
          >
            <Plus size={16} />
          </Button>
        </>
      ) : (
        <Button onClick={onCreateCompany}>
          <Plus size={16} className="mr-2" />
          {t.company.createFirst}
        </Button>
      )}
    </div>
  );
};

export default CompanySelector;
