'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export default function Home() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <main className="container mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-screen text-center">
        
        {/* タイトルエリア */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            ダイエットタイプ診断
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6">
            あなたの痩せ方、見つかる。
          </p>
          
          <p className="text-base md:text-lg text-white/80 mb-2">
            人気恋愛診断を開発した
          </p>
          <p className="text-base md:text-lg text-white/80 mb-2">
            エンジニア・イラストレーターを含むクリエイターチームが
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8">
            再び挑戦。
          </p>
          
          <p className="text-lg md:text-xl text-white/90 font-medium">
            ※16タイプを更に4分類
          </p>
        </motion.div>

        {/* CTAボタン */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link href="/quiz/1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#2196F3] hover:bg-[#1976D2] text-white font-bold py-4 px-12 rounded-full text-lg md:text-xl shadow-lg transition-all duration-300 min-w-[300px]"
            >
              診断を始める
            </motion.button>
          </Link>
        </motion.div>
      </main>
    </div>
  )
}