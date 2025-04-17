
import { CompanyInfoTranslations } from '@/types/language/companyInfo';

export const bgCompanyInfoTranslations: CompanyInfoTranslations = {
  title: 'Информация за фирма',
  description: 'Въведете информация за вашата фирма',
  name: 'Име на фирма',
  vatNumber: 'ДДС номер',
  eikNumber: 'ЕИК номер',
  address: 'Адрес',
  city: 'Град',
  country: 'Държава',
  phone: 'Телефон',
  email: 'Имейл',
  website: 'Уебсайт',
  logo: 'Лого на фирма',
  uploadLogo: 'Качи лого',
  removeLogo: 'Премахни лого',
  slogan: 'Слоган на фирма',
  sloganPlaceholder: 'Въведете слоган или мото на вашата фирма',
  conclusionText: 'Заключителен текст',
  conclusionTextPlaceholder: 'Въведете заключителен текст, който ще се показва в края на всяка оферта'
};

// Export for use in the main language file
export const companyInfo = bgCompanyInfoTranslations;
