import { CompanyTranslations } from '@/types/language/company';

export const bgCompanyTranslations: CompanyTranslations = {
  createCompany: 'Създай компания',
  editCompany: 'Редактирай компания',
  updateCompany: 'Актуализирай компания',
  companyName: 'Име на компанията',
  companyAddress: 'Адрес',
  companyCity: 'Град',
  companyCountry: 'Държава',
  companyVatNumber: 'ДДС Номер',
  companyPhone: 'Телефон',
  companyEmail: 'Имейл',
  companyWebsite: 'Уебсайт',
  companyLogo: 'Лого',
  uploadLogo: 'Качи лого',
  removeLogo: 'Премахни лого',
  selectCompany: 'Избери компания',
  noCompanies: 'Не са намерени компании',
  createFirst: 'Създайте първата си компания',
  companyCreated: 'Компанията е създадена успешно',
  companyUpdated: 'Компанията е актуализирана успешно',
  selectFirst: 'Моля, изберете компания, за да продължите',
  companySettings: 'Настройки на компанията',
  deleteCompany: 'Изтрий компания',
  confirmDelete: 'Сигурни ли сте, че искате да изтриете тази компания? Това действие не може да бъде отменено.',
  companyDeleted: 'Компанията е изтрита успешно',
  manageCompanies: 'Управление на компании',
  
  // Adding new properties
  create: 'Създай компания',
  createButton: 'Създайте Фирмен Профил',
  updateButton: 'Актуализирай компания',
  manage: 'Управление на компании',
  info: 'Управлявайте информацията за вашата компания',
  error: 'Грешка',
  success: 'Успех',
  nameRequired: 'Името на компанията е задължително',
  createdSuccessfully: 'Компанията е създадена успешно',
  useSelector: 'Използвайте селектора на компанията по-горе, за да продължите',
  
  // Placeholder texts
  namePlaceholder: 'Въведете име на компанията',
  vatPlaceholder: 'Въведете ДДС номер',
  eikPlaceholder: 'Въведете ЕИК номер', // Added EIK placeholder
  addressPlaceholder: 'Въведете адрес на компанията',
  cityPlaceholder: 'Въведете град',
  countryPlaceholder: 'Въведете държава',
  phonePlaceholder: 'Въведете телефонен номер',
  emailPlaceholder: 'Въведете имейл адрес',
  websitePlaceholder: 'Въведете URL на уебсайта',
  selectPlaceholder: 'Изберете компания',
  createNew: 'Създай нова компания',
  
  // Adding title translation
  title: 'Компания',
  
  welcome: "Добре дошли в Offersrv",
  noCompanyFound: "Не е открита компания. Моля, създайте първо компания.",
};

// Export for use in the main language file
export const company = bgCompanyTranslations;
