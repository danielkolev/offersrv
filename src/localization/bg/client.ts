import { 
  ClientTranslations, 
  ClientInfoTranslations, 
  CompanyInfoTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const bgClientTranslations: ClientTranslations = {
  title: 'Клиенти',
  addClient: 'Добави клиент',
  editClient: 'Редактирай клиент',
  deleteClient: 'Изтрий клиент',
  deleteConfirmation: 'Сигурни ли сте, че искате да изтриете този клиент?',
  noClientsFound: 'Няма намерени клиенти',
  noClientsFoundSearch: 'Няма намерени клиенти, отговарящи на търсенето',
  searchPlaceholder: 'Търси клиенти',
  name: 'Име',
  vatNumber: 'ЕИК/ДДС номер',
  contactPerson: 'Лице за контакт',
  email: 'Имейл',
  phone: 'Телефон',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  actions: 'Действия',
  cancel: 'Отказ',
  save: 'Запази',
  clientSaved: 'Клиентът е запазен успешно',
  clientDeleted: 'Клиентът е изтрит успешно',
  searchByName: 'Търсене по име',
  searchByVat: 'Търсене по ЕИК/ДДС номер',
  createNew: 'Създай нов клиент'
};

export const bgClientInfoTranslations: ClientInfoTranslations = {
  title: 'Информация за клиента',
  name: 'Име на клиента',
  namePlaceholder: 'Въведете име на клиента',
  contactPerson: 'Лице за контакт',
  contactPersonPlaceholder: 'Въведете име на лице за контакт',
  address: 'Адрес',
  addressPlaceholder: 'Въведете адрес на клиента',
  city: 'Град',
  cityPlaceholder: 'Въведете град',
  country: 'Държава',
  countryPlaceholder: 'Въведете държава',
  vatNumber: 'ЕИК/ДДС номер',
  vatNumberPlaceholder: 'Въведете ЕИК/ДДС номер',
  email: 'Имейл',
  emailPlaceholder: 'Въведете имейл адрес',
  phone: 'Телефон',
  phonePlaceholder: 'Въведете телефонен номер',
  selectExisting: 'Избери съществуващ клиент',
  selectClient: 'Избери клиент',
  searchClients: 'Търсене на клиенти...'
};

export const bgCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Информация за фирмата',
  name: 'Име на фирмата',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  vatNumber: 'ЕИК/ДДС номер',
  phone: 'Телефон',
  email: 'Имейл',
  website: 'Уебсайт',
  logo: 'Лого'
};

export const bgSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Запазени клиенти',
  loadClient: 'Зареди',
  saveClient: 'Запази клиент',
  deleteClient: 'Изтрий',
  clientSaved: 'Клиентът е запазен успешно',
  clientDeleted: 'Клиентът е изтрит успешно',
  noClientsFound: 'Няма намерени запазени клиенти',
  noClientsFoundSearch: 'Няма намерени клиенти, отговарящи на търсенето',
  confirmDelete: 'Сигурни ли сте, че искате да изтриете този клиент?',
  date: 'Дата',
  name: 'Име',
  contactPerson: 'Лице за контакт',
  actions: 'Действия',
  search: 'Търсене',
  searchPlaceholder: 'Търсене по име на клиент, ЕИК/ДДС номер или дата',
  clientName: 'Име на клиент',
  vatNumber: 'ЕИК/ДДС номер',
  createNew: 'Създай нов клиент'
};
