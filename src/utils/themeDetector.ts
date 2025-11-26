export type Theme = 'light' | 'dark' | 'auto';

export function detectSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  // Sistem tercihini kontrol et
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

export function detectTimeBasedTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  const hour = new Date().getHours();
  // 18:00 - 06:00 arası dark mode
  if (hour >= 18 || hour < 6) {
    return 'dark';
  }
  
  return 'light';
}

export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'auto') {
    // Önce sistem tercihini kontrol et
    const systemTheme = detectSystemTheme();
    if (systemTheme === 'dark') {
      return 'dark';
    }
    // Sistem light ise, saate göre kontrol et
    return detectTimeBasedTheme();
  }
  return theme;
}

export function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

export function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'auto';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  return stored || 'auto';
}

export function setStoredTheme(theme: Theme) {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('theme', theme);
}

