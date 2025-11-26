'use client'

import { useState, useMemo, useEffect } from 'react';
import { PlatformType, CommentData } from '@/types/Platform';
import { Language, translations } from '@/types/Language';
import { PlatformFactory } from '@/platforms/PlatformFactory';
import { CommentGeneratorService } from '@/services/CommentGeneratorService';
import { PlatformSelector } from '@/components/PlatformSelector';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProfileImageUpload } from '@/components/ProfileImageUpload';
import { CommentForm } from '@/components/CommentForm';
import { CommentPreview } from '@/components/CommentPreview';
import { detectBrowserLanguage } from '@/utils/languageDetector';
import { 
  Theme, 
  getStoredTheme, 
  setStoredTheme, 
  getEffectiveTheme, 
  applyTheme 
} from '@/utils/themeDetector';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('tiktok');
  // UI dili - Kullanıcı değiştirebilir
  const [uiLanguage, setUiLanguage] = useState<Language>('en');
  // Görsel oluşturma dili - dil seçicisi ile değişir
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('auto');
  const [commentData, setCommentData] = useState<CommentData>({
    username: '',
    commentText: '',
    profileImage: null,
  });

  // Mount olduktan sonra tarayıcı özelliklerini kontrol et
  useEffect(() => {
    setMounted(true);
    setUiLanguage(detectBrowserLanguage());
    setTheme(getStoredTheme());
  }, []);

  // Theme'i uygula
  useEffect(() => {
    if (!mounted) return;
    const effectiveTheme = getEffectiveTheme(theme);
    applyTheme(effectiveTheme);
  }, [theme, mounted]);

  // Sistem tercihi değişikliğini dinle
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        const effectiveTheme = getEffectiveTheme('auto');
        applyTheme(effectiveTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Saat bazlı kontrol (her dakika kontrol et)
  useEffect(() => {
    if (!mounted || theme !== 'auto') return;

    const checkTime = () => {
      const effectiveTheme = getEffectiveTheme('auto');
      applyTheme(effectiveTheme);
    };

    checkTime();
    const interval = setInterval(checkTime, 60000); // Her dakika kontrol et
    return () => clearInterval(interval);
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setStoredTheme(newTheme);
  };

  // ... rest of the component ...

  if (!mounted) {
    return null; // veya bir loading spinner
  }

  const platform = PlatformFactory.create(selectedPlatform);
  const generatorService = new CommentGeneratorService(platform);
  const t = translations[uiLanguage]; // UI için sabit dil

  const handleDownload = async () => {
    try {
      const blob = await generatorService.generateCommentPNG(commentData, selectedLanguage);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${selectedPlatform}-comment.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating comment:', error);
      alert(t.errorMessage);
    }
  };

  const handleDataChange = (partialData: Partial<CommentData>) => {
    setCommentData((prev) => ({ ...prev, ...partialData }));
  };

  return (
    <div className="app">
      <Header 
        language={uiLanguage} 
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      
      <div className="container">
        <div className="left-panel">
          <div className="selector-group">
            <PlatformSelector
              selectedPlatform={selectedPlatform}
              onPlatformChange={setSelectedPlatform}
            />
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />
          </div>

          <ProfileImageUpload
            profileImage={commentData.profileImage}
            onImageChange={(image) => handleDataChange({ profileImage: image })}
            language={uiLanguage}
          />

          <CommentForm data={commentData} onDataChange={handleDataChange} language={uiLanguage} />

          <button className="download-button" onClick={handleDownload}>
            {t.downloadButton}
          </button>
        </div>

        <div className="right-panel">
          <CommentPreview platform={platform} data={commentData} language={selectedLanguage} />
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="seo-content">
        <h2>SocialMockup: {t.headerSubtitle}</h2>
        <p>
          {uiLanguage === 'tr' 
            ? 'SocialMockup ile TikTok, Instagram ve YouTube videolarınız için saniyeler içinde gerçekçi yorum görselleri oluşturabilirsiniz. İçerik üreticileri, sosyal medya yöneticileri ve şaka yapmak isteyenler için en iyi ücretsiz araç.' 
            : 'Create realistic comment mockups for your TikTok, Instagram, and YouTube videos in seconds with SocialMockup. The best free tool for content creators, social media managers, and pranksters.'}
        </p>

        <h3>{uiLanguage === 'tr' ? 'Özellikler' : 'Features'}</h3>
        <ul>
          <li><strong>TikTok Comment Generator:</strong> {uiLanguage === 'tr' ? 'Gerçek TikTok yorum arayüzü simülasyonu.' : 'Realistic TikTok comment interface simulation.'}</li>
          <li><strong>Instagram Comment Mockup:</strong> {uiLanguage === 'tr' ? 'Instagram Reels ve gönderi yorumları oluşturun.' : 'Create Instagram Reels and post comments.'}</li>
          <li><strong>YouTube Comment Simulator:</strong> {uiLanguage === 'tr' ? 'YouTube video yorumları yapın.' : 'Make YouTube video comments.'}</li>
          <li>{uiLanguage === 'tr' ? 'Koyu Mod ve Açık Mod desteği.' : 'Dark Mode and Light Mode support.'}</li>
          <li>{uiLanguage === 'tr' ? 'Filigransız (Watermark yok), yüksek kaliteli PNG indirme.' : 'No watermark, high-quality PNG download.'}</li>
        </ul>

        <h3>{uiLanguage === 'tr' ? 'Nasıl Kullanılır?' : 'How to Use?'}</h3>
        <ol>
          <li>{uiLanguage === 'tr' ? 'Platform seçin (TikTok, Instagram veya YouTube).' : 'Select a platform (TikTok, Instagram, or YouTube).'}</li>
          <li>{uiLanguage === 'tr' ? 'Profil resmi yükleyin veya rastgele oluşturun.' : 'Upload a profile picture or generate a random one.'}</li>
          <li>{uiLanguage === 'tr' ? 'Kullanıcı adı ve yorum metnini girin.' : 'Enter username and comment text.'}</li>
          <li>{uiLanguage === 'tr' ? 'Görseli anında önizleyin ve İndir butonuna tıklayın.' : 'Preview instantly and click the Download button.'}</li>
        </ol>
      </article>

      <Footer
        language={uiLanguage}
        onLanguageChange={setUiLanguage}
      />
    </div>
  );
}
