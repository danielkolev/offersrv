
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-offer-gray">
          {t.settings.title}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t.common.back}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.subtitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsLayout;
