
import { SettingsTranslations } from '@/types/language/settings';

export const bgSettingsTranslations: SettingsTranslations = {
  title: 'Настройки',
  subtitle: 'Конфигурирай твоите оферти и шаблони',
  
  // Template settings
  offerTemplates: 'Шаблони за оферти',
  templatesDescription: 'Управлявай шаблоните за оферти и създавай нови',
  newTemplate: 'Нов шаблон',
  createTemplate: 'Създай шаблон',
  templateCreated: 'Шаблонът е създаден успешно',
  templateName: 'Име на шаблон',
  templateNamePlaceholder: 'напр. Моя стандартен шаблон',
  templateDescription: 'Описание на шаблон',
  templateDescriptionPlaceholder: 'напр. Стандартна оферта с 30-дневен срок за плащане',
  defaultTemplatesDescription: 'Стандартните шаблони са достъпни в процеса на създаване на оферта',
  editTemplate: 'Редактирай шаблон',
  viewTemplate: 'Прегледай шаблон',
  createNewTemplate: 'Създай нов шаблон',
  
  // Offer settings
  offerSettings: 'Настройки на оферти',
  usePrefix: 'Използвай префикс за номер',
  usePrefixDescription: 'Добави префикс към всички номера на оферти',
  prefix: 'Префикс',
  prefixDescription: 'Този префикс ще бъде добавен към всички номера на оферти',
  suffixYear: 'Добави година като суфикс',
  suffixYearDescription: 'Добави текущата година като суфикс към номерата на офертите',
  defaultVatRate: 'Стандартна ставка на ДДС (%)',
  defaultVatRateDescription: 'Стандартната ставка на ДДС за нови оферти',
  
  // Bank details
  bankDetails: 'Банкови данни',
  showBankDetails: 'Показвай банковите данни в офертите',
  showBankDetailsDescription: 'Показвай банковата ти информация в долната част на офертите',
  bankName: 'Име на банка',
  bankNamePlaceholder: 'напр. Банка Пример',
  iban: 'IBAN',
  ibanPlaceholder: 'напр. BG80BNBG96611020345678',
  swift: 'SWIFT/BIC',
  swiftPlaceholder: 'напр. BFTBDEFF',
  additionalInfo: 'Допълнителна информация',
  additionalInfoPlaceholder: 'напр. Клон, Титуляр на сметката',
  
  // General settings messages
  settingsSaved: 'Настройките са запазени успешно',
  errorLoadingSettings: 'Грешка при зареждане на настройките',
  errorSavingSettings: 'Грешка при запазване на настройките'
};

// Export for use in the main language file
export const settings = bgSettingsTranslations;
