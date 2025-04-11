
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import SavedOffersManager from './SavedOffersManager';
import SavedClientsManager from './SavedClientsManager';
import SavedProductsManager from './SavedProductsManager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ManagePanel = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{t.common.manage}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <SavedOffersManager />
          <SavedClientsManager />
          <SavedProductsManager />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManagePanel;
