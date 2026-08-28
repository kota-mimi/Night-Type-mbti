import { Suspense } from 'react'
import type { Metadata } from 'next'
import HomeContent from './HomeContent'


export const metadata: Metadata = {
  title: "大人の夜の性格診断・夜のMBTI風16タイプ",
  description: "24問・約3分で、恋愛や親密な場面の本音を16タイプに分析。男女32キャラクターで楽しむ、登録不要の無料エンタメ診断です。",
  alternates: { canonical: '/' },
  openGraph: {
    title: "Night Type｜大人の夜の性格診断",
    description: "24問で恋愛や親密な場面の本音を16タイプに。男女32キャラクターからあなたのNight Typeを診断。",
    url: '/',
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: '夜のパーソナリティ診断',
      },
    ],
    type: 'website',
      siteName: 'Night Type',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Night Type｜大人の夜の性格診断',
    description: '24問で恋愛や親密な場面の本音を16タイプに。男女32キャラクターで楽しむ無料診断。',
    images: ["/og-image.png"],
  },
}


export default function Home() {
  return (
    <Suspense fallback={<div className="bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16">
      <div className="w-8 h-8 border-2 border-[#FF007F] border-t-transparent rounded-full animate-spin" />
    </div>}>
      <HomeContent />
    </Suspense>
  )
}
