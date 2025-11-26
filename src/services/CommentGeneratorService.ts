import { IPlatform } from '@/platforms/IPlatform';
import { CommentData } from '@/types/Platform';
import { Language } from '@/types/Language';

export class CommentGeneratorService {
  constructor(private platform: IPlatform) {}

  async generateCommentPNG(data: CommentData, language: Language = 'en'): Promise<Blob> {
    const canvas = document.createElement('canvas');
    await this.platform.renderComment(canvas, data, language);
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to generate PNG'));
        }
      }, 'image/png');
    });
  }

  setPlatform(platform: IPlatform): void {
    this.platform = platform;
  }
}

