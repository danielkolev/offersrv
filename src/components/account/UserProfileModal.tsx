
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
import { supabase } from '@/integrations/supabase/client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Company } from '@/types/company';
import { useNavigate } from 'react-router-dom';

interface UserProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileModal = ({ open, onOpenChange }: UserProfileModalProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [userCompany, setUserCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (open && user) {
      fetchUserCompany();
    }
  }, [open, user]);

  const fetchUserCompany = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check for organization owned by the user
      const { data: ownedOrg, error: ownedError } = await supabase
        .from('organizations')
        .select('*')
        .eq('owner_id', user.id)
        .single();
      
      if (ownedError && ownedError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw ownedError;
      }
      
      if (ownedOrg) {
        setUserCompany(ownedOrg);
        return;
      }
      
      // If no owned organization, check for membership
      const { data: memberOrg, error: memberError } = await supabase
        .from('organization_members')
        .select('organizations:organization_id(*)')
        .eq('user_id', user.id)
        .single();
      
      if (memberError && memberError.code !== 'PGRST116') {
        throw memberError;
      }
      
      if (memberOrg) {
        setUserCompany(memberOrg.organizations);
      } else {
        setUserCompany(null);
      }
    } catch (error) {
      console.error('Error fetching user company:', error);
      toast({
        title: t.common.error,
        description: "Failed to load company data",
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleManageCompany = () => {
    onOpenChange(false);
    navigate('/company-management');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  // Handle closing the modal
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">{t.user.profile}</TabsTrigger>
              <TabsTrigger value="company">{t.company.title}</TabsTrigger>
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
              </div>
            </TabsContent>
            
            <TabsContent value="company" className="py-4">
              <div className="space-y-4">
                {isLoading ? (
                  <div className="text-center py-6">{t.common.loading}</div>
                ) : userCompany ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>{userCompany.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {userCompany.vat_number && (
                          <p className="text-sm">
                            <span className="font-medium">{t.company.vatNumber}:</span> {userCompany.vat_number}
                          </p>
                        )}
                        {userCompany.address && (
                          <p className="text-sm">
                            <span className="font-medium">{t.company.address}:</span> {userCompany.address}
                          </p>
                        )}
                        {userCompany.email && (
                          <p className="text-sm">
                            <span className="font-medium">{t.company.email}:</span> {userCompany.email}
                          </p>
                        )}
                        {userCompany.phone && (
                          <p className="text-sm">
                            <span className="font-medium">{t.company.phone}:</span> {userCompany.phone}
                          </p>
                        )}
                      </div>
                      
                      <Button onClick={handleManageCompany} className="w-full mt-4">
                        {t.company.manage}
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center py-6">
                    <p className="mb-4">{t.company.noCompanies}</p>
                    <Button onClick={handleManageCompany}>
                      {t.company.createCompany}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserProfileModal;
