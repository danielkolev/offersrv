
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Translations } from '@/types/language';
import BackButton from '@/components/navigation/BackButton';

interface ClientPageHeaderProps {
  t: Translations;
  onAddClient: () => void;
  onImportFromOffer: () => void;
}

const ClientPageHeader = ({ t, onAddClient, onImportFromOffer }: ClientPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <BackButton label={t.common.back} to="/" />
        <h1 className="text-2xl font-bold">{t.savedClients.title}</h1>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onAddClient} 
          className="gap-2"
        >
          <UserPlus className="h-4 w-4" />
          {t.savedClients.addNewClient}
        </Button>
      </div>
    </div>
  );
};

export default ClientPageHeader;
