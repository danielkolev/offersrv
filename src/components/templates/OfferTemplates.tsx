
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useOffer } from '@/context/offer/OfferContext';
import { useLanguage } from '@/context/LanguageContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Offer } from '@/types/offer';
import { useToast } from '@/hooks/use-toast';

// Basic templates to get started
const TEMPLATES: { id: string; name: string; description: string; template: Partial<Offer> }[] = [
  {
    id: 'basic',
    name: 'Basic Offer',
    description: 'A simple offer with standard terms',
    template: {
      details: {
        offerNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        includeVat: true,
        vatRate: 20,
        showPartNumber: true,
        transportCost: 0,
        otherCosts: 0,
        notes: 'Payment terms: 100% advance payment.\nDelivery time: 7-14 working days after order confirmation.',
        offerLanguage: 'en'
      }
    }
  },
  {
    id: 'service',
    name: 'Service Contract',
    description: 'Template for service-based offers',
    template: {
      details: {
        offerNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        includeVat: true,
        vatRate: 20,
        showPartNumber: false,
        transportCost: 0,
        otherCosts: 0,
        notes: 'Service terms: This offer is valid for the specified services only.\nPayment terms: 50% advance, 50% upon completion.\nValidity: This offer is valid for 30 days from the date issued.',
        offerLanguage: 'en'
      },
      products: [
        {
          id: crypto.randomUUID(),
          name: 'Consultation Services',
          description: 'Initial consultation and requirements gathering',
          quantity: 1,
          unitPrice: 150,
          unit: 'hour'
        },
        {
          id: crypto.randomUUID(),
          name: 'Implementation',
          description: 'Implementation of the discussed solution',
          quantity: 1,
          unitPrice: 500,
          unit: 'day'
        }
      ]
    }
  },
  {
    id: 'product',
    name: 'Product Bundle',
    description: 'Template for product bundles with discount',
    template: {
      details: {
        offerNumber: '',
        date: new Date().toISOString().split('T')[0],
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        includeVat: true,
        vatRate: 20,
        showPartNumber: true,
        transportCost: 0,
        otherCosts: 0,
        notes: 'Bundle discount applied.\nDelivery time: 5-7 working days after order confirmation.\nPayment terms: 100% advance payment.',
        offerLanguage: 'en'
      },
      products: [
        {
          id: crypto.randomUUID(),
          name: 'Product Bundle',
          description: 'Discounted product bundle',
          partNumber: 'BUNDLE-001',
          quantity: 1,
          unitPrice: 258,
          isBundle: true,
          bundledProducts: [
            {
              id: crypto.randomUUID(),
              name: 'Product A',
              description: 'Main product',
              partNumber: 'PA-001',
              quantity: 1,
              unitPrice: 199
            },
            {
              id: crypto.randomUUID(),
              name: 'Product B',
              description: 'Complementary product',
              partNumber: 'PB-002',
              quantity: 1,
              unitPrice: 59
            }
          ]
        }
      ]
    }
  }
];

const OfferTemplates = () => {
  const { applyTemplate } = useOffer();
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSelectTemplate = (template: Partial<Offer>) => {
    applyTemplate(template);
    toast({
      title: t.common.success,
      description: 'Template applied successfully',
    });
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Start with a template</h3>
        <p className="text-muted-foreground mb-4">Select a template to quickly create your offer</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEMPLATES.map((template) => (
            <Card key={template.id} className="hover:border-offer-blue transition-colors cursor-pointer">
              <CardContent 
                className="p-4 flex flex-col h-full" 
                onClick={() => handleSelectTemplate(template.template)}
              >
                <h4 className="font-medium mb-2">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">{template.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectTemplate(template.template);
                  }}
                >
                  Use template
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferTemplates;
