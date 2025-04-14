
import { Translations } from '@/types/language/base';
import { en, enTranslations } from './en';
import { bg, bgTranslations } from './bg';

// Create a unified translations object
export const translations: Record<string, Translations> = {
  en: enTranslations,
  bg: bgTranslations
};
