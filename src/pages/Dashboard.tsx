
import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import HomeContent from '@/pages/HomeContent';

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [hasCompany, setHasCompany] = useState<boolean | null>(null);

  useEffect(() => {
    const checkCompanyProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('id')
          .eq('owner_id', user.id)
          .limit(1);
          
        if (error) throw error;
        setHasCompany(data && data.length > 0);
        
        // Show toast for new users without a company
        if (!data || data.length === 0) {
          toast({
            title: t.company.welcome,
            description: t.company.createFirst,
          });
        }
      } catch (err) {
        console.error('Error checking company profile:', err);
      }
    };
    
    checkCompanyProfile();
  }, [user, toast, t.company.welcome, t.company.createFirst]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.common.welcome}
        </h1>
      </div>
      
      {hasCompany === false && (
        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Building className="h-5 w-5 text-blue-600" />
          <AlertDescription className="flex items-center justify-between">
            <span className="text-blue-700">
              {t.company.noCompanies}
            </span>
            <Button 
              variant="outline" 
              className="ml-4 border-blue-200 text-blue-700 hover:bg-blue-100"
              onClick={() => window.location.href = '/company-management'}
            >
              {t.company.createButton}
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <HomeContent />
    </div>
  );
};

export default Dashboard;
