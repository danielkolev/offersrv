
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

interface CompanySettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CompanySettingsModal = ({ open, onOpenChange }: CompanySettingsModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset selected company when dialog closes
  useEffect(() => {
    if (!open) {
      // Don't reset the selected company when closing to maintain state
    }
  }, [open]);

  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  const handleCompanyUpdated = () => {
    toast({
      title: t.common.success,
      description: 'Company settings updated successfully',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.company.manage}</DialogTitle>
          <DialogDescription>
            {t.company.info}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <CompanySelector 
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
