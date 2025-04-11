
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SupportedLanguage, SupportedCurrency } from "@/types/language"

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
