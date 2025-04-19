
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
  }, [user]);

  const fetchUserCompany = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching company:', error);
        return;
      }

      setCompany(data);
      if (data && !selectedCompanyId) {
        onSelectCompany(data.id);
        localStorage.setItem('selectedCompanyId', data.id);
      }
    } catch (error) {
      console.error('Error in fetchUserCompany:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyName = (company: any) => {
    if (currentLanguage === 'en' && company.name_en) {
      return company.name_en;
    }
    return company.name;
  };

  if (loading) {
    return <div className="text-sm text-muted-foreground">{t.common.loading}...</div>;
  }

  if (!company) {
    return <div className="text-sm text-muted-foreground">
      <p>{t.company.noCompanies}</p>
    </div>;
  }

  return (
    <div className="flex items-center gap-2 px-2 py-3 w-full border-b border-sidebar-border">
      {company.logo ? (
        <img 
          src={company.logo} 
          alt={getCompanyName(company)} 
          className="w-6 h-6 rounded-sm object-contain"
        />
      ) : (
        <Building className="w-5 h-5 text-muted-foreground" />
      )}
      <span className="font-medium text-sm truncate">
        {getCompanyName(company)}
      </span>
    </div>
  );
};

export default CompanyManager;
