'use client'

import { PlatformType } from '@/types/Platform';

interface PlatformSelectorProps {
  selectedPlatform: PlatformType;
  onPlatformChange: (platform: PlatformType) => void;
}

export function PlatformSelector({ selectedPlatform, onPlatformChange }: PlatformSelectorProps) {
  return (
    <div className="platform-selector">
      <button
        className={`platform-tab ${selectedPlatform === 'tiktok' ? 'active' : ''}`}
        onClick={() => onPlatformChange('tiktok')}
      >
        TikTok
      </button>
      <button
        className={`platform-tab ${selectedPlatform === 'instagram' ? 'active' : ''}`}
        onClick={() => onPlatformChange('instagram')}
      >
        Instagram
      </button>
      <button
        className={`platform-tab ${selectedPlatform === 'youtube' ? 'active' : ''}`}
        onClick={() => onPlatformChange('youtube')}
      >
        YouTube
      </button>
    </div>
  );
}

