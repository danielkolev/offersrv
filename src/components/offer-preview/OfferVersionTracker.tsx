
import React from 'react';
import { useOffer } from '@/context/offer/OfferContext';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { History } from 'lucide-react';
import { format } from 'date-fns';
import { useLanguage } from '@/context/LanguageContext';

interface OfferVersionTrackerProps {
  showVersionHistory?: boolean;
}

const OfferVersionTracker: React.FC<OfferVersionTrackerProps> = ({ 
  showVersionHistory = false 
}) => {
  const { offer } = useOffer();
  const { t } = useLanguage();
  
  // Display current version or default to 1
  const currentVersion = offer.version || 1;
  
  // Format the last edited date
  const lastEditedDate = offer.lastEdited 
    ? format(new Date(offer.lastEdited), 'dd MMM yyyy HH:mm')
    : null;

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <History className="h-4 w-4 text-slate-500" />
              <Badge variant="outline" className="text-xs">
                {t.offer.version || "Version"}: {currentVersion}
              </Badge>
              {lastEditedDate && (
                <span className="text-xs text-slate-500">
                  {t.offer.lastEdited || "Last edited"}: {lastEditedDate}
                </span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{t.offer.versionTooltip || "Current offer version"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {showVersionHistory && offer.previousVersions && offer.previousVersions.length > 0 && (
        <div className="ml-4">
          <details className="text-xs">
            <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
              {t.offer.showVersionHistory || "Show version history"}
            </summary>
            <div className="mt-2 border-l-2 border-slate-200 pl-3">
              {offer.previousVersions.map((versionId, index) => (
                <div key={versionId} className="mb-1">
                  <span className="text-slate-600">v{index + 1}</span> - 
                  <button 
                    className="ml-2 text-blue-600 hover:underline"
                    onClick={() => {/* Logic to load this version */}}
                  >
                    {t.offer.viewVersion || "View"}
                  </button>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default OfferVersionTracker;
