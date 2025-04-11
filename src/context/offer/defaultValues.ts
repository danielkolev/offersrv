
import { CompanyInfo, ClientInfo, OfferDetails, Offer } from '../../types/offer';
import { v4 as uuidv4 } from 'uuid';

export const defaultCompany: CompanyInfo = {
  name: 'Your Company Name',
  address: 'Company Address',
  city: 'City',
  country: 'Country',
  vatNumber: 'VAT123456789',
  phone: '+1 234 567 890',
  email: 'contact@company.com',
  website: 'www.company.com',
  logo: null,
};

export const defaultClient: ClientInfo = {
  name: 'Client Company',
  contactPerson: 'Contact Person',
  address: 'Client Address',
  city: 'Client City',
  country: 'Client Country',
  vatNumber: 'VAT987654321',
  email: 'client@example.com',
  phone: '+1 987 654 321',
};

export const defaultDetails: OfferDetails = {
  offerNumber: '00001',
  date: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  showPartNumber: true,
  includeVat: true,
  vatRate: 20,
  transportCost: 0,
  otherCosts: 0,
  notes: 'Delivery time: 7-14 working days after order confirmation.\nPayment terms: 100% advance payment.',
  offerLanguage: 'bg', // Default to Bulgarian
};

export const defaultOffer: Offer = {
  company: defaultCompany,
  client: defaultClient,
  products: [
    {
      id: uuidv4(),
      name: 'Product 1',
      description: 'Description of product 1',
      partNumber: 'PN001',
      quantity: 1,
      unitPrice: 100
    }
  ],
  details: defaultDetails,
};
