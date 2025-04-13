
import { OfferTranslations } from '@/types/language/offer';

export const offer: OfferTranslations = {
  createOffer: "Създаване на оферта",
  saveOffer: "Запазване на оферта",
  confirmSave: "Потвърждаване",
  saveDescription: "Моля, въведете име за офертата и изберете как искате да я запазите.",
  offerName: "Име на офертата",
  saveAsTemplate: "Запази като шаблон",
  saveAsDraft: "Запази като чернова",
  saveAsFinalized: "Запази като финализирана",
  savedSuccessfully: "Офертата е запазена успешно",
  saveFailed: "Грешка при запазване на офертата",
  clearConfirm: "Сигурни ли сте, че искате да изчистите тази оферта? Всички данни ще бъдат загубени.",
  currency: "Валута",
  fromTemplate: "От шаблон",
  header: "Оферта",
  fromCompany: "От",
  toCompany: "До",
  date: "Дата",
  validUntil: "Валидна до",
  reference: "Референция",
  notes: "Забележки",
  item: "Артикул",
  qty: "К-во",
  unit: "Мярка",
  unitPrice: "Ед. цена",
  total: "Общо",
  saved: "Записана",
  subtotal: "Междинна сума",
  vat: "ДДС",
  totalAmount: "Обща сума",
  includeVat: "Включи ДДС",
  previewTitle: "Преглед на офертата",
  previewDescription: "Прегледайте офертата преди запазване",
  partNo: "Продуктов код",
  
  // Status related translations
  status: "Статус",
  draftStatus: "Статус",
  draftStatusInfo: "Номер ще бъде присвоен при запазване",
  statuses: {
    draft: "Чернова",
    saved: "Запазена",
    sent: "Изпратена",
    accepted: "Приета",
    rejected: "Отхвърлена"
  },
  
  // Time related translations
  createdAt: "Създадена",
  lastEdited: "Последна редакция",
  
  // Draft related translations
  draftLoaded: "Черновата е заредена",
  draftRestoredDescription: "Вашата чернова е възстановена",
  draftSaved: "Черновата е запазена",
  draftSavedDescription: "Вашата чернова е запазена успешно",
  draftSaveError: "Грешка при запазване на черновата",
  notSavedYet: "Още не е запазена",
  lastSaved: "Последно запазване: {time}",
  saving: "Запазване...",
  unsavedChanges: "Незапазени промени",
  saveManually: "Запази ръчно",
  autoSaveEnabled: "Автоматичното запазване е включено",
  autoSaveDisabled: "Автоматичното запазване е изключено",
  enableAutoSave: "Включи автоматично запазване",
  disableAutoSave: "Изключи автоматично запазване",
  draftInProgress: "Има незавършена чернова",
  returnToDraft: "Връщане към черновата",
  
  // Client info related translations
  toLabel: "До",
  attention: "Лице за контакт:",
  
  // Language options
  languageOptions: {
    bulgarian: "Български",
    english: "Английски"
  },
  
  // Templates related translations
  templates: {
    title: "Шаблони за оферти",
    description: "Създаване и управление на шаблони за оферти",
    empty: "Няма налични шаблони",
    create: "Създай шаблон",
    delete: "Изтрий",
    confirmDelete: "Сигурни ли сте, че искате да изтриете този шаблон?",
    templateDeleted: "Шаблонът е изтрит успешно",
    apply: "Приложи шаблон",
    createNew: "Създай нов шаблон",
    name: "Име на шаблона",
    namePlaceholder: "Въведете име на шаблона",
    descriptionPlaceholder: "Въведете описание на шаблона",
    save: "Запази шаблон",
    cancel: "Отказ",
    saved: "Шаблонът е запазен",
    error: "Грешка при запазване на шаблона",
    defaultTemplates: "Стандартни шаблони",
    userTemplates: "Вашите шаблони",
    templateName: "Име на шаблона",
    noTemplates: "Няма налични шаблони",
    templateSaved: "Шаблонът е запазен успешно",
    useTemplate: "Използвай шаблон",
    createFromCurrent: "Създай от текущата оферта",
    saveAsTemplate: "Запази като шаблон",
    noDescription: "Няма описание",
    availableTemplates: "Налични шаблони",
    noTemplatesFound: "Няма намерени шаблони",
    templatePreview: "Преглед на шаблона",
    setAsDefault: "Задай като основен",
    resetToDefault: "Върни към основен",
    defaultTemplate: "Основен шаблон",
    sampleTemplates: "Примерни шаблони",
    textColor: "Цвят на текста",
    backgroundColor: "Цвят на фона",
    designTemplateType: "Тип дизайн на шаблона",
    designTemplates: {
      classic: "Класически",
      modernDark: "Модерен тъмен",
      gradient: "Градиент",
      businessPro: "Бизнес Про"
    }
  },
  
  // Preview related translations
  offerPreview: "Преглед на офертата"
};
