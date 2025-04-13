
import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CompanyForm from './CompanyForm';
import CompanySelector from './CompanySelector';

interface CompanyManagerProps {
  onSelectCompany: (companyId: string) => void;
  selectedCompanyId: string | null;
}

export const CompanyManager = ({ onSelectCompany, selectedCompanyId }: CompanyManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Inform parent about selected company when it changes
  useEffect(() => {
    if (selectedCompanyId) {
      console.log("CompanyManager: Using selected company ID:", selectedCompanyId);
    }
  }, [selectedCompanyId]);
  
  const handleCreateCompany = useCallback(() => {
    setDialogOpen(true);
  }, []);
  
  const handleCompanyCreated = useCallback((companyId: string) => {
    setDialogOpen(false);
    onSelectCompany(companyId);
  }, [onSelectCompany]);
  
  return (
    <>
      <CompanySelector 
        onSelectCompany={onSelectCompany}
        onCreateCompany={handleCreateCompany}
        selectedCompanyId={selectedCompanyId}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <CompanyForm onSuccess={handleCompanyCreated} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default React.memo(CompanyManager);
