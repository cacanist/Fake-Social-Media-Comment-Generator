'use client'

import { Language, translations } from '@/types/Language';
import { LanguageSelector } from './LanguageSelector';

interface FooterProps {
  language?: Language;
  onLanguageChange?: (language: Language) => void;
}

export function Footer({ language = 'en', onLanguageChange }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="app-footer">
      <p className="footer-text">
        {t.footerMadeBy}
      </p>
      {onLanguageChange && (
        <div className="footer-language-selector">
          <LanguageSelector
            selectedLanguage={language}
            onLanguageChange={onLanguageChange}
          />
        </div>
      )}
    </footer>
  );
}

