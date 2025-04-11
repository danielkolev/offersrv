
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CompanyForm from './CompanyForm';
import CompanySelector from './CompanySelector';

interface CompanyManagerProps {
  onSelectCompany: (companyId: string) => void;
}

export const CompanyManager = ({ onSelectCompany }: CompanyManagerProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleCreateCompany = () => {
    setDialogOpen(true);
  };
  
  const handleCompanyCreated = (companyId: string) => {
    setDialogOpen(false);
    onSelectCompany(companyId);
  };
  
  return (
    <>
      <CompanySelector 
        onSelectCompany={onSelectCompany}
        onCreateCompany={handleCreateCompany}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <CompanyForm onSuccess={handleCompanyCreated} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompanyManager;
