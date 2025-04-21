
import React from 'react';
import { OfferProvider } from '@/context/offer/OfferContext';
import SavedOffersContent from '@/components/management/offers/SavedOffersContent';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronRight } from 'lucide-react';

const SavedOffersPage: React.FC = () => {
  const { t } = useLanguage();
  return (
    <>
      <div className="container pt-6 pb-0">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">{t.navigation.home}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{t.navigation.savedOffers}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <OfferProvider>
        <SavedOffersContent />
      </OfferProvider>
    </>
  );
};

export default SavedOffersPage;
