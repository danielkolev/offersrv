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
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserProfileForm from './UserProfileForm';
import PasswordChangeForm from './PasswordChangeForm';
import { useToast } from '@/hooks/use-toast';
import { Company } from '@/types/company';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [userCompanies, setUserCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (open && user) {
      fetchUserCompanies();
    }
  }, [open, user]);

  const fetchUserCompanies = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // First check for organizations owned by the user
      const { data: ownedOrgs, error: ownedError } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user.id);
      
      if (ownedError) throw ownedError;
      
      // Then check for organizations where the user is a member
      const { data: memberOrgs, error: memberError } = await supabase
        .from('organization_members')
        .select('organization_id, role, organizations:organization_id(*)')
        .eq('user_id', user.id);
      
      if (memberError) throw memberError;
      
      // Combine owned organizations and member organizations
      const ownedCompanies = ownedOrgs || [];
      const memberCompanies = memberOrgs ? memberOrgs.map(m => m.organizations) : [];
      
      // Remove duplicates by id
      const allCompanies = [...ownedCompanies, ...memberCompanies];
      const uniqueCompanies = Array.from(
        new Map(allCompanies.map(item => [item.id, item])).values()
      );
      
      setUserCompanies(uniqueCompanies);
    } catch (error) {
      console.error('Error fetching user companies:', error);
      toast({
        title: t.common.error,
        description: "Failed to load company data",
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openCompanySettings = () => {
    setCompanyModalOpen(true);
  };

  const getUserInitials = () => {
    if (!user?.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  const handleOpenChange = (newOpenState: boolean) => {
    onOpenChange(newOpenState);
    setTimeout(() => {
      document.body.style.pointerEvents = 'auto';
    }, 100);
  };

  return (
    <>
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
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg">{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{user?.email}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t.user.accountCreated}: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                    </p>
                  </div>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{t.user.editProfile}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <UserProfileForm />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="security" className="py-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.user.changePassword}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PasswordChangeForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="companies" className="py-4">
              <div className="space-y-4">
                <Button onClick={openCompanySettings} className="w-full">
                  {t.company.manage}
                </Button>
                
                {userCompanies.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <h3 className="font-medium">{t.company.title}</h3>
                    {userCompanies.map((company) => (
                      <Card key={company.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{company.name}</h4>
                              {company.vat_number && (
                                <p className="text-sm text-muted-foreground">
                                  {t.companyInfo.vatNumber}: {company.vat_number}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
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
