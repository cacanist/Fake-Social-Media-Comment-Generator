import { IPlatform } from './IPlatform';
import { TikTokPlatform } from './TikTokPlatform';
import { InstagramPlatform } from './InstagramPlatform';
import { YouTubePlatform } from './YouTubePlatform';
import { PlatformType } from '@/types/Platform';

export class PlatformFactory {
  static create(platformType: PlatformType): IPlatform {
    switch (platformType) {
      case 'tiktok':
        return new TikTokPlatform();
      case 'instagram':
        return new InstagramPlatform();
      case 'youtube':
        return new YouTubePlatform();
      default:
        throw new Error(`Unknown platform: ${platformType}`);
    }
  }
}

