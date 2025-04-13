
export interface OfferTranslations {
    createOffer: string;
    saveOffer: string;
    confirmSave: string;
    saveDescription: string;
    offerName: string;
    saveAsTemplate: string;
    saveAsDraft: string;
    saveAsFinalized: string;
    savedSuccessfully: string;
    saveFailed: string;
    clearConfirm: string;
    currency: string;
    fromTemplate: string;
    header: string;
    fromCompany: string;
    toCompany: string;
    date: string;
    validUntil: string;
    reference: string;
    notes: string;
    item: string;
    qty: string;
    unit: string;
    unitPrice: string;
    total: string;
    saved: string;
    subtotal: string;
    vat: string;
    totalAmount: string;
    includeVat: string;
    previewTitle?: string;
    previewDescription?: string;
    partNo: string;
    
    // Status related translations
    status: string;
    draftStatus: string;
    draftStatusInfo: string;
    statuses: {
        draft: string;
        saved: string;
        sent: string;
        accepted: string;
        rejected: string;
    };
    
    // Time related translations
    createdAt: string;
    lastEdited: string;
    
    // Draft related translations
    draftLoaded: string;
    draftRestoredDescription: string;
    draftSaved: string;
    draftSavedDescription: string;
    draftSaveError: string;
    notSavedYet: string;
    lastSaved: string;
    saving: string;
    unsavedChanges: string;
    saveManually: string;
    autoSaveEnabled: string;
    autoSaveDisabled: string;
    draftInProgress: string;
    returnToDraft: string;
    
    // Client info related translations
    toLabel: string;
    attention: string;
    
    // Language options
    languageOptions: {
        bulgarian: string;
        english: string;
    };
    
    // Templates related translations
    templates: {
        title: string;
        description: string;
        empty: string;
        create: string;
        delete: string;
        confirmDelete: string;
        templateDeleted: string;
        apply: string;
        createNew: string;
        name: string;
        namePlaceholder: string;
        descriptionPlaceholder: string;
        save: string;
        cancel: string;
        saved: string;
        error: string;
    };
    
    // Preview related translations
    offerPreview: string;
}
