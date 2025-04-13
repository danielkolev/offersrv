
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Save, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SaveOfferDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (offerName: string) => void;
  isLoading: boolean;
  defaultName: string;
}

const SaveOfferDialog = ({ 
  open, 
  onClose, 
  onSave, 
  isLoading,
  defaultName 
}: SaveOfferDialogProps) => {
  const { t } = useLanguage();
  const [offerName, setOfferName] = useState(defaultName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(offerName);
  };

  // Добавяме обработка на затварянето на модалния прозорец
  const handleOpenChange = (newOpenState: boolean) => {
    if (!newOpenState) {
      onClose();
      // Малко забавяне преди да се възстанови фокуса
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 100);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.savedOffers.saveOffer}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="offerName" className="text-right">
                Offer Name
              </Label>
              <Input
                id="offerName"
                value={offerName}
                onChange={(e) => setOfferName(e.target.value)}
                className="col-span-3"
                autoFocus
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t.common.cancel}
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading || !offerName.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t.common.saving}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t.common.save}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SaveOfferDialog;
