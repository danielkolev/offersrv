
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SupportedLanguage } from "@/types/language"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, language: SupportedLanguage = 'en'): string {
  const currencyCode = language === 'bg' ? 'BGN' : 'EUR';
  
  return new Intl.NumberFormat(language === 'bg' ? 'bg-BG' : 'en-US', {
    style: 'currency',
    currency: currencyCode,
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
