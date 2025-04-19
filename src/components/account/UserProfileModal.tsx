
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileTab } from './tabs/ProfileTab';
import { SecurityTab } from './tabs/SecurityTab';
import { CompaniesTab } from './tabs/CompaniesTab';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  const { t } = useLanguage();

  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto';
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.user.profile}</DialogTitle>
          <DialogDescription>
            {t.user.manageAccount}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">{t.user.profile}</TabsTrigger>
            <TabsTrigger value="security">{t.user.settings}</TabsTrigger>
            <TabsTrigger value="companies">{t.company.manage}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="py-4">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="security" className="py-4">
            <SecurityTab />
          </TabsContent>
          
          <TabsContent value="companies" className="py-4">
            <CompaniesTab />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;
