
export type SupportedLanguage = 'en' | 'bg';
export type SupportedCurrency = 'EUR' | 'BGN' | 'USD';

export interface Translations {
  common: {
    preview: string;
    edit: string;
    previewOffer: string;
    backToEdit: string;
    save: string;
    print: string;
    add: string;
    currency: string;
    loading: string;
    processing: string;
  };
  offerTitle: string;
  companyInfo: {
    title: string;
    name: string;
    vatNumber: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    logo: string;
    uploadLogo: string;
  };
  clientInfo: {
    title: string;
    name: string;
    contactPerson: string;
    address: string;
    city: string;
    country: string;
    vatNumber: string;
    email: string;
    phone: string;
  };
  offerDetails: {
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
  };
  products: {
    title: string;
    addProduct: string;
    productName: string;
    partNumber: string;
    description: string;
    quantity: string;
    unitPrice: string;
    total: string;
    noProducts: string;
  };
  totals: {
    subtotal: string;
    vat: string;
    transport: string;
    otherCosts: string;
    totalAmount: string;
  };
  offer: {
    toLabel: string;
    attention: string;
    vatIncluded: string;
    vatExcluded: string;
    thankYou: string;
    offerLabel: string;
    number: string;
    date: string;
    validUntil: string;
    item: string;
    partNo: string;
    qty: string;
    unitPrice: string;
    total: string;
    notes: string;
  };
  auth: {
    welcomeTitle: string;
    welcomeSubtitle: string;
    loginTitle: string;
    loginDescription: string;
    registerTitle: string;
    registerDescription: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    password: string;
    passwordPlaceholder: string;
    loginButton: string;
    registerButton: string;
    needAccount: string;
    haveAccount: string;
    loginSuccess: string;
    registerSuccess: string;
    checkEmail: string;
    error: string;
    signOut: string;
    processing: string;
  };
  company: {
    create: string;
    createButton: string;
    createNew: string;
    createFirst: string;
    selectPlaceholder: string;
    namePlaceholder: string;
    vatPlaceholder: string;
    addressPlaceholder: string;
    cityPlaceholder: string;
    countryPlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    websitePlaceholder: string;
    error: string;
    nameRequired: string;
    success: string;
    createdSuccessfully: string;
    selectFirst: string;
  };
}
