
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/context/LanguageContext';
import { Building } from 'lucide-react';
import { SupportedLanguage } from '@/types/language/base';
import { cn } from '@/lib/utils';

interface CompanyManagerProps {
  onSelectCompany: (companyId: string) => void;
  selectedCompanyId: string | null;
  disableCreate?: boolean;
  prominentDisplay?: boolean;
  currentLanguage?: SupportedLanguage;
}

const CompanyManager: React.FC<CompanyManagerProps> = ({ 
  onSelectCompany, 
  selectedCompanyId,
  disableCreate = false,
  prominentDisplay = false,
  currentLanguage = 'bg'
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCompanies();
    }
  }, [user]);

  useEffect(() => {
    // Check localStorage for saved selection
    const savedCompanyId = localStorage.getItem('selectedCompanyId');
    if (savedCompanyId && !selectedCompanyId) {
      onSelectCompany(savedCompanyId);
    }
  }, [companies, selectedCompanyId, onSelectCompany]);

  const fetchUserCompanies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user?.id);

      if (error) {
        console.error('Error fetching companies:', error);
        return;
      }

      setCompanies(data || []);
      
      // Auto-select first company if none selected
      if (data && data.length > 0 && !selectedCompanyId) {
        onSelectCompany(data[0].id);
        localStorage.setItem('selectedCompanyId', data[0].id);
      }
    } catch (error) {
      console.error('Error in fetchUserCompanies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompanyChange = (value: string) => {
    onSelectCompany(value);
    localStorage.setItem('selectedCompanyId', value);
  };

  // Function to get company name based on current language
  const getCompanyName = (company: any) => {
    if (currentLanguage === 'en' && company.name_en) {
      return company.name_en;
    }
    return company.name;
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">{t.common.loading}...</div>;
  }

  if (companies.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        <p>{t.company.noCompanies}</p>
      </div>
    );
  }

  const selectedCompany = companies.find(c => c.id === selectedCompanyId);
  
  return (
    <div className={prominentDisplay ? "space-y-1" : ""}>
      {prominentDisplay && selectedCompany && (
        <div className="font-semibold text-primary text-lg flex items-center gap-2">
          <Building className="h-5 w-5" />
          <span className="truncate max-w-[220px]">
            {getCompanyName(selectedCompany)}
          </span>
        </div>
      )}
      
      <Select
        value={selectedCompanyId || undefined}
        onValueChange={handleCompanyChange}
      >
        <SelectTrigger 
          className={prominentDisplay ? "text-xs" : "w-full"}
        >
          <SelectValue 
            placeholder={t.company.selectPlaceholder} 
          />
        </SelectTrigger>
        <SelectContent>
          {companies.map((company) => (
            <SelectItem key={company.id} value={company.id}>
              {getCompanyName(company)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompanyManager;
