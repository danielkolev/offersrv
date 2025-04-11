
export interface OfferTranslations {
  details: string;
  number: string;
  date: string;
  validUntil: string;
  notes: string;
  terms: string;
  status: string;
  statuses: {
    draft: string;
    sent: string;
    accepted: string;
    rejected: string;
  };
  offerLabel: string;
  toLabel: string;
  attention: string;
  item: string;
  partNo: string;
  qty: string;
  unitPrice: string;
  total: string;
  vatIncluded: string;
  vatExcluded: string;
  thankYou: string;
  language: string;
  languageOptions: {
    bulgarian: string;
    english: string;
  };
}

export interface OfferDetailsTranslations {
  title: string;
  offerNumber: string;
  date: string;
  validUntil: string;
  showPartNumber: string;
  includeVat: string;
  vatRate: string;
  transportCost: string;
  otherCosts: string;
  notes: string;
  notesPlaceholder: string;
  language: string;
}

export interface ProductsTranslations {
  title: string;
  name: string;
  description: string;
  price: string;
  quantity: string;
  vat: string;
  vatIncluded: string;
  total: string;
  addProduct: string;
  removeProduct: string;
  noProducts: string;
  productName: string;
  partNumber: string;
  unitPrice: string;
}

export interface TotalsTranslations {
  subtotal: string;
  vat: string;
  transport: string;
  otherCosts: string;
  totalAmount: string;
}
