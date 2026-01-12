import { Suspense } from 'react'
import { diagramTypes } from '@/data/diagramTypes'
import type { Metadata } from 'next'
import HomeContent from './HomeContent'


export async function generateMetadata({ searchParams }: { searchParams: Promise<{ result?: string }> }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const resultType = resolvedSearchParams.result

  if (resultType && diagramTypes[resultType]) {
    const typeData = diagramTypes[resultType]
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dietmbti.vercel.app'
    
    return {
      title: `私のダイエットタイプは「${typeData.name}」 | ダイエットタイプ診断`,
      description: typeData.catchcopy,
      openGraph: {
        title: `私のダイエットタイプは「${typeData.name}」`,
        description: typeData.catchcopy,
        images: [
          {
            url: `${baseUrl}/characters/${resultType}_new3.png`,
            width: 640,
            height: 760,
            alt: `${typeData.name}のキャラクター`,
          },
        ],
        type: 'website',
        siteName: 'ダイエットタイプ診断',
      },
      twitter: {
        card: 'summary_large_image',
        title: `私のダイエットタイプは「${typeData.name}」`,
        description: typeData.catchcopy,
        images: [`${baseUrl}/characters/${resultType}_new3.png`],
      },
    }
  }

  // デフォルトのメタデータ（結果パラメータがない場合）
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dietmbti.vercel.app'
  
  return {
    title: "ダイエットタイプ診断｜あなたの痩せ方、見つかる",
    description: "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。",
    openGraph: {
      title: "ダイエットタイプ診断｜あなたの痩せ方、見つかる",
      description: "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'ダイエットタイプ診断',
        },
      ],
      type: 'website',
      siteName: 'ダイエットタイプ診断',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ダイエットタイプ診断｜あなたの痩せ方、見つかる',
      description: '16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。',
      images: [`${baseUrl}/og-image.png`],
    },
  }
}


export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full animate-spin" />
    </div>}>
      <HomeContent />
    </Suspense>
  )
}