'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})


export default function HomeContent() {
  return (
    <div className={`bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      
      <main className="flex flex-col items-center text-center px-4 pt-8 pb-16 relative z-10">
        
        {/* メインコンテンツ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          {/* タイトル */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-[#FF007F]">Night</span>{' '}
            <span className="text-[#00FFFF]">Type</span>
          </h1>
          
          {/* サブタイトル */}
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 mb-4 leading-relaxed"
          >
            あなたの性格と、<span className="text-[#FF007F]">夜の過ごし方</span>が見つかる。
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
                boxShadow: '0 0 30px rgba(255, 0, 127, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              className="relative text-white font-bold py-4 px-16 rounded-full text-lg md:text-xl mb-16 overflow-hidden border-2 border-[#FF007F] hover:border-[#FF007F] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #FF007F 0%, #00FFFF 50%, #FF007F 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              <span className="relative z-10">診断を始める</span>
            </motion.button>
          </Link>
        </motion.div>

        
      </main>
    </div>
  )
}