
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import UserProfileForm from '../UserProfileForm';

export const ProfileTab = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getUserInitials = () => {
    if (!user?.email) return "?";
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
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
  );
};
