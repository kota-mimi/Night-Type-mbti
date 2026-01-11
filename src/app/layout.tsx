import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Header from "@/components/Header";
import FloatingAd from "@/components/FloatingAd";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ダイエットタイプ診断｜あなたの痩せ方、見つかる",
  description: "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。科学的根拠に基づいた継続可能なアプローチをご提案します。",
  keywords: "ダイエット,診断,MBTI,性格,痩せる,減量,健康,フィットネス",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dietmbti.vercel.app'),
  authors: [{ name: "ダイエットタイプ診断" }],
  creator: "ダイエットタイプ診断",
  publisher: "ダイエットタイプ診断",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "ダイエットタイプ診断｜あなたの痩せ方、見つかる",
    description: "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。",
    url: '/',
    siteName: 'ダイエットタイプ診断',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ダイエットタイプ診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ダイエットタイプ診断｜あなたの痩せ方、見つかる',
    description: '16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。',
    images: ['/og-image.png'],
    creator: '@diet_type_test',
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
    google: 'your-google-verification-code', // Google Search Consoleで取得
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
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${notoSansJP.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <FloatingAd 
          imageUrl="/line-ad.png"
          linkUrl="https://lin.ee/BCYVfcD"
          altText="LINE公式アカウント"
          closable={true}
        />
        
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