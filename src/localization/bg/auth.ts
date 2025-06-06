
import { AuthTranslations } from '@/types/language/auth';

export const bgAuthTranslations: AuthTranslations = {
  signIn: 'Вход',
  signUp: 'Регистрация',
  signOut: 'Изход',
  signOutSuccess: 'Успешно излизане',
  signOutError: 'Грешка при излизане',
  email: 'Имейл',
  password: 'Парола',
  forgotPassword: 'Забравена парола',
  noAccount: 'Нямате акаунт?',
  hasAccount: 'Вече имате акаунт?',
  resetPassword: 'Възстановяване на парола',
  name: 'Име',
  loginSuccess: 'Успешно влизане',
  registerSuccess: 'Успешна регистрация',
  checkEmail: 'Моля, проверете вашия имейл',
  error: 'Грешка',
  processing: 'Обработка...',
  loginButton: 'Вход',
  registerButton: 'Регистрация',
  loginTitle: 'Вход в акаунта',
  registerTitle: 'Създаване на нов акаунт',
  loginDescription: 'Въведете имейла си по-долу, за да влезете в акаунта си',
  registerDescription: 'Въведете информацията си по-долу, за да създадете акаунт',
  namePlaceholder: 'Въведете вашето име',
  emailPlaceholder: 'Въведете вашия имейл',
  passwordPlaceholder: 'Въведете вашата парола',
  needAccount: 'Нужен ви е акаунт?',
  haveAccount: 'Вече имате акаунт?',
  welcomeTitle: 'Добре дошли отново',
  welcomeSubtitle: 'Въведете данните си, за да продължите',
  notAuthenticated: 'Трябва да сте влезли в системата',
  // New landing page translations
  appTitle: 'OfferForge',
  appDescription: 'Създавайте професионални оферти бързо и лесно',
  feature1: 'Професионални шаблони и персонализиране',
  feature2: 'Управлявайте клиенти и продукти ефективно',
  feature3: 'Генерирайте и проследявайте оферти безпроблемно',
  getStarted: 'Започнете безплатно',
  seeDemo: 'Вижте демо'
};

// Export for use in the main language file
export const auth = bgAuthTranslations;
