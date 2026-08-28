import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Night Type｜大人の夜の性格診断",
    template: "%s｜Night Type",
  },
  description: "24問で恋愛や親密な場面の価値観を16タイプに分析。男女32キャラクターから、あなたのNight Typeが見つかる無料エンタメ診断です。",
  keywords: ["大人の性格診断", "夜の性格診断", "16タイプ診断", "恋愛診断", "キャラクター診断"],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://night-type.net'),
  authors: [{ name: "Night Type" }],
  creator: "Night Type",
  publisher: "Night Type",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'Night Type',
    locale: 'ja_JP',
    type: 'website',
    title: "Night Type｜大人の夜の性格診断",
    description: "24問で恋愛や親密な場面の本音を16タイプに。男女32キャラクターで楽しむ無料エンタメ診断。",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Night Type',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Night Type｜大人の夜の性格診断",
    description: "24問で恋愛や親密な場面の本音を16タイプに。男女32キャラクターで楽しむ無料エンタメ診断。",
    images: ['/og-image.png'],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#17152b" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5911899389259411"
             crossOrigin="anonymous"></script>
        <StructuredData />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        
        {/* Google Analytics */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  );
}
