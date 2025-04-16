
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import CompanyInfoSettings from '@/components/account/CompanyInfoSettings';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface CompanySettingsFormProps {
  onClose: () => void;
  refreshCompanySelection: () => void;
}

const CompanySettingsForm = ({ onClose, refreshCompanySelection }: CompanySettingsFormProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCompanyUpdated = () => {
    refreshCompanySelection();
    toast({
      title: t.common.success,
      description: t.company.companyUpdated || 'Company updated successfully'
    });
  };

  return (
    <div className="py-4 space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={onClose}>
          {t.common.close}
        </Button>
      </div>
      <Separator />
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">
          {t.company.info || "Update your company information below"}
        </p>
        {selectedCompanyId && (
          <CompanyInfoSettings
            companyId={selectedCompanyId}
            onUpdate={handleCompanyUpdated}
          />
        )}
      </div>
    </div>
  );
};

export default CompanySettingsForm;
