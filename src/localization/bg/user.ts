import { UserTranslations } from '@/types/language/user';

export const bgUserTranslations: UserTranslations = {
  profile: 'Профил',
  settings: 'Настройки',
  signOut: 'Изход',
  manageAccount: 'Управление на акаунта',
  editProfile: 'Редактиране на профила',
  firstName: 'Име',
  lastName: 'Фамилия',
  email: 'Имейл',
  password: 'Парола',
  currentPassword: 'Текуща парола',
  newPassword: 'Нова парола',
  confirmPassword: 'Потвърдете паролата',
  changePassword: 'Смяна на паролата',
  save: 'Запази',
  cancel: 'Отказ',
  updateSuccess: 'Профилът е актуализиран успешно',
  updateError: 'Грешка при актуализиране на профила',
  passwordMismatch: 'Паролите не съвпадат',
  passwordChangeSuccess: 'Паролата е променена успешно',
  passwordChangeError: 'Грешка при промяна на паролата',
  accountCreated: 'Акаунтът е създаден'
};

// Export for use in the main language file
export const user = bgUserTranslations;
