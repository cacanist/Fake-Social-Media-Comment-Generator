import { Language } from '@/types/Language';

export function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'en'; // Server-side rendering için varsayılan
  }

  const browserLang = navigator.language || (navigator as any).userLanguage;
  
  // Türkçe kontrolü (tr, tr-TR, tr-TR-TR gibi)
  if (browserLang.toLowerCase().startsWith('tr')) {
    return 'tr';
  }
  
  // Diğer tüm diller için İngilizce
  return 'en';
}

