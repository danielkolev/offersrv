
import { SettingsTranslations } from '@/types/language/settings';

export const enSettingsTranslations: SettingsTranslations = {
  title: 'Settings',
  subtitle: 'Configure your offers and templates',
  
  // Template settings
  offerTemplates: 'Offer Templates',
  templatesDescription: 'Manage your offer templates and create new ones',
  newTemplate: 'New Template',
  createTemplate: 'Create Template',
  templateCreated: 'Template created successfully',
  templateName: 'Template Name',
  templateNamePlaceholder: 'e.g. My Standard Offer',
  templateDescription: 'Template Description',
  templateDescriptionPlaceholder: 'e.g. Standard offer with 30-day payment terms',
  defaultTemplatesDescription: 'Default templates are available in the offer creation process',
  editTemplate: 'Edit Template',
  viewTemplate: 'View Template',
  createNewTemplate: 'Create New Template',
  
  // Offer settings
  offerSettings: 'Offer Settings',
  usePrefix: 'Use Number Prefix',
  usePrefixDescription: 'Add a prefix to all your offer numbers',
  prefix: 'Prefix',
  prefixDescription: 'This prefix will be added to all your offer numbers',
  suffixYear: 'Add Year Suffix',
  suffixYearDescription: 'Add the current year as a suffix to your offer numbers',
  defaultVatRate: 'Default VAT Rate (%)',
  defaultVatRateDescription: 'The default VAT rate for new offers',
  
  // Bank details
  bankDetails: 'Banking Details',
  showBankDetails: 'Show Banking Details on Offers',
  showBankDetailsDescription: 'Display your banking information at the bottom of the offers',
  bankName: 'Bank Name',
  bankNamePlaceholder: 'e.g. Bank of Example',
  iban: 'IBAN',
  ibanPlaceholder: 'e.g. BG80BNBG96611020345678',
  swift: 'SWIFT/BIC',
  swiftPlaceholder: 'e.g. BFTBDEFF',
  additionalInfo: 'Additional Info',
  additionalInfoPlaceholder: 'e.g. Branch, Account Owner',
  
  // Custom units
  customUnits: 'Custom Units',
  customUnitsDescription: 'Add custom measurement units for your products',
  unitNameBg: 'Bulgarian Name',
  unitNameEn: 'English Name',
  unitNamePlaceholderBg: 'e.g. брой, метър',
  unitNamePlaceholderEn: 'e.g. piece, meter',
  addUnit: 'Add Unit',
  existingUnits: 'Existing Units',
  noCustomUnits: 'No custom units added yet',
  unitAdded: 'Unit Added',
  unitAddedSuccess: 'Custom unit has been added successfully',
  unitDeleted: 'Unit Deleted',
  unitDeletedSuccess: 'Custom unit has been deleted',
  unitNameRequired: 'Unit name is required in both languages',
  validationError: 'Validation Error',
  unitAddError: 'Failed to add custom unit',
  unitDeleteError: 'Failed to delete custom unit',
  
  // General settings messages
  settingsSaved: 'Settings saved successfully',
  errorLoadingSettings: 'Error loading settings',
  errorSavingSettings: 'Error saving settings'
};

// Export for use in the main language file
export const settings = enSettingsTranslations;
