
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import PasswordChangeForm from '../PasswordChangeForm';

export const SecurityTab = () => {
  const { t } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.user.changePassword}</CardTitle>
      </CardHeader>
      <CardContent>
        <PasswordChangeForm />
      </CardContent>
    </Card>
  );
};
