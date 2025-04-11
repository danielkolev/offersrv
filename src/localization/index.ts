
import { Translations } from '@/types/language';
import { enTranslations } from './en';
import { bgTranslations } from './bg';

// Create a unified translations object
export const translations: Record<string, Translations> = {
  en: enTranslations,
  bg: bgTranslations
};
