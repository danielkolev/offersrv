
import { Translations } from '@/types/language/base';
import { en, enTranslations } from './en';
import { bg, bgTranslations } from './bg';

// Create a unified translations object with proper type casting
export const translations: Record<string, Translations> = {
  en: enTranslations as Translations,
  bg: bgTranslations as Translations
};
