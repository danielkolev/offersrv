import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';

const ManagePanel = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {t.common.manageAccount}
        </div>
        <Link to="/settings" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-secondary hover:text-secondary-foreground px-4 py-2">
          <Settings className="w-4 h-4 mr-2" />
          {t.settings.title}
        </Link>
      </CardContent>
    </Card>
  );
};

export default ManagePanel;

