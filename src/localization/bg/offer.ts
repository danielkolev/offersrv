
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
  validUntil: 'Валидна до',
  notes: 'Забележки',
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
  attention: 'На вниманието на',
  item: 'Артикул',
  partNo: 'Артикулен №',
  qty: 'Кол.',
  unitPrice: 'Ед. цена',
  total: 'Общо',
  vatIncluded: 'ДДС включено',
  vatExcluded: 'ДДС не е включено',
  thankYou: 'Благодарим Ви за доверието!',
  language: 'Език',
  languageOptions: {
    bulgarian: 'Български',
    english: 'Английски'
  }
};

export const bgOfferDetailsTranslations: OfferDetailsTranslations = {
  title: 'Детайли на офертата',
  offerNumber: 'Номер на оферта',
  date: 'Дата',
  validUntil: 'Валидна до',
  showPartNumber: 'Покажи артикулен номер',
  includeVat: 'Включи ДДС',
  vatRate: 'ДДС ставка (%)',
  transportCost: 'Транспортни разходи',
  otherCosts: 'Други разходи',
  notes: 'Забележки',
  notesPlaceholder: 'Въведете допълнителни бележки или условия за тази оферта',
  language: 'Език на офертата'
};

export const bgProductsTranslations: ProductsTranslations = {
  title: 'Продукти',
  name: 'Име на продукт',
  description: 'Описание',
  price: 'Цена',
  quantity: 'Количество',
  vat: 'ДДС',
  vatIncluded: 'ДДС включено',
  total: 'Общо',
  addProduct: 'Добави продукт',
  removeProduct: 'Премахни',
  noProducts: 'Все още няма добавени продукти',
  productName: 'Име на продукт',
  partNumber: 'Артикулен номер',
  unitPrice: 'Единична цена'
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
  noOffersFoundSearch: 'Няма намерени оферти по вашето търсене',
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
  searchPlaceholder: 'Търсене на продукти',
  searchByName: 'Търсене по име',
  searchByPartNumber: 'Търсене по артикулен номер',
  selectProduct: 'Избери',
  cancel: 'Отказ',
  saveFromOffer: 'Запази от офертата'
};
