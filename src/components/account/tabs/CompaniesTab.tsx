
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Company } from '@/types/company';
import CompanySettingsModal from '../CompanySettingsModal';

export const CompaniesTab = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [userCompanies, setUserCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserCompanies();
    }
  }, [user]);

  const fetchUserCompanies = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data: ownedOrgs, error: ownedError } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user.id);
      
      if (ownedError) throw ownedError;
      
      const { data: memberOrgs, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id, role, organizations:organization_id(*)')
        .eq('user_id', user.id);
      
      if (memberError) throw memberError;
      
      const ownedCompanies = ownedOrgs || [];
      const memberCompanies = memberOrgs ? memberOrgs.map(m => m.organizations) : [];
      
      const allCompanies = [...ownedCompanies, ...memberCompanies];
      const uniqueCompanies = Array.from(
        new Map(allCompanies.map(item => [item.id, item])).values()
      );
      
      setUserCompanies(uniqueCompanies);
    } catch (error) {
      console.error('Error fetching user companies:', error);
      toast({
        title: t.common.error,
        description: "Failed to load company data",
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={() => setCompanyModalOpen(true)} className="w-full">
        {t.company.manage}
      </Button>
      
      {userCompanies.length > 0 && (
        <div className="space-y-3 mt-4">
          <h3 className="font-medium">{t.company.title}</h3>
          {userCompanies.map((company) => (
            <Card key={company.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{company.name}</h4>
                    {company.vat_number && (
                      <p className="text-sm text-muted-foreground">
                        {t.companyInfo.vatNumber}: {company.vat_number}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <CompanySettingsModal 
        open={companyModalOpen} 
        onOpenChange={setCompanyModalOpen}
      />
    </div>
  );
};
