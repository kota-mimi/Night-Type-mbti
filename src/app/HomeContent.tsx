'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const shipporiMincho = Shippori_Mincho({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})


export default function HomeContent() {
  return (
    <>
      <style jsx global>{`
        @keyframes luxuryGlow {
          0%, 100% { box-shadow: 0 4px 20px rgba(139, 0, 255, 0.5), 0 0 30px rgba(255, 0, 127, 0.3); }
          50% { box-shadow: 0 6px 30px rgba(139, 0, 255, 0.7), 0 0 50px rgba(255, 0, 127, 0.5); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div 
        className={`relative overflow-hidden ${notoSansJP.className}`}
        style={{
          background: 'radial-gradient(circle at 50% 40%, #1a0b2e 0%, #000000 90%)',
          minHeight: '100vh'
        }}
      >
      {/* Ambient luxury particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B00FF] opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-[#FF007F] opacity-8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#00FFFF] opacity-5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      <main className="flex flex-col items-center text-center px-4 pt-8 pb-16 relative z-10">
        
        {/* メインコンテンツ */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          {/* タイトル */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${shipporiMincho.className}`}>
            <span className="text-[#FF007F]">Night</span>{' '}
            <span className="text-[#00FFFF]">Type</span>
          </h1>
          
          {/* サブタイトル */}
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`text-lg md:text-2xl mb-4 leading-relaxed ${shipporiMincho.className}`}
            style={{
              background: 'linear-gradient(135deg, #E6E6FA 0%, #DDA0DD 50%, #C0C0C0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            あなたの性格と、<span className="text-[#FF007F]">夜の過ごし方</span>が見つかる。
          </motion.h2>
          
          {/* 説明テキスト */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{
              color: '#B8B8B8',
              textShadow: '0 0 10px rgba(184, 184, 184, 0.3)'
            }}
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
              className="relative text-white font-bold py-4 px-16 rounded-full text-lg md:text-xl mb-16 overflow-hidden border-2 border-[#8B00FF] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #4B0082 0%, #8B00FF 50%, #FF007F 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite, luxuryGlow 2s ease-in-out infinite'
              }}
            >
              <span className="relative z-10">診断を始める</span>
            </motion.button>
          </Link>
        </motion.div>

        
      </main>
      </div>
    </>
  )
}