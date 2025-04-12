
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
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CompanySettingsModal from './CompanySettingsModal';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  
  // Reset settings when dialog closes
  useEffect(() => {
    if (!open) {
      // Reset state when modal closes
    }
  }, [open]);

  const openCompanySettings = () => {
    setCompanyModalOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.user.profile}</DialogTitle>
            <DialogDescription>
              {t.user.manageAccount}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="account" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">{t.user.profile}</TabsTrigger>
              <TabsTrigger value="companies">{t.company.manage}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="py-4">
              <div className="space-y-4">
                <div className="text-lg font-medium">{user?.email}</div>
                <Button onClick={openCompanySettings} variant="outline">
                  {t.company.manage}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="companies" className="py-4">
              <div className="space-y-4">
                <Button onClick={openCompanySettings} className="w-full">
                  {t.company.manage}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      
      <CompanySettingsModal 
        open={companyModalOpen} 
        onOpenChange={setCompanyModalOpen} 
      />
    </>
  );
};

export default UserProfileModal;
