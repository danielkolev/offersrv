
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CompanyInfoSettings from './CompanyInfoSettings';
import CompanySelector from '../company/CompanySelector';
import { Company } from '@/types/company';

interface CompanySettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompanySettingsModal = ({ open, onOpenChange }: CompanySettingsModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch companies when dialog opens
  useEffect(() => {
    if (open && user) {
      fetchCompanies();
    }
  }, [open, user]);

  const fetchCompanies = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user.id);
        
      if (error) throw error;
      // Ensure we're getting the right type
      const typedData = (data || []) as Company[];
      setCompanies(typedData);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const handleCompanyUpdated = () => {
    toast({
      title: t.common.success,
      description: 'Company settings updated successfully',
    });
  };

  // Handle dialog closing
  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    // Small delay before restoring focus
    if (!newOpenState) {
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.company.manage}</DialogTitle>
          <DialogDescription>
            {t.company.info}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CompanySelector 
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onSelectCompany={handleSelectCompany}
            onCreateCompany={() => {}} // We'll keep this empty for now
          />
        </div>

        {selectedCompanyId ? (
          <CompanyInfoSettings 
            companyId={selectedCompanyId} 
            onUpdate={handleCompanyUpdated}
          />
        ) : (
          <div className="text-center py-8">
            {t.company.selectFirst}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CompanySettingsModal;
