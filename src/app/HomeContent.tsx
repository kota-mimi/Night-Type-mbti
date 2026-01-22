'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import CharacterMarquee from '@/components/CharacterMarquee'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function HomeContent() {
  return (
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-64 h-64 top-10 left-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-48 h-48 top-1/3 right-20" style={{animationDelay: '2s'}} />
      <div className="floating-orb orb-purple w-56 h-56 bottom-20 left-1/3" style={{animationDelay: '4s'}} />
      <div className="floating-orb orb-pink w-32 h-32 top-2/3 right-10" style={{animationDelay: '6s'}} />
      
      <main className="flex flex-col justify-center items-center min-h-screen text-center px-4 relative z-10">
        
        {/* メインコンテンツ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          {/* タイトル */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${zenMaruGothic.className}`}>
            <span className="neon-pink">Night</span>{' '}
            <span className="neon-cyan">Type</span>
          </h1>
          
          {/* サブタイトル */}
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mb-4 leading-relaxed"
          >
            あなたの性格と、<span className="neon-gold">夜の過ごし方</span>が見つかる。
          </motion.h2>
          
          {/* 説明テキスト */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            深夜の世界で輝くあなたの本性を探る、大人のための性格診断。
            <br />
            24問・約5分で、隠された夜の自分と出会う。
          </motion.p>
          
          {/* 診断ボタン */}
          <Link href="/quiz/1">
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 0, 127, 0.6), 0 0 60px rgba(255, 0, 127, 0.3)" 
              }}
              whileTap={{ scale: 0.98 }}
              className="luxury-button text-white font-bold py-4 px-16 rounded-full text-lg md:text-xl mb-16 relative"
            >
              <span className="relative z-10">診断を始める</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Character Marquee Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="w-full space-y-8"
        >
          {/* セクションタイトル */}
          <h3 className="text-xl md:text-2xl font-bold text-center mb-8">
            <span className="text-gray-400">深夜に潜む</span>{' '}
            <span className="neon-pink">32のタイプ</span>
          </h3>
          
          {/* First row - scrolling right */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-900 via-transparent to-midnight-900 pointer-events-none z-10" />
            <CharacterMarquee direction="right" speed={15} row="first" />
          </div>
          
          {/* Second row - scrolling left */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-midnight-900 via-transparent to-midnight-900 pointer-events-none z-10" />
            <CharacterMarquee direction="left" speed={18} row="second" />
          </div>
        </motion.div>
        
        {/* Bottom CTA Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm mb-8">
            ✨ 無料・匿名・3分で完了 ✨
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
            <span>🔒 プライバシー保護</span>
            <span>📱 スマホ対応</span>
            <span>🎯 高精度診断</span>
          </div>
        </motion.div>
      </main>
    </div>
  )
}