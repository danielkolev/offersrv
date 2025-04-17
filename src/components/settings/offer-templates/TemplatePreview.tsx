
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Skeleton } from '@/components/ui/skeleton';
import type { Offer } from '@/types/offer';

export interface TemplatePreviewProps {
  settings: any;
  fullScreen?: boolean;
}

const SAMPLE_OFFER: Offer = {
  company: {
    name: 'Acme Corporation',
    logo: '',
    address: '123 Business Street',
    city: 'Sofia',
    country: 'Bulgaria',
    vatNumber: 'BG123456789',
    eikNumber: '123456789',
    slogan: 'Building the future',
    conclusionText: 'Thank you for your business!',
    phone: '+359 2 123 4567', // Added required field
    email: 'info@acmecorp.com', // Added required field
    website: 'www.acmecorp.com' // Added required field
  },
  client: {
    name: 'Client Company Ltd.',
    contactPerson: 'John Doe',
    address: '456 Client Avenue',
    city: 'Sofia',
    country: 'Bulgaria',
    vatNumber: 'BG987654321',
    email: 'john@clientcompany.com', // Added required field
    phone: '+359 2 987 6543', // Added required field
  },
  details: {
    offerNumber: 'OF-2023-001',
    date: new Date().toISOString(),
    validUntil: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString(),
    currency: 'BGN',
    includeVat: true,
    vatRate: 20,
    showPartNumber: true,
    transportCost: 10,
    otherCosts: 5,
    notes: 'This is a sample offer for preview purposes.',
    offerLanguage: 'bg' as 'bg' | 'en' // Added required field
  },
  products: [
    {
      id: '1',
      name: 'Sample Product 1',
      description: 'This is a sample product description',
      partNumber: 'SP001',
      quantity: 2,
      unitPrice: 100,
      unit: 'pcs'
    },
    {
      id: '2',
      name: 'Sample Product 2',
      description: 'Another sample product with details',
      partNumber: 'SP002',
      quantity: 1,
      unitPrice: 200,
      unit: 'pcs'
    }
  ]
};

const TemplatePreview: React.FC<TemplatePreviewProps> = ({ settings, fullScreen = false }) => {
  const { t, language } = useLanguage();
  const displayLanguage = language as 'en' | 'bg';
  
  if (!settings || Object.keys(settings).length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-[600px]' : 'h-64'} border rounded-md`}>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-4 w-3/5" />
        <p className="text-center mt-6 text-muted-foreground">{t.settings.noTemplates}</p>
      </div>
    );
  }
  
  // Mock ref and functions for preview
  const previewRef = React.useRef<HTMLDivElement>(null);
  const setIsSaveDialogOpen = () => {};
  
  // Determine which template to render based on settings
  const templateType = settings.templateType || 'classic';
  
  const renderTemplate = () => {
    // Dynamically import the templates
    switch(templateType.toLowerCase()) {
      case 'moderndark':
        const ModernDarkTemplate = React.lazy(() => import('@/components/offer-preview/templates/ModernDarkTemplate'));
        return (
          <React.Suspense fallback={<div>Loading template...</div>}>
            <ModernDarkTemplate 
              offer={SAMPLE_OFFER}
              displayLanguage={displayLanguage}
              settings={settings}
              mode="view"
              offerContentRef={previewRef}
              setIsSaveDialogOpen={setIsSaveDialogOpen}
            />
          </React.Suspense>
        );
      case 'classic':
      default:
        const ClassicTemplate = React.lazy(() => import('@/components/offer-preview/templates/ClassicTemplate'));
        return (
          <React.Suspense fallback={<div>Loading template...</div>}>
            <ClassicTemplate 
              offer={SAMPLE_OFFER}
              displayLanguage={displayLanguage}
              settings={settings}
              mode="view"
              offerContentRef={previewRef}
              setIsSaveDialogOpen={setIsSaveDialogOpen}
            />
          </React.Suspense>
        );
    }
  };

  return (
    <div 
      className={`preview-container ${fullScreen ? 'w-full min-h-[600px]' : 'h-64'} border rounded-md overflow-hidden bg-white`}
      ref={previewRef}
    >
      <div className="transform scale-[0.5] origin-top-left h-[200%] w-[200%]">
        {renderTemplate()}
      </div>
    </div>
  );
};

export default TemplatePreview;
