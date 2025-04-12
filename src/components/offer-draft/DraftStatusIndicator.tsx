
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { bg, enUS } from 'date-fns/locale';
import { useLanguage } from '@/context/LanguageContext';
import { Loader2, Save, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface DraftStatusIndicatorProps {
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  autoSaveEnabled: boolean;
  onSaveDraft: () => void;
  onToggleAutoSave: () => void;
}

const DraftStatusIndicator: React.FC<DraftStatusIndicatorProps> = ({
  isDirty,
  isAutoSaving,
  lastSaved,
  autoSaveEnabled,
  onSaveDraft,
  onToggleAutoSave,
}) => {
  const { t, language } = useLanguage();
  
  const formatLastSaved = () => {
    if (!lastSaved) return t.offer.notSavedYet;
    
    const locale = language === 'bg' ? bg : enUS;
    return t.offer.lastSaved.replace(
      '{time}', 
      formatDistanceToNow(lastSaved, { addSuffix: true, locale })
    );
  };

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <div className="flex items-center mr-2">
        {isAutoSaving ? (
          <span className="flex items-center">
            <Loader2 className="h-3 w-3 animate-spin mr-1" />
            {t.offer.saving}
          </span>
        ) : isDirty ? (
          <span>{t.offer.unsavedChanges}</span>
        ) : (
          <span>{formatLastSaved()}</span>
        )}
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onSaveDraft}
              disabled={isAutoSaving || !isDirty}
            >
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.offer.saveManually}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleAutoSave}
            >
              {autoSaveEnabled ? (
                <ToggleRight className="h-4 w-4" />
              ) : (
                <ToggleLeft className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {autoSaveEnabled
                ? t.offer.disableAutoSave
                : t.offer.enableAutoSave}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DraftStatusIndicator;
