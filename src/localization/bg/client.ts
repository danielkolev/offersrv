
import { 
  ClientTranslations, 
  ClientInfoTranslations, 
  CompanyInfoTranslations,
  SavedClientsTranslations
} from '@/types/language/client';

export const bgClientTranslations: ClientTranslations = {
  info: 'Информация за клиента',
  name: 'Име',
  vatNumber: 'ДДС номер',
  address: 'Адрес',
  email: 'Имейл',
  contactPerson: 'Лице за контакт',
  city: 'Град',
  country: 'Държава',
  phone: 'Телефон'
};

export const bgClientInfoTranslations: ClientInfoTranslations = {
  title: 'Информация за клиента',
  name: 'Име на клиента',
  vatNumber: 'ДДС номер',
  address: 'Адрес',
  contactPerson: 'Лице за контакт',
  city: 'Град',
  country: 'Държава',
  email: 'Имейл',
  phone: 'Телефон'
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
  uploadLogo: 'Качи лого'
};

export const bgSavedClientsTranslations: SavedClientsTranslations = {
  title: 'Запазени клиенти',
  searchPlaceholder: 'Търсене на клиенти',
  noClientsFound: 'Няма намерени запазени клиенти',
  addClient: 'Добави клиент',
  editClient: 'Редактирай клиент',
  deleteClient: 'Изтрий клиент',
  deleteConfirmation: 'Сигурни ли сте, че искате да изтриете този клиент?',
  searchByName: 'Търсене по име',
  searchByVat: 'Търсене по ДДС номер',
  importFromOffer: 'Импортирай от оферта',
  selectClient: 'Избери',
  cancel: 'Отказ',
  addNewClient: 'Добави нов клиент',
  createClient: 'Създай клиент',
  updateClient: 'Обнови клиент',
  clientAddedSuccess: 'Клиентът е добавен успешно',
  clientUpdatedSuccess: 'Клиентът е обновен успешно',
  clientDeletedSuccess: 'Клиентът е изтрит успешно',
  formTitle: 'Данни за клиента'
};
