import { Suspense } from 'react'
import { diagramTypes } from '@/data/diagramTypes'
import type { Metadata } from 'next'
import HomeContent from './HomeContent'


export const metadata: Metadata = {
  title: "夜のパーソナリティ診断｜あなたの夜の性格、見つかる",
  description: "32種類の夜の性格診断で、あなたに最適な夜の過ごし方を発見。24問・約3分で完了。",
  openGraph: {
    title: "夜のパーソナリティ診断｜あなたの夜の性格、見つかる",
    description: "32種類の夜の性格診断で、あなたに最適な夜の過ごし方を発見。24問・約3分で完了。",
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
    description: '32種類の夜の性格診断で、あなたに最適な夜の過ごし方を発見。24問・約3分で完了。',
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