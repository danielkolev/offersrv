
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import UserProfileModal from './account/UserProfileModal';

const AccountButton = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: t.common.success,
        description: t.auth.signOutSuccess,
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: t.common.error,
        description: t.auth.signOutError,
        variant: 'destructive',
      });
    }
  };
  
  const openProfileModal = () => {
    setProfileModalOpen(true);
  };
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            className="gap-2"
            aria-label={t.common.account}
          >
            <User size={16} />
            {user?.email ? user.email.split('@')[0] : t.common.account}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>{t.common.account}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={openProfileModal} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t.user.profile}</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t.auth.signOut}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <UserProfileModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen}
      />
    </>
  );
};

export default AccountButton;
