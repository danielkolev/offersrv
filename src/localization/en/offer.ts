import { 
  OfferTranslations, 
  OfferDetailsTranslations, 
  ProductsTranslations, 
  TotalsTranslations,
  SavedOffersTranslations,
  SavedProductsTranslations 
} from '@/types/language/offer';

export const enOfferTranslations: OfferTranslations = {
  details: 'Details',
  number: 'Number',
  date: 'Date',
  validUntil: 'Valid Until',
  notes: 'Notes',
  terms: 'Terms',
  status: 'Status',
  statuses: {
    draft: 'Draft',
    sent: 'Sent',
    accepted: 'Accepted',
    rejected: 'Rejected'
  },
  offerLabel: 'OFFER',
  toLabel: 'To',
  attention: 'Attention',
  item: 'Item',
  partNo: 'Part No.',
  qty: 'Qty',
  unitPrice: 'Unit Price',
  total: 'Total',
  vatIncluded: 'VAT included',
  vatExcluded: 'VAT excluded',
  thankYou: 'Thank you for your business!',
  language: 'Language',
  offerPreview: 'Offer Preview',
  languageOptions: {
    bulgarian: 'Bulgarian',
    english: 'English'
  },
  // Templates translations
  templates: {
    title: 'Templates',
    description: 'Start with a template or save your current offer as a template',
    useTemplate: 'Use template',
    createFromCurrent: 'Save current as template',
    templateName: 'Template Name',
    saveAsTemplate: 'Save as Template',
    templateSaved: 'Template saved successfully',
    noTemplates: 'No templates found',
    confirmDelete: 'Are you sure you want to delete this template?',
    deleteTemplate: 'Delete Template',
    templateDeleted: 'Template deleted successfully',
    defaultTemplates: 'Default Templates',
    userTemplates: 'Your Templates'
  }
};

export const enOfferDetailsTranslations: OfferDetailsTranslations = {
  title: 'Offer Details',
  offerNumber: 'Offer Number',
  offerNumberInfo: 'Final number will be assigned when saving',
  date: 'Date',
  validUntil: 'Valid Until',
  validUntilPlaceholder: 'Enter expiration date',
  showPartNumber: 'Show Part Number',
  includeVat: 'Include VAT',
  vatRate: 'VAT Rate (%)',
  transportCost: 'Transport Cost',
  transportCostPlaceholder: 'Enter transport cost',
  otherCosts: 'Other Costs',
  otherCostsPlaceholder: 'Enter other costs',
  notes: 'Notes',
  notesPlaceholder: 'Enter any additional notes or terms for this offer',
  language: 'Offer Language'
};

export const enProductsTranslations: ProductsTranslations = {
  title: 'Products',
  name: 'Product Name',
  description: 'Description',
  price: 'Price',
  quantity: 'Quantity',
  vat: 'VAT',
  vatIncluded: 'VAT Included',
  total: 'Total',
  addProduct: 'Add Product',
  removeProduct: 'Remove',
  noProducts: 'No products added yet',
  productName: 'Product Name',
  partNumber: 'Part Number',
  unitPrice: 'Unit Price',
  selectExisting: 'Select Existing Product',
  selectProduct: 'Select a Product',
  unit: 'Unit',
  unitPlaceholder: 'Enter unit (e.g., pcs, hours)'
};

export const enTotalsTranslations: TotalsTranslations = {
  subtotal: 'Subtotal',
  vat: 'VAT',
  transport: 'Transport',
  otherCosts: 'Other Costs',
  totalAmount: 'Total Amount'
};

export const enSavedOffersTranslations: SavedOffersTranslations = {
  title: 'Saved Offers',
  loadOffer: 'Load',
  saveOffer: 'Save Offer',
  deleteOffer: 'Delete',
  offerSaved: 'Offer saved successfully',
  offerDeleted: 'Offer deleted successfully',
  noOffersFound: 'No saved offers found',
  noOffersFoundSearch: 'No offers found matching your search',
  confirmDelete: 'Are you sure you want to delete this offer?',
  date: 'Date',
  client: 'Client',
  amount: 'Amount',
  actions: 'Actions',
  search: 'Search',
  searchPlaceholder: 'Search by client name, offer number or date',
  clientName: 'Client Name',
  offerNumber: 'Offer Number',
  createNew: 'Create New Offer',
  offerLoaded: 'Offer loaded successfully',
  viewOffer: 'View Offer'
};

export const enSavedProductsTranslations: SavedProductsTranslations = {
  title: 'Saved Products',
  addProduct: 'Add Product',
  editProduct: 'Edit Product',
  deleteProduct: 'Delete Product',
  deleteConfirmation: 'Are you sure you want to delete this product?',
  noProductsFound: 'No saved products found',
  noProductsFoundSearch: 'No products found matching your search',
  searchPlaceholder: 'Search products',
  searchByName: 'Search by name',
  searchByPartNumber: 'Search by part number',
  selectProduct: 'Select',
  cancel: 'Cancel',
  saveFromOffer: 'Save from offer'
};
