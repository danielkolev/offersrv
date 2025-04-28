
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { FileEdit } from 'lucide-react';
import { Translations } from '@/types/language';

interface OfferStatusBadgeProps {
  status: 'draft' | 'saved' | 'sent' | 'accepted' | 'rejected';
  t: Translations;
  isDraft?: boolean;
}

const OfferStatusBadge: React.FC<OfferStatusBadgeProps> = ({ status, t, isDraft = false }) => {
  if (isDraft || status === 'draft') {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
        <FileEdit className="h-3 w-3 mr-1" />
        {t.offer.statuses.draft}
      </Badge>
    );
  }
  
  switch (status) {
    case 'saved':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t.offer.statuses.saved}</Badge>;
    case 'sent':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{t.offer.statuses.sent}</Badge>;
    case 'accepted':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{t.offer.statuses.accepted}</Badge>;
    case 'rejected':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">{t.offer.statuses.rejected}</Badge>;
    default:
      return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{t.offer.statuses.saved}</Badge>;
  }
};

export default OfferStatusBadge;
