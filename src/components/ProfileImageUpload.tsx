'use client'

import { generateRandomAvatar, loadImageAsDataURL } from '@/utils/imageUtils';
import { Language, translations } from '@/types/Language';

interface ProfileImageUploadProps {
  profileImage: string | null;
  onImageChange: (image: string) => void;
  language?: Language;
}

export function ProfileImageUpload({ profileImage, onImageChange, language = 'en' }: ProfileImageUploadProps) {
  const t = translations[language];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert(language === 'tr' ? 'Lütfen geçerli bir resim dosyası yükleyin.' : 'Please upload a valid image file.');
        return;
      }

      try {
        const dataURL = await loadImageAsDataURL(file);
        onImageChange(dataURL);
      } catch (error) {
        console.error('Error loading image:', error);
        alert(language === 'tr' ? 'Resim yüklenirken bir hata oluştu.' : 'Error loading image.');
      }
    }
  };

  const handleGenerateRandom = async () => {
    try {
    const randomAvatar = await generateRandomAvatar();
    onImageChange(randomAvatar);
    } catch (error) {
      console.error('Error generating avatar:', error);
      alert(language === 'tr' ? 'Rastgele avatar oluşturulamadı.' : 'Could not generate random avatar.');
    }
  };

  return (
    <div className="profile-upload">
      <div className="profile-image-container">
        {profileImage ? (
          <img src={profileImage} alt="Profile" className="profile-image" />
        ) : (
          <div className="profile-image-placeholder">?</div>
        )}
      </div>
      <div className="upload-options">
        <label className="upload-button">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
          {t.uploadButton}
        </label>
        <span className="or-text">{t.orText}</span>
        <button className="generate-button" onClick={handleGenerateRandom}>
          {t.generateRandomButton}
        </button>
      </div>
    </div>
  );
}

