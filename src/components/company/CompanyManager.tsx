
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/context/LanguageContext';
import { Building } from 'lucide-react';
import { SupportedLanguage } from '@/types/language/base';

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
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserCompany();
    }
  }, [user, selectedCompanyId]);

  const fetchUserCompany = async () => {
    setLoading(true);
    try {
      // Instead of using .single(), we'll get all companies and use the first one
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user?.id);

      if (error) {
        console.error('Error fetching companies:', error);
        return;
      }

      if (data && data.length > 0) {
        // Use the first company
        setCompany(data[0]);
        
        if (!selectedCompanyId) {
          onSelectCompany(data[0].id);
          localStorage.setItem('selectedCompanyId', data[0].id);
        }
      }
    } catch (error) {
      console.error('Error in fetchUserCompany:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyName = (company: any) => {
    if (currentLanguage === 'en' && company?.name_en) {
      return company.name_en;
    }
    return company?.name;
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground px-4 py-3">{t.common.loading}...</div>;
  }

  if (!company) {
    return <div className="text-sm text-muted-foreground px-4 py-3">
      <p>{t.company.noCompanies}</p>
    </div>;
  }

  return (
    <div className={`flex items-center gap-2 px-4 py-3 ${prominentDisplay ? 'bg-muted rounded-md' : ''} w-full`}>
      {company.logo_url ? (
        <img 
          src={company.logo_url} 
          alt={getCompanyName(company)} 
          className="w-6 h-6 rounded-sm object-contain"
        />
      ) : (
        <Building className="w-5 h-5 text-muted-foreground" />
      )}
      <span className={`font-medium text-sm truncate ${prominentDisplay ? 'text-foreground' : ''}`}>
        {getCompanyName(company)}
      </span>
    </div>
  );
};

export default CompanyManager;
