
export type Language = 'en' | 'bg';

export interface Translations {
  offerTitle: string;
  common: {
    edit: string;
    preview: string;
    previewOffer: string;
    backToEdit: string;
    save: string;
    print: string;
    add: string;
    currency: string;
    loading: string;
    processing: string;
    error: string;
    success: string;
    account: string;
    settings: string;
    comingSoon: string;
    featureInDevelopment: string;
  };
  auth: {
    signIn: string;
    signUp: string;
    signOut: string;
    signOutSuccess: string;
    signOutError: string;
    email: string;
    password: string;
    forgotPassword: string;
    noAccount: string;
    hasAccount: string;
    resetPassword: string;
  };
  user: {
    profile: string;
    editProfile: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    updateProfile: string;
  };
  company: {
    info: string;
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
    manage: string;
    selectFirst: string;
    create: string;
    createButton: string;
    edit: string;
    update: string;
    updateButton: string;
    delete: string;
    deleteConfirm: string;
  };
  client: {
    info: string;
    name: string;
    vatNumber: string;
    address: string;
    email: string;
  };
  offer: {
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
  };
  products: {
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
  };
}
