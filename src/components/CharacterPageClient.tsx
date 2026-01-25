'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, ArrowRight, Twitter, MessageSquare } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { genderedDiagramTypes } from '@/data/diagramTypes'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

interface Props {
  slug: string
  typeCode: string
}

export default function CharacterPageClient({ slug, typeCode }: Props) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  
  // 選択された性別に基づいてキャラクターデータを取得
  const character = genderedDiagramTypes[selectedGender][typeCode]
  
  if (!character) {
    return <div>キャラクターが見つかりません</div>
  }

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/character/${slug}`
    const shareText = `私のNight Typeは「${character.name}」でした！\n${character.catchcopy}\n\nあなたも診断してみて👇`
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    }

    window.open(urls[platform as keyof typeof urls], '_blank')
  }

  return (
    <div className={`min-h-screen bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* 性別選択タブ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="p-2 border border-gray-600/30 rounded-xl" style={{ backgroundColor: 'rgba(10, 10, 18, 0.95)' }}>
            <div className="flex">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'male'
                    ? 'bg-[#00FFFF] text-[#111111] border border-[#00FFFF]'
                    : 'text-[#00FFFF] hover:bg-[#1A1A1A] hover:text-[#66FFFF]'
                }`}
              >
                男性版
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'female'
                    ? 'bg-[#FF007F] text-white border border-[#FF007F]'
                    : 'text-[#FF007F] hover:bg-[#1A1A1A] hover:text-[#FF66B3]'
                }`}
              >
                女性版
              </button>
            </div>
          </div>
        </motion.div>

        {/* メインキャラクターカード */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6 mb-6"
        >
          {/* タイプコード */}
          <div className="text-center mb-4">
            <span className={`text-lg font-bold px-4 py-2 rounded-full ${
              selectedGender === 'male' 
                ? 'text-[#00FFFF] bg-[#00FFFF]/10 border border-[#00FFFF]/30' 
                : 'text-[#FF007F] bg-[#FF007F]/10 border border-[#FF007F]/30'
            }`}>
              {typeCode}
            </span>
          </div>

          {/* キャラクターバナー画像 */}
          <div className="mb-6">
            <Image 
              src={`/characters/${typeCode}_${selectedGender}_banner.png`}
              alt={character.name}
              width={600}
              height={200}
              className="w-full rounded-lg border border-[#333333]"
              onError={(e) => {
                e.currentTarget.src = '/test_banner.png'
              }}
            />
          </div>

          {/* 基本生態 */}
          {character.basicEcology && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-200 mb-3 text-center">基本生態</h3>
              <p className="text-gray-300 text-sm leading-relaxed text-center">
                {character.basicEcology}
              </p>
            </div>
          )}
        </motion.div>

        {/* 診断ボタン */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <Link href="/quiz/1">
            <button
              className={`w-full text-white font-bold py-4 px-8 rounded-full text-lg relative overflow-hidden border-2 transition-all duration-300 ${
                selectedGender === 'male'
                  ? 'border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                  : 'border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]'
              }`}
              style={{
                background: selectedGender === 'male'
                  ? 'linear-gradient(135deg, #00FFFF 0%, #FF007F 50%, #00FFFF 100%)'
                  : 'linear-gradient(135deg, #FF007F 0%, #00FFFF 50%, #FF007F 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              あなたのNight Typeは何かな？
              <br />
              <span className="text-base">診断してみよう！</span>
            </button>
          </Link>
        </motion.div>

        {/* ホームに戻る */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-300">
              <Home className="w-5 h-5" />
              ホームに戻る
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
