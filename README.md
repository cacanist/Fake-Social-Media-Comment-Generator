# SocialMockup.app

TikTok, Instagram ve YouTube için profesyonel görünümlü yorum mockupları oluşturmanızı sağlayan ücretsiz bir web uygulaması.

## 🌟 Özellikler

- **Çoklu Platform Desteği**: TikTok, Instagram ve YouTube için özel tasarlanmış, platforma özgü arayüzler.
- **Gerçekçi Simülasyon**: Telefon çerçevesi ve platform arayüzleriyle (Reels, Shorts vb.) %100 gerçekçi görünüm.
- **Kolay Profil Yönetimi**: Kendi fotoğrafınızı yükleyebilir veya tek tıkla rastgele bir kullanıcı profili oluşturabilirsiniz.
- **Anlık Önizleme**: Yaptığınız her değişikliği (metin, kullanıcı adı, resim) anında telefon ekranında görün.
- **Yüksek Kalite İndirme**: Oluşturduğunuz mockupları filigransız (watermark yok) ve yüksek çözünürlüklü PNG olarak indirin.
- **Koyu/Açık Mod**: Sistem tercihinize göre otomatik veya manuel olarak değiştirebileceğiniz tema desteği.
- **Çoklu Dil**: Türkçe ve İngilizce dil desteği.

## 🚀 Nasıl Kullanılır?

1. **Platform Seçin**: TikTok, Instagram veya YouTube sekmelerinden birini seçin.
2. **Profil Oluşturun**:
   - "Yükle" butonuyla kendi fotoğrafınızı ekleyin.
   - Veya "Rastgele Oluştur" diyerek anında yapay bir profil oluşturun.
3. **İçeriği Düzenleyin**:
   - Yanıt verdiğiniz kişinin kullanıcı adını girin.
   - Yorumunuzu yazın.
4. **İndirin**: "Yorumu İndir" butonuna tıklayın ve görseliniz hazır!

## 🛠️ Teknik Altyapı

Bu proje modern web teknolojileri ve en iyi uygulama pratikleri (Best Practices) kullanılarak geliştirilmiştir.

- **Frontend**: Next.js 14, React, TypeScript
- **Stil**: CSS Modules (Performans ve modülerlik için)
- **Görsel İşleme**: HTML5 Canvas API (Client-side rendering)
- **Tasarım Deseni**: Strategy Pattern (Platform bağımsız genişletilebilirlik için)

### Proje Yapısı

- `platforms/`: Her sosyal medya platformunun görselleştirme mantığı burada ayrı sınıflar halinde tutulur.
- `services/`: Görsel oluşturma ve indirme işlemlerini yöneten servis katmanı.
- `components/`: Kullanıcı arayüzü bileşenleri.
- `utils/`: Yardımcı fonksiyonlar ve araçlar.

## 📦 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için:

1. Depoyu klonlayın:
```bash
git clone https://github.com/kullaniciadi/socialmockup.app.git
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı görüntüleyebilirsiniz.

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak isterseniz, lütfen bir Pull Request gönderin veya bir Issue açın. Her türlü geri bildirim değerlidir.

## 📄 Lisans

Bu proje MIT lisansı altında açık kaynak olarak sunulmaktadır.
