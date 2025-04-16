
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  disableCreate?: boolean;
}

const CompanyManager = ({ 
  onSelectCompany, 
  selectedCompanyId,
  disableCreate = false
}: CompanyManagerProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [openSettings, setOpenSettings] = useState(false);
  const [company, setCompany] = useState<{ id: string; name: string; logo_url?: string | null }>({ id: '', name: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { 
    selectedCompanyId: currentCompanyId,
    setCompanyId,
    refreshCompanySelection
  } = useCompanySelection();

  useEffect(() => {
    const fetchUserCompany = async () => {
      if (!user) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase
          .from('organizations')
          .select('id, name, logo_url')
          .eq('owner_id', user.id)
          .limit(1)
          .single();
          
        if (error) {
          // If no company found, this will error with "No rows returned"
          if (error.code === 'PGRST116') {
            setCompany({ id: '', name: '' });
            setError('No company found. Please create a company first.');
          } else {
            setError(error.message);
            toast({
              title: t.company.error,
              description: error.message,
              variant: "destructive",
            });
          }
        } else if (data) {
          setCompany({
            id: data.id,
            name: data.name,
            logo_url: data.logo_url
          });
          
          // Select this company automatically
          setCompanyId(data.id);
          onSelectCompany(data.id);
          
          // Store in localStorage for persistence
          localStorage.setItem('selectedCompanyId', data.id);
        }
      } catch (err: any) {
        setError(err.message);
        toast({
          title: t.company.error,
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserCompany();
  }, [user, toast, t.company.error, onSelectCompany, setCompanyId]);
  
  const handleOpenSettings = () => setOpenSettings(true);
  const handleCloseSettings = () => {
    setOpenSettings(false);
    // Refresh company data after settings changes
    fetchUserCompany();
  };

  const fetchUserCompany = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('id, name, logo_url')
        .eq('owner_id', user.id)
        .limit(1)
        .single();
        
      if (error) {
        setError(error.message);
      } else if (data) {
        setCompany({
          id: data.id,
          name: data.name,
          logo_url: data.logo_url
        });
        
        // Select this company
        setCompanyId(data.id);
        onSelectCompany(data.id);
        
        // Store in localStorage
        localStorage.setItem('selectedCompanyId', data.id);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center gap-2">
        {company.logo_url && (
          <img 
            src={company.logo_url} 
            alt={company.name} 
            className="h-8 w-8 object-contain rounded-sm"
          />
        )}
        <div className="font-medium">
          {isLoading ? (
            <span className="text-sm text-muted-foreground">{t.common?.loading || "Loading..."}</span>
          ) : error ? (
            <span className="text-sm text-destructive">{error}</span>
          ) : company.name ? (
            <span>{company.name}</span>
          ) : (
            <span className="text-sm text-muted-foreground">{t.company.noCompanies}</span>
          )}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={handleOpenSettings}
        disabled={isLoading}
      >
        <Settings className="h-4 w-4" />
      </Button>
      
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
