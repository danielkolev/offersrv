
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Translations } from '@/types/language';

interface ClientPageHeaderProps {
  t: Translations;
  onAddClient: () => void;
  onImportFromOffer: () => void;
}

const ClientPageHeader = ({ t, onAddClient, onImportFromOffer }: ClientPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Link to="/">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{t.savedClients.title}</h1>
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={onImportFromOffer} 
          variant="outline"
        >
          {t.savedClients.importFromOffer}
        </Button>
        
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
