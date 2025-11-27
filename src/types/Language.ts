export type Language = 'en' | 'tr';

export interface Translations {
  replyToComment: string; // "Reply to username's comment"
  replyingTo: string; // "Replying to username"
  headerTitle: string; // "SocialMockup"
  headerSubtitle: string; // "Create Realistic TikTok & Instagram Comment Mockups"
  headerDescription: string; // "Generate professional-looking comment mockups for your social media content. Free, fast, and easy to use."
  downloadButton: string; // "Download Comment"
  errorMessage: string; // Error message when comment generation fails
  usernamePlaceholder: string; // "Username"
  replyingToPlaceholder: string; // "Replying to (dattblackdude)"
  commentTextPlaceholder: string; // "Comment text"
  characterCount: string; // "{count}/150 characters"
  uploadButton: string; // "Upload"
  orText: string; // "OR"
  generateRandomButton: string; // "Generate Random"
  footerFreeText: string; // "Free to use"
  footerMadeBy: string; // "Made with ❤️ by"
}

export const translations: Record<Language, Translations> = {
  en: {
    replyToComment: "Reply to",
    replyingTo: "Replying to",
    headerTitle: "SocialMockup",
    headerSubtitle: "Create Realistic TikTok, Instagram & YouTube Comment Mockups",
    headerDescription: "Generate professional-looking comment mockups for your social media content. Free, fast, and easy to use.",
    downloadButton: "Download Comment",
    errorMessage: "An error occurred while generating the comment.",
    usernamePlaceholder: "Username",
    replyingToPlaceholder: "Replying to (dattblackdude)",
    commentTextPlaceholder: "Comment text",
    characterCount: " characters",
    uploadButton: "Upload",
    orText: "OR",
    generateRandomButton: "Generate Random",
    footerFreeText: "Free to use",
    footerMadeBy: "Made with ❤️ by Çaça",
  },
  tr: {
    replyToComment: "Yanıtla",
    replyingTo: "yanıt veriliyor",
    headerTitle: "SocialMockup",
    headerSubtitle: "Gerçekçi TikTok, Instagram ve YouTube Yorum Mockupları Oluşturun",
    headerDescription: "Sosyal medya içeriğiniz için profesyonel görünümlü yorum mockupları oluşturun. Ücretsiz, hızlı ve kullanımı kolay.",
    downloadButton: "Yorumu İndir",
    errorMessage: "Yorum oluşturulurken bir hata oluştu.",
    usernamePlaceholder: "Kullanıcı adı",
    replyingToPlaceholder: "Yanıtlanan (dattblackdude)",
    commentTextPlaceholder: "Yorum metni",
    characterCount: " karakter",
    uploadButton: "Yükle",
    orText: "VEYA",
    generateRandomButton: "Rastgele Oluştur",
    footerFreeText: "Ücretsiz kullanım",
    footerMadeBy: "Çaça tarafından ❤️ ile yapıldı",
  },
};

