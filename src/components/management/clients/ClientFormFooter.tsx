
import React from 'react';
import { Translations } from '@/types/language';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';

interface ClientFormFooterProps {
  isSubmitting: boolean;
  isEditMode: boolean;
  onCancel: () => void;
  t: Translations;
}

const ClientFormFooter = ({ 
  isSubmitting, 
  isEditMode, 
  onCancel, 
  t 
}: ClientFormFooterProps) => {
  return (
    <DialogFooter>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        {t.savedClients.cancel}
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? 
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> : 
          null
        }
        {isEditMode ? t.savedClients.updateClient : t.savedClients.createClient}
      </Button>
    </DialogFooter>
  );
};

export default ClientFormFooter;
