import { IPlatform } from './IPlatform';
import { CommentData, PlatformConfig } from '@/types/Platform';
import { Language, translations } from '@/types/Language';

export class YouTubePlatform implements IPlatform {
  getName(): string {
    return 'YouTube';
  }

  getConfig(): PlatformConfig {
    return {
      commentWidth: 600, // Daha geniş (400'den 600'e)
      commentHeight: 200,
      backgroundColor: '#ffffff',
      textColor: '#030303',
      usernameFontSize: 18, // Daha büyük font (14'ten 18'e)
      commentFontSize: 18, // Daha büyük font (14'ten 18'e)
      padding: 32, // Daha fazla padding
      borderRadius: 12, // Orantılı border radius (8'den 12'ye)
      verifiedIconSize: 0,
      profileImageSize: 60, // Daha büyük profil resmi (40'tan 60'a)
    };
  }

  async renderComment(canvas: HTMLCanvasElement, data: CommentData, language: Language = 'en'): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = this.getConfig();
    const t = translations[language];

    // Font tanımları - YouTube kullanır
    const usernameFont = `500 ${config.usernameFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    const commentFont = `400 ${config.commentFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

    // Layout hesaplamaları
    const imageX = config.padding;
    const textX = imageX + config.profileImageSize + 12;
    const maxTextWidth = config.commentWidth - textX - config.padding;
    const lineHeight = config.commentFontSize * 1.5;
    const usernameLineHeight = config.usernameFontSize * 1.4;

    // Kullanıcı adı - replyingTo varsa onu kullan, yoksa username'i kullan
    const username = data.replyingTo || data.username || 'User';
    
    // Yorum metni satırlarını hesapla
    ctx.font = commentFont;
    const commentLines = this.wrapText(ctx, data.commentText, maxTextWidth);
    
    // Yükseklik hesaplamaları
    const usernameHeight = usernameLineHeight;
    const commentHeight = commentLines.length * lineHeight;
    const spacing = 4; // Kullanıcı adı ve yorum arası boşluk
    
    // İçerik yüksekliği
    const contentHeight = Math.max(config.profileImageSize, usernameHeight + spacing + commentHeight);
    
    // Toplam yükseklik
    const totalHeight = config.padding * 2 + contentHeight;
    
    canvas.width = config.commentWidth;
    canvas.height = Math.max(totalHeight, 140);

    // 1. Arka Plan
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Temizle
    ctx.fillStyle = config.backgroundColor;
    this.drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, config.borderRadius);
    ctx.fill();

    const yOffset = config.padding;

    // 2. Profil Resmi
    if (data.profileImage) {
      await this.drawProfileImage(ctx, data.profileImage, imageX, yOffset, config.profileImageSize);
    } else {
      this.drawPlaceholderAvatar(ctx, imageX, yOffset, config.profileImageSize);
    }

    // 3. Kullanıcı Adı
    ctx.fillStyle = '#030303';
    ctx.font = usernameFont;
    ctx.textBaseline = 'top';
    ctx.fillText(username, textX, yOffset);

    // 4. Yorum Metni
    ctx.fillStyle = config.textColor;
    ctx.font = commentFont;
    
    let currentY = yOffset + usernameHeight + spacing;
    
    commentLines.forEach((line) => {
      ctx.fillText(line, textX, currentY);
      currentY += lineHeight;
    });
  }

  // Metin sarma fonksiyonu
  private wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    if (!text || text.trim().length === 0) return [''];

    const lines: string[] = [];
    const words = text.split(' ').filter(w => w.length > 0);

    if (words.length === 0) return [''];

    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine ? currentLine + ' ' + word : word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = '';
        }
        if (ctx.measureText(word).width <= maxWidth) {
          currentLine = word;
        } else {
          let subWord = '';
          for (let char of word) {
            if (ctx.measureText(subWord + char).width <= maxWidth) {
              subWord += char;
            } else {
              lines.push(subWord);
              subWord = char;
            }
          }
          currentLine = subWord;
        }
      }
    }
    if (currentLine.length > 0) lines.push(currentLine);
    return lines.length > 0 ? lines : [''];
  }

  // Yuvarlatılmış dikdörtgen çizen fonksiyon
  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  private async drawProfileImage(
    ctx: CanvasRenderingContext2D,
    imageSrc: string,
    x: number,
    y: number,
    size: number
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, x, y, size, size);
        ctx.restore();
        resolve();
      };
      img.onerror = reject;
      img.src = imageSrc;
    });
  }

  private drawPlaceholderAvatar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.save();
    ctx.fillStyle = '#E0E0E0';
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

