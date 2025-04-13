
export const savedOffers = {
  title: "Saved Offers",
  noOffers: "No saved offers yet.",
  loadOffer: "Load Offer",
  deleteOffer: "Delete Offer",
  confirmDelete: "Are you sure you want to delete this offer?",
  offerDeleted: "Offer deleted successfully.",
  offerLoaded: "Offer loaded successfully.",
  saveOffer: "Save Offer",
  saving: "Saving...",
  saved: "Offer saved!",
  saveError: "Failed to save offer.",
  deleteError: "Failed to delete offer.",
  loadError: "Failed to load offer.",
  saveBeforeAction: "Please save the offer before this action",
  
  // Add missing properties
  recentOffers: "Recent Offers",
  offerSaved: "Offer saved",
  offerSavedWithDetails: "Offer saved with details",
  noOffersFound: "No offers found",
  noOffersFoundSearch: "No offers matching your search criteria",
  date: "Date",
  client: "Client",
  amount: "Amount",
  actions: "Actions",
  search: "Search",
  searchPlaceholder: "Search offers...",
  clientName: "Client Name",
  offerNumber: "Offer Number",
  createNew: "Create New",
  viewOffer: "View Offer",
  filter: "Filter",
  
  // Optional properties for compatibility with bg version
  loading: "Loading offers...",
  offerName: "Offer Name",
  status: "Status",
  view: "View",
  edit: "Edit",
  delete: "Delete",
  deleteConfirmation: "Are you sure you want to delete this offer?",
  deleted: "The offer has been deleted",
  saveFailed: "Failed to save",
  namePlaceholder: "Enter offer name",
  nameRequired: "Offer name is required",
  statusTypes: {
    draft: "Draft",
    saved: "Saved",
    sent: "Sent",
    accepted: "Accepted",
    rejected: "Rejected",
  },
  lastUpdated: (date: Date) => {
    return `Last updated ${date.toLocaleDateString()}`;
  },
  createTemplate: "Create Template"
};
