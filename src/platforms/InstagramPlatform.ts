import { IPlatform } from './IPlatform';
import { CommentData, PlatformConfig } from '@/types/Platform';
import { Language, translations } from '@/types/Language';

export class InstagramPlatform implements IPlatform {
  getName(): string {
    return 'Instagram';
  }

  getConfig(): PlatformConfig {
    return {
      commentWidth: 360,
      commentHeight: 140, // Dinamik
      backgroundColor: '#ffffff',
      textColor: '#000000',
      usernameFontSize: 16, // Artık kullanılmıyor ama interface gereği duruyor
      commentFontSize: 17, // Görseldeki gibi biraz daha büyük ve okunaklı
      padding: 20, // Daha ferah
      borderRadius: 24, // Daha yuvarlak köşeler
      verifiedIconSize: 16,
      profileImageSize: 48, // Biraz daha büyük profil resmi
    };
  }

  async renderComment(canvas: HTMLCanvasElement, data: CommentData, language: Language = 'en'): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config = this.getConfig();
    const t = translations[language];
    
    // Font tanımları - Apple sistem fontları
    const commentFont = `400 ${config.commentFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    const replyFont = `400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;

    // Layout hesaplamaları
    const imageX = config.padding;
    // Avatar gösterilecek mi kontrol et
    const hasAvatar = data.profileImage || data.replyingTo;
    const textX = hasAvatar ? imageX + config.profileImageSize + 12 : config.padding; // Avatar varsa ondan sonra, yoksa baştan başla
    // Metin için kalan alan - daha konservatif hesaplama (biraz margin ekle)
    const maxTextWidth = Math.max(100, config.commentWidth - textX - config.padding - 4); // -4 ekstra güvenlik marjı
    const lineHeight = config.commentFontSize * 1.3;

    // Metin satırlarını hesapla (Sadece yorum metni)
    ctx.font = commentFont;
    const lines = this.wrapText(ctx, data.commentText, maxTextWidth);
    
    // Yükseklik hesaplamaları
    const textBlockHeight = lines.length * lineHeight;
    const replyHeight = 24; // Replying to satırı için yer
    
    // İçerik yüksekliği: Metin bloğu + Replying to
    // Profil resmi ile karşılaştır, hangisi büyükse onu baz al
    const contentHeight = Math.max(config.profileImageSize, textBlockHeight + replyHeight - 5); // -5 ince ayar
    
    // Toplam yükseklik
    const totalHeight = config.padding * 2 + contentHeight;
    
    // Canvas boyutunu ayarla
    canvas.width = config.commentWidth;
    canvas.height = Math.max(totalHeight, 100);

    // 1. Arka Plan
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Temizle
    ctx.fillStyle = config.backgroundColor;
    this.drawRoundedRect(ctx, 0, 0, canvas.width, canvas.height, config.borderRadius);
    ctx.fill();

    const yOffset = config.padding;

    // 2. Avatar Çizimi (Resim, Baş Harf veya Boş Gri)
    if (data.profileImage) {
      // Profil resmi varsa onu çiz
      await this.drawProfileImage(ctx, data.profileImage, imageX, yOffset, config.profileImageSize);
    } else if (data.replyingTo) {
      // Profil resmi yoksa ama replyingTo varsa baş harf avatarı çiz
      const avatarLetter = data.replyingTo.charAt(0).toUpperCase();
      this.drawInitialAvatar(ctx, avatarLetter, imageX, yOffset, config.profileImageSize);
    } else {
      // Profil resmi yoksa ve replyingTo da yoksa boş gri daire göster
      this.drawPlaceholderAvatar(ctx, imageX, yOffset, config.profileImageSize);
    }

    // 3. Yorum Metni
    ctx.fillStyle = config.textColor;
    ctx.font = commentFont;
    ctx.textBaseline = 'top'; // Hizalamayı kolaylaştırmak için

    // Metni çiz (Hafif yukarı hizalı başlayabilir görseldeki gibi)
    let currentY = yOffset; // Profil resmiyle aynı hizada başla
    
    // Eğer tek satırsa ve replying to varsa, profil resminin ortasına denk gelmesi için biraz aşağı itilebilir
    // Ama genelde üstten hizalıdır.
    
    lines.forEach((line) => {
      ctx.fillText(line, textX, currentY);
      currentY += lineHeight;
    });

    // 4. Replying to...
    if (data.replyingTo) {
        const replyY = currentY + 4; // Son satırdan biraz sonra
        ctx.font = replyFont;
        ctx.fillStyle = '#8e8e8e'; // Gri renk
        const replyText = language === 'tr' 
          ? `${data.replyingTo}'e ${t.replyingTo}`
          : `${t.replyingTo} ${data.replyingTo}`;
        ctx.fillText(replyText, textX, replyY);
    }
  }

  // Gelişmiş metin sarma fonksiyonu (Uzun kelimeleri de böler)
  private wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    if (!text || text.trim().length === 0) {
      return [''];
    }

    const lines: string[] = [];
    const words = text.split(' ').filter(w => w.length > 0);

    if (words.length === 0) {
        return [''];
    }

    let currentLine = '';

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth <= maxWidth) {
            currentLine = testLine;
        } else {
            // Sığmadı. Mevcut satırı kaydet.
            if (currentLine.length > 0) {
                lines.push(currentLine);
                currentLine = '';
            }

            // Kelime tek başına sığıyor mu?
            if (ctx.measureText(word).width <= maxWidth) {
                currentLine = word;
            } else {
                // Kelime tek başına bile sığmıyor! Harf harf böl.
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
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }

    return lines.length > 0 ? lines : [''];
  }

  private drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
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

  private drawInitialAvatar(ctx: CanvasRenderingContext2D, letter: string, x: number, y: number, size: number): void {
    // Renkli arka plan
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
      '#E74C3C', '#3498DB', '#9B59B6', '#1ABC9C', '#F39C12'
    ];
    
    const colorIndex = letter.charCodeAt(0) % colors.length;
    const bgColor = colors[colorIndex];
    
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${size * 0.5}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, x + size / 2, y + size / 2);
    ctx.restore();
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
