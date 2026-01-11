'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import CharacterMarquee from '@/components/CharacterMarquee'
import { useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { diagramTypes } from '@/data/diagramTypes'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

function HomeContent() {
  const searchParams = useSearchParams()
  const resultType = searchParams.get('result')

  useEffect(() => {
    // Dynamic meta tag updates for OG images when result parameter is present
    if (resultType && diagramTypes[resultType]) {
      const typeData = diagramTypes[resultType]
      
      // Update page title
      document.title = `${typeData.name} | ダイエットタイプ診断`
      
      // Update or create OG meta tags
      const updateMetaTag = (property: string, content: string) => {
        let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement
        if (!meta) {
          meta = document.createElement('meta')
          meta.setAttribute('property', property)
          document.head.appendChild(meta)
        }
        meta.content = content
      }
      
      updateMetaTag('og:title', `私のダイエットタイプは「${typeData.name}」`)
      updateMetaTag('og:description', typeData.catchcopy)
      updateMetaTag('og:image', `${window.location.origin}/characters/${resultType}_new3.png`)
      updateMetaTag('twitter:card', 'summary_large_image')
      updateMetaTag('twitter:title', `私のダイエットタイプは「${typeData.name}」`)
      updateMetaTag('twitter:description', typeData.catchcopy)
      updateMetaTag('twitter:image', `${window.location.origin}/characters/${resultType}_new3.png`)
    }
  }, [resultType])

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <main className="flex flex-col justify-center items-center min-h-screen text-center px-4">
        
        {/* メインコンテンツ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* タイトル */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            ダイエットキャラ診断16
          </h1>
          
          {/* サブタイトル */}
          <h2 className="text-xl md:text-2xl text-white/90 mb-12">
            あなたの性格と、痩せ方が見つかる。
          </h2>
          
          {/* 診断ボタン */}
          <Link href="/quiz/1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold py-4 px-12 rounded-full text-lg md:text-xl shadow-xl transition-all duration-300 mb-16"
            >
              診断を始める
            </motion.button>
          </Link>
        </motion.div>

        {/* Character Marquee Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full space-y-6"
        >
          {/* First row - scrolling right (SR & SE types) */}
          <CharacterMarquee direction="right" speed={15} row="first" />
          
          {/* Second row - scrolling left (GR & GE types) */}
          <CharacterMarquee direction="left" speed={18} row="second" />
        </motion.div>
      </main>
    </div>
  )
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