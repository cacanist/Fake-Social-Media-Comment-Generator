import { IPlatform } from './IPlatform';
import { CommentData, PlatformConfig } from '@/types/Platform';
import { Language, translations } from '@/types/Language';

export class TikTokPlatform implements IPlatform {
  getName(): string {
    return 'TikTok';
  }

  getConfig(): PlatformConfig {
    return {
      commentWidth: 400,
      commentHeight: 150, // Dinamik
      backgroundColor: '#ffffff',
      textColor: '#000000',
      usernameFontSize: 14, // Reply to kısmı için
      commentFontSize: 18, // Yorum metni için (daha büyük ve kalın)
      padding: 20,
      borderRadius: 16,
      verifiedIconSize: 0, // Bu tasarımda kullanılmıyor
      profileImageSize: 48,
    };
  }

  async renderComment(canvas: HTMLCanvasElement, data: CommentData, language: Language = 'en'): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = this.getConfig();
    const t = translations[language];

    // Font tanımları
    const replyFont = `400 ${config.usernameFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    const commentFont = `700 ${config.commentFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`; // Kalın font

    // Layout hesaplamaları
    const imageX = config.padding;
    const textX = imageX + config.profileImageSize + 12;
    const maxTextWidth = config.commentWidth - textX - config.padding;
    const lineHeight = config.commentFontSize * 1.25;

    // "Reply to username's comment" metni
    // Eğer replyingTo varsa onu kullan, yoksa username'i kullan
    const replyUsername = data.replyingTo || data.username || 'User';
    const replyText = language === 'tr' 
      ? `${replyUsername}'in yorumuna ${t.replyToComment}`
      : `${t.replyToComment} ${replyUsername}'s comment`;

    // Yorum metni satırlarını hesapla
    ctx.font = commentFont;
    const lines = this.wrapText(ctx, data.commentText, maxTextWidth);
    
    // Yükseklik hesaplamaları
    // Üstteki reply text yüksekliği + boşluk + yorum satırları
    const replyTextHeight = 20;
    const textBlockHeight = lines.length * lineHeight;
    
    // İçerik yüksekliği
    const contentHeight = Math.max(config.profileImageSize, replyTextHeight + textBlockHeight);
    
    // Toplam yükseklik (Balon ucu için altta ekstra yer bırakmaya gerek yok, balon ucu kutudan dışarı taşacak ama canvas içinde kalmalı)
    // Balon ucu yüksekliği
    const arrowHeight = 15;
    const totalHeight = config.padding * 2 + contentHeight + arrowHeight;
    
    canvas.width = config.commentWidth;
    canvas.height = Math.max(totalHeight, 120);

    // 1. Konuşma Balonu Çizimi
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Temizle
    ctx.fillStyle = config.backgroundColor;
    this.drawBubble(ctx, 0, 0, canvas.width, canvas.height - arrowHeight, config.borderRadius, arrowHeight);
    ctx.fill();

    const yOffset = config.padding;

    // 2. Profil Resmi
    if (data.profileImage) {
      await this.drawProfileImage(ctx, data.profileImage, imageX, yOffset, config.profileImageSize);
    } else {
       // Profil resmi yoksa varsayılan gri daire
       this.drawPlaceholderAvatar(ctx, imageX, yOffset, config.profileImageSize);
    }

    // 3. "Reply to..." Metni
    ctx.fillStyle = '#8A8B91'; // Gri renk
    ctx.font = replyFont;
    ctx.textBaseline = 'top';
    ctx.fillText(replyText, textX, yOffset);

    // 4. Yorum Metni
    ctx.fillStyle = config.textColor;
    ctx.font = commentFont;
    
    let currentY = yOffset + replyTextHeight + 5; // Reply text'in altı
    
    lines.forEach((line) => {
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

  // Konuşma balonu çizen fonksiyon
  private drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number, arrowHeight: number): void {
    ctx.beginPath();
    // Üst kenar
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    
    // Sağ kenar
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    
    // Alt kenar (sağdan sola, balon ucuna kadar)
    const arrowWidth = 20; // Balon ucunun genişliği
    ctx.lineTo(x + arrowWidth, y + height);
    
    // Balon ucu - tam sol kenardan başlıyor
    ctx.lineTo(x, y + height + arrowHeight); // Uç noktası (tam sol kenarda, aşağıda)
    ctx.lineTo(x, y + height); // Sol kenara geri dönüş
    
    // Sol kenar (balon ucundan yukarı)
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    
    ctx.closePath();
  }

  private async drawProfileImage(ctx: CanvasRenderingContext2D, imageSrc: string, x: number, y: number, size: number): Promise<void> {
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
