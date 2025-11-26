import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#ff4081',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'SocialMockup - TikTok, Instagram & YouTube Yorum Oluşturucu | Fake Comment Generator',
  description: 'TikTok, Instagram ve YouTube için gerçekçi fake yorum (mockup) oluşturun. Reels yorumları, YouTube yorumları simülasyonu. Ücretsiz, filigransız ve %100 gerçekçi.',
  keywords: [
    'tiktok yorum hilesi', 'instagram yorum oluşturucu', 'fake tweet oluşturucu', 'youtube yorum yapma',
    'tiktok comment generator', 'instagram comment mockup', 'youtube comment simulator', 
    'fake social media', 'reels yorum', 'shorts yorum', 'sosyal medya şaka', 'mockup tool'
  ],
  authors: [{ name: 'SocialMockup' }],
  creator: 'SocialMockup',
  openGraph: {
    type: 'website',
    url: 'https://socialmockup.app',
    title: 'SocialMockup - Ücretsiz Sosyal Medya Yorum Oluşturucu',
    description: 'TikTok, Instagram ve YouTube videoları için %100 gerçekçi yorum görselleri oluşturun. Filigransız ve ücretsiz indirin.',
    images: [
      {
        url: 'https://socialmockup.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SocialMockup - TikTok, Instagram, YouTube Yorum Oluşturucu',
      },
    ],
    locale: 'tr_TR',
    siteName: 'SocialMockup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialMockup - Fake Yorum & Mockup Oluşturucu',
    description: 'TikTok, Instagram ve YouTube için saniyeler içinde gerçekçi yorum görselleri oluşturun.',
    images: ['https://socialmockup.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Kullanıcı burayı kendi koduyla değiştirmeli
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="canonical" href="https://socialmockup.app" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'SocialMockup',
              url: 'https://socialmockup.app',
              description: 'TikTok, Instagram ve YouTube için gerçekçi yorum mockup\'ları oluşturan ücretsiz web uygulaması.',
              applicationCategory: 'DesignApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'TRY',
              },
              featureList: [
                'TikTok yorum mockup\'ı oluşturma',
                'Instagram yorum ve Reels arayüzü',
                'YouTube yorum simülasyonu',
                'Koyu mod ve açık mod desteği',
                'Türkçe ve İngilizce dil seçeneği',
                'PNG formatında yüksek kaliteli indirme'
              ],
              screenshot: 'https://socialmockup.app/og-image.png',
              author: {
                '@type': 'Organization',
                name: 'SocialMockup',
                url: 'https://socialmockup.app'
              },
              potentialAction: {
                '@type': 'CreateAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://socialmockup.app',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform'
                  ]
                },
                result: {
                  '@type': 'ImageObject',
                  name: 'Social Media Comment Mockup'
                }
              }
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
