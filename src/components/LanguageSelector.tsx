'use client'

import { Language } from '@/types/Language';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="language-selector">
      <button
        className={`language-tab ${selectedLanguage === 'en' ? 'active' : ''}`}
        onClick={() => onLanguageChange('en')}
      >
        EN
      </button>
      <button
        className={`language-tab ${selectedLanguage === 'tr' ? 'active' : ''}`}
        onClick={() => onLanguageChange('tr')}
      >
        TR
      </button>
    </div>
  );
}

