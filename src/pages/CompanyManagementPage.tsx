
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanyInfoSettings from '@/components/account/CompanyInfoSettings';
import CompanyManager from '@/components/company/CompanyManager';
import CompanyBankSettings from '@/components/settings/CompanyBankSettings';
import BackButton from '@/components/navigation/BackButton';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CompanyManagementPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load or create a company when the user visits this page
  useEffect(() => {
    const loadOrCreateCompany = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // First try to get the user's existing company
        const { data, error } = await supabase
          .from('organizations')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          // User has a company, use it
          setSelectedCompanyId(data[0].id);
          localStorage.setItem('selectedCompanyId', data[0].id);
        } else {
          // User has no company, create one
          const { data: newCompany, error: createError } = await supabase
            .from('organizations')
            .insert({
              name: user.email?.split('@')[0] || 'My Company',
              owner_id: user.id
            })
            .select('id');
            
          if (createError) throw createError;
          
          if (newCompany && newCompany.length > 0) {
            setSelectedCompanyId(newCompany[0].id);
            localStorage.setItem('selectedCompanyId', newCompany[0].id);
            
            toast({
              title: t.common.success,
              description: t.company.createdSuccessfully || 'Company created successfully',
            });
          }
        }
      } catch (err: any) {
        console.error('Error loading/creating company:', err);
        setError(err.message);
        toast({
          title: t.common.error,
          description: err.message,
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrCreateCompany();
  }, [user, toast, t.common.error, t.common.success, t.company.createdSuccessfully]);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    localStorage.setItem('selectedCompanyId', companyId);
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">{t.common.unauthorized}</h2>
          <p className="mt-2 text-gray-600">{t.auth.notAuthenticated}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackButton label={t.common.back} to="/" />
          <h1 className="text-3xl font-bold text-offer-gray">
            {t.company.manage}
          </h1>
        </div>
      </div>
      
      <div className="mb-6">
        <CompanyManager 
          onSelectCompany={handleSelectCompany} 
          selectedCompanyId={selectedCompanyId}
          prominentDisplay={true}
        />
      </div>
      
      {selectedCompanyId ? (
        <Card>
          <CardHeader>
            <CardTitle>{t.company.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="info" className="mt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="info">{t.company.info}</TabsTrigger>
                <TabsTrigger value="bank">{t.settings.bankDetails}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="info" className="py-4">
                <CompanyInfoSettings 
                  companyId={selectedCompanyId} 
                  onUpdate={() => {}}
                />
              </TabsContent>
              
              <TabsContent value="bank" className="py-4">
                <CompanyBankSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            {isLoading ? (
              <p>{t.common.loading}...</p>
            ) : error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <p>{t.company.selectFirst}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyManagementPage;
