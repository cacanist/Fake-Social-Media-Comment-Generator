'use client'

import { Language, translations } from '@/types/Language';
import { Theme, getEffectiveTheme } from '@/utils/themeDetector';

interface HeaderProps {
  language?: Language;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
}

export function Header({ language = 'en', theme = 'auto', onThemeChange }: HeaderProps) {
  const t = translations[language];
  const effectiveTheme = getEffectiveTheme(theme);

  const handleThemeToggle = () => {
    if (!onThemeChange) return;
    
    if (theme === 'light') {
      onThemeChange('dark');
    } else if (theme === 'dark') {
      onThemeChange('auto');
    } else {
      onThemeChange('light');
    }
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-top">
          <h1 className="header-title">{t.headerTitle}</h1>
          {onThemeChange && (
            <button 
              className="theme-toggle"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
              title={theme === 'auto' ? 'Auto (follows system)' : theme === 'dark' ? 'Dark mode' : 'Light mode'}
            >
              {effectiveTheme === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </button>
          )}
        </div>
        <p className="header-subtitle">{t.headerSubtitle}</p>
        <p className="header-description">{t.headerDescription}</p>
      </div>
    </header>
  );
}

