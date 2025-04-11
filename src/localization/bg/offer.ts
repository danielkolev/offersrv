
import { 
  OfferTranslations, 
  OfferDetailsTranslations, 
  ProductsTranslations, 
  TotalsTranslations,
  SavedOffersTranslations,
  SavedProductsTranslations 
} from '@/types/language/offer';

export const bgOfferTranslations: OfferTranslations = {
  details: 'Детайли',
  number: 'Номер',
  date: 'Дата',
  validUntil: 'Валиден до',
  notes: 'Бележки',
  terms: 'Условия',
  status: 'Статус',
  statuses: {
    draft: 'Чернова',
    sent: 'Изпратена',
    accepted: 'Приета',
    rejected: 'Отхвърлена'
  },
  offerLabel: 'ОФЕРТА',
  toLabel: 'До',
  attention: 'Внимание',
  item: 'Артикул',
  partNo: 'Парт. No.',
  qty: 'Кол',
  unitPrice: 'Ед. Цена',
  total: 'Общо',
  vatIncluded: 'С ДДС',
  vatExcluded: 'Без ДДС',
  thankYou: 'Благодарим Ви за доверието!',
  language: 'Език',
  languageOptions: {
    bulgarian: 'Български',
    english: 'Английски'
  },
  // Add templates translations
  templates: {
    title: 'Шаблони',
    description: 'Започнете с шаблон или запазете текущата оферта като шаблон',
    useTemplate: 'Използвай шаблон',
    createFromCurrent: 'Запази текущата като шаблон',
    templateName: 'Име на шаблона',
    saveAsTemplate: 'Запази като шаблон',
    templateSaved: 'Шаблонът е запазен успешно',
    noTemplates: 'Няма намерени шаблони',
    confirmDelete: 'Сигурни ли сте, че искате да изтриете този шаблон?',
    deleteTemplate: 'Изтрий шаблон',
    templateDeleted: 'Шаблонът е изтрит успешно',
    defaultTemplates: 'Стандартни шаблони',
    userTemplates: 'Вашите шаблони'
  }
};

export const bgOfferDetailsTranslations: OfferDetailsTranslations = {
  title: 'Детайли на офертата',
  offerNumber: 'Номер на офертата',
  date: 'Дата',
  validUntil: 'Валиден до',
  showPartNumber: 'Покажи парт. номер',
  includeVat: 'Включи ДДС',
  vatRate: 'ДДС ставка (%)',
  transportCost: 'Цена за транспорт',
  otherCosts: 'Други разходи',
  notes: 'Бележки',
  notesPlaceholder: 'Въведете допълнителни бележки или условия за тази оферта',
  language: 'Език на офертата'
};

export const bgProductsTranslations: ProductsTranslations = {
  title: 'Продукти',
  name: 'Име на продукта',
  description: 'Описание',
  price: 'Цена',
  quantity: 'Количество',
  vat: 'ДДС',
  vatIncluded: 'ДДС включено',
  total: 'Общо',
  addProduct: 'Добави продукт',
  removeProduct: 'Премахни',
  noProducts: 'Няма добавени продукти',
  productName: 'Име на продукта',
  partNumber: 'Номер на част',
  unitPrice: 'Единична цена',
  selectExisting: 'Избери съществуващ продукт',
  selectProduct: 'Избери продукт'
};

export const bgTotalsTranslations: TotalsTranslations = {
  subtotal: 'Междинна сума',
  vat: 'ДДС',
  transport: 'Транспорт',
  otherCosts: 'Други разходи',
  totalAmount: 'Обща сума'
};

export const bgSavedOffersTranslations: SavedOffersTranslations = {
  title: 'Запазени оферти',
  loadOffer: 'Зареди',
  saveOffer: 'Запази оферта',
  deleteOffer: 'Изтрий',
  offerSaved: 'Офертата е запазена успешно',
  offerDeleted: 'Офертата е изтрита успешно',
  noOffersFound: 'Няма намерени запазени оферти',
  noOffersFoundSearch: 'Няма намерени оферти, отговарящи на търсенето',
  confirmDelete: 'Сигурни ли сте, че искате да изтриете тази оферта?',
  date: 'Дата',
  client: 'Клиент',
  amount: 'Сума',
  actions: 'Действия',
  search: 'Търсене',
  searchPlaceholder: 'Търсене по име на клиент, номер на оферта или дата',
  clientName: 'Име на клиент',
  offerNumber: 'Номер на оферта',
  createNew: 'Създай нова оферта',
  offerLoaded: 'Офертата е заредена успешно',
  viewOffer: 'Преглед на оферта'
};

export const bgSavedProductsTranslations: SavedProductsTranslations = {
  title: 'Запазени продукти',
  addProduct: 'Добави продукт',
  editProduct: 'Редактирай продукт',
  deleteProduct: 'Изтрий продукт',
  deleteConfirmation: 'Сигурни ли сте, че искате да изтриете този продукт?',
  noProductsFound: 'Няма намерени запазени продукти',
  noProductsFoundSearch: 'Няма намерени продукти, отговарящи на търсенето',
  searchPlaceholder: 'Търси продукти',
  searchByName: 'Търси по име',
  searchByPartNumber: 'Търси по номер',
  selectProduct: 'Избери',
  cancel: 'Отказ',
  saveFromOffer: 'Запази от оферта'
};
