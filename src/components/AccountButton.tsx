import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, Building } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
      navigate('/', { replace: true }); // Redirect to landing page after sign out
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
  
  if (!user) return null;
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2 max-w-[200px]">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ''} />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || user.email}</p>
              <p className="text-xs leading-none text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={openProfileModal} className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t.user.profile}</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/company-management" className="flex cursor-pointer items-center">
              <Building className="mr-2 h-4 w-4" />
              <span>{t.navigation.companies}</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex cursor-pointer items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>{t.navigation.settings}</span>
            </Link>
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
