
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
}

export const CompanySelector = ({ onSelectCompany, onCreateCompany }: CompanySelectorProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const hasAttemptedFetch = useRef(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const fetchCompanies = useCallback(async () => {
    if (!user || hasAttemptedFetch.current) return;
    
    setLoading(true);
    hasAttemptedFetch.current = true;
    
    try {
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
          if (formattedCompanies.length > 0 && !selectedCompany) {
            setSelectedCompany(formattedCompanies[0].id);
            onSelectCompany(formattedCompanies[0].id);
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
  }, [user, onSelectCompany, selectedCompany, toast, t.common.error]);
  
  useEffect(() => {
    fetchCompanies();
  }, []);  // Removed dependency array to prevent re-runs
  
  const handleCompanyChange = (value: string) => {
    setSelectedCompany(value);
    onSelectCompany(value);
  };
  
  if (loading) {
    return <div className="text-center py-4">{t.common.loading}</div>;
  }
  
  if (fetchError) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-red-500 mr-2">{t.common.error}</div>
        <Button onClick={() => { 
          hasAttemptedFetch.current = false; 
          fetchCompanies(); 
        }} size="sm" variant="outline">
          Retry
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {companies.length > 0 ? (
        <>
          <Select value={selectedCompany} onValueChange={handleCompanyChange}>
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
