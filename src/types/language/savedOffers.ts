
export interface SavedOffersTranslations {
  title: string;
  noOffers: string;
  loadOffer: string;
  deleteOffer: string;
  confirmDelete: string;
  offerDeleted: string;
  offerLoaded: string;
  saveOffer: string;
  saving: string;
  saved: string;
  saveError: string;
  deleteError: string;
  loadError: string;
  saveBeforeAction: string;
  
  // Additional properties from the error
  recentOffers: string;
  offerSaved: string;
  offerSavedWithDetails: string;
  noOffersFound: string;
  noOffersFoundSearch: string;
  date: string;
  client: string;
  amount: string;
  actions: string;
  search: string;
  searchPlaceholder: string;
  clientName: string;
  offerNumber: string;
  createNew: string;
  viewOffer: string;
  filter: string;
  
  // Additional properties used in bg/savedOffers.ts
  loading?: string;
  offerName?: string;
  status?: string;
  view?: string;
  edit?: string;
  delete?: string;
  deleteConfirmation?: string;
  deleted?: string;
  saveFailed?: string;
  namePlaceholder?: string;
  nameRequired?: string;
  statusTypes?: {
    draft: string;
    saved: string;
    sent: string;
    accepted: string;
    rejected: string;
  };
  lastUpdated?: (date: Date) => string;
  createTemplate?: string;
}
