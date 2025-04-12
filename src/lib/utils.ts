
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SupportedLanguage, SupportedCurrency } from "@/types/language/base"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, language: SupportedLanguage = 'en', currency: SupportedCurrency = 'EUR'): string {
  const localeMap: Record<SupportedLanguage, string> = {
    'bg': 'bg-BG',
    'en': 'en-US'
  };
  
  return new Intl.NumberFormat(localeMap[language], {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount)
}

export function formatDate(dateString: string, language: SupportedLanguage = 'en'): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(language === 'bg' ? 'bg-BG' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function truncateString(str: string, maxLength: number = 30): string {
  if (!str) return '';
  
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

export function isEmpty(obj: any): boolean {
  return obj === null || obj === undefined || (typeof obj === 'object' && Object.keys(obj).length === 0);
}
