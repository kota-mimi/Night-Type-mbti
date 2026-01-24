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
  title: "Night Type｜あなたの夜の性格、見つかる",
  description: "16タイプの夜の性格診断で、あなたに最適な夜の過ごし方を発見。20問・約3分で完了。科学的根拠に基づいた継続可能なアプローチをご提案します。",
  keywords: "夜,性格,診断,MBTI,ライフスタイル,夜型,深夜",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://night-type.net'),
  authors: [{ name: "Night Type" }],
  creator: "Night Type",
  publisher: "Night Type",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
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
    title: "Night Type｜あなたの夜の性格、見つかる",
    description: "16タイプの夜の性格診断で、あなたに最適な夜の過ごし方を発見。20問・約3分で完了。",
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
    title: "Night Type｜あなたの夜の性格、見つかる",
    description: "16タイプの夜の性格診断で、あなたに最適な夜の過ごし方を発見。20問・約3分で完了。",
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
        <meta name="theme-color" content="#050510" />
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