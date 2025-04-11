
import { 
  ClientInfoTranslations,
  CompanyInfoTranslations,
  ClientTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const bgClientInfoTranslations: ClientInfoTranslations = {
  title: 'Информация за клиента',
  name: 'Име на клиента',
  contactPerson: 'Лице за контакт',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  vatNumber: 'ДДС номер',
  email: 'Имейл',
  phone: 'Телефон',
  selectExisting: 'Избери съществуващ клиент',
  selectClient: 'Избери клиент',
  searchClients: 'Търси клиенти по име или ДДС номер'
};

export const bgCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Информация за компанията',
  name: 'Име на компанията',
  vatNumber: 'ДДС номер',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  phone: 'Телефон',
  email: 'Имейл',
  website: 'Уебсайт',
  logo: 'Лого',
  uploadLogo: 'Качи лого',
  removeLogo: 'Премахни лого'
};

export const bgClientTranslations: ClientTranslations = {
  add: 'Добави клиент',
  edit: 'Редактирай клиент',
  delete: 'Изтрий клиент',
  save: 'Запази клиент',
  cancel: 'Отказ',
  confirmDelete: 'Сигурни ли сте, че искате да изтриете този клиент?',
  clientAdded: 'Клиентът е добавен успешно',
  clientUpdated: 'Клиентът е обновен успешно',
  clientDeleted: 'Клиентът е изтрит успешно',
  // Add these fields that are being accessed in components:
  name: 'Име',
  vatNumber: 'ДДС номер',
  contactPerson: 'Лице за контакт',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  email: 'Имейл',
  phone: 'Телефон'
};

export const bgSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Запазени клиенти',
  loadClient: 'Зареди клиент',
  saveClient: 'Запази клиент',
  deleteClient: 'Изтрий клиент',
  clientSaved: 'Клиентът е запазен успешно',
  clientDeleted: 'Клиентът е изтрит успешно',
  noClientsFound: 'Няма намерени клиенти',
  noClientsFoundSearch: 'Няма намерени клиенти, отговарящи на търсенето',
  confirmDelete: 'Сигурни ли сте, че искате да изтриете този клиент?',
  date: 'Дата',
  name: 'Име',
  vatNumber: 'ДДС номер',
  actions: 'Действия',
  search: 'Търсене',
  searchPlaceholder: 'Търси по име или ДДС номер',
  createNew: 'Създай нов клиент',
  clientLoaded: 'Клиентът е зареден успешно',
  addNewClient: 'Добави нов клиент',
  editClient: 'Редактирай клиент',
  importFromOffer: 'Импортирай от оферта',
  searchByName: 'Търси по име',
  searchByVatNumber: 'Търси по ДДС номер',
  // Add the missing properties:
  noClients: 'Няма налични клиенти',
  searchByVat: 'Търси по ДДС номер',
  selectClient: 'Избери',
  deleteConfirmation: 'Сигурни ли сте, че искате да изтриете този клиент?',
  cancel: 'Отказ',
  updateClient: 'Обнови клиент',
  createClient: 'Създай клиент',
  clientUpdatedSuccess: 'Клиентът е обновен успешно',
  clientAddedSuccess: 'Клиентът е добавен успешно',
  clientDeletedSuccess: 'Клиентът е изтрит успешно'
};
