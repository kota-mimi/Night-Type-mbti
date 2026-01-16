import { Suspense } from 'react'
import { diagramTypes } from '@/data/diagramTypes'
import type { Metadata } from 'next'
import HomeContent from './HomeContent'


export const metadata: Metadata = {
  title: "夜のパーソナリティ診断｜あなたの夜の性格、見つかる",
  description: "16タイプの大人向け性格診断で、あなたの夜の本性を発見。20問・約3分で完了。",
  openGraph: {
    title: "夜のパーソナリティ診断｜あなたの夜の性格、見つかる",
    description: "16タイプの大人向け性格診断で、あなたの夜の本性を発見。20問・約3分で完了。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: '夜のパーソナリティ診断',
      },
    ],
    type: 'website',
    siteName: '夜のパーソナリティ診断',
  },
  twitter: {
    card: 'summary_large_image',
    title: '夜のパーソナリティ診断｜あなたの夜の性格、見つかる',
    description: '16タイプの大人向け性格診断で、あなたの夜の本性を発見。20問・約3分で完了。',
    images: ["/og-image.png"],
  },
}


export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
    </div>}>
      <HomeContent />
    </Suspense>
  )
}