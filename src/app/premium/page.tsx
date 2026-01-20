'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { Lock, Crown, Zap } from 'lucide-react'
import { characterSlugs } from '@/data/characterSlugs'
import { genderedDiagramTypes } from '@/data/diagramTypes'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function PremiumPage() {
  const [isPurchased, setIsPurchased] = useState(false)

  useEffect(() => {
    // プレミアム購入状態をチェック
    const premiumStatus = localStorage.getItem('isPremium')
    if (premiumStatus === 'true') {
      setIsPurchased(true)
    }
  }, [])

  const handlePurchase = async () => {
    // TODO: Stripe決済を実装
    console.log('Stripe決済を開始...')
    // 仮の処理（後でStripe実装時に置き換え）
    alert('決済システムは実装中です')
  }

  const handleCharacterPurchase = async (characterCode: string) => {
    // TODO: Stripe決済を実装
    console.log(`Stripe決済を開始... キャラクター: ${characterCode}`)
    // 仮の処理（後でStripe実装時に置き換え）
    alert('決済システムは実装中です')
  }

  // 32キャラクター全てのデータを取得
  const getAllCharacters = () => {
    const characters: Array<{
      code: string
      slug: string
      name: string
      emoji: string
      gender: 'male' | 'female'
      isPurchased: boolean
    }> = []

    Object.entries(characterSlugs).forEach(([code, slug]) => {
      const [gender, type] = code.split('-') as ['male' | 'female', string]
      const data = genderedDiagramTypes[gender]?.[type]
      
      if (data) {
        // サーバーサイドでは常にfalse、クライアントサイドで更新
        const isPurchased = typeof window !== 'undefined' 
          ? localStorage.getItem(`premium_${code}`) === 'true' 
          : false
        characters.push({
          code,
          slug,
          name: data.name,
          emoji: data.emoji,
          gender,
          isPurchased
        })
      }
    })

    return characters
  }

  const [allCharacters, setAllCharacters] = useState(getAllCharacters())

  useEffect(() => {
    // クライアントサイドで購入状況を更新
    setAllCharacters(getAllCharacters())
  }, [])

  if (isPurchased) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-green-100 to-emerald-100 ${notoSansJP.className}`}>
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
          >
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 ${zenMaruGothic.className}`}>
              プレミアム会員様
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              すべての機能がご利用いただけます！<br/>
              診断結果ページで詳細な攻略法をお楽しみください。
            </p>
            <a
              href="/"
              className="inline-block bg-yellow-500 text-white px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors font-bold text-lg shadow-lg"
            >
              診断に戻る
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        
        {/* ヘッダー */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full mb-6">
            <Crown className="w-5 h-5 mr-2" />
            <span className="font-bold">プレミアム限定</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-6 ${zenMaruGothic.className}`}>
            夜の攻略法を完全解禁
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            気になるキャラクター専用の攻略法を解禁しよう
          </p>
        </motion.div>

        {/* キャラクターカード一覧 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {allCharacters.map((character, index) => (
            <motion.div
              key={character.code}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white rounded-2xl shadow-lg p-4 relative overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center mb-3 mx-auto">
                  <span className="text-2xl">{character.emoji}</span>
                </div>
                <h3 className="text-xs font-bold text-gray-800 mb-1 line-clamp-2 min-h-[2rem]">
                  {character.name}
                </h3>
                <div className={`text-xs px-2 py-1 rounded-full mb-2 ${
                  character.gender === 'male' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-pink-100 text-pink-600'
                }`}>
                  {character.gender === 'male' ? '♂' : '♀'}
                </div>
                
                {character.isPurchased ? (
                  <div className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-bold mb-2">
                    ✓ 購入済み
                  </div>
                ) : (
                  <div className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs mb-2 relative">
                    <Lock className="w-3 h-3 inline mr-1" />
                    未解禁
                  </div>
                )}
                
                <div className="text-xs font-bold text-pink-600 mb-2">¥980</div>
                
                {character.isPurchased ? (
                  <a
                    href={`/character/${character.slug}`}
                    className="block w-full bg-green-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-green-600 transition-colors"
                  >
                    詳細を見る
                  </a>
                ) : (
                  <button
                    onClick={() => handleCharacterPurchase(character.code)}
                    className="w-full bg-pink-500 text-white py-2 rounded-lg text-xs font-bold hover:bg-pink-600 transition-colors"
                  >
                    解禁する
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 全キャラクター購入オファー */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white mb-8"
        >
          <Zap className="w-12 h-12 mx-auto mb-6" />
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${zenMaruGothic.className}`}>
            まとめて購入で超お得！
          </h2>
          <p className="text-lg mb-8 opacity-90">
            32キャラクター全ての攻略法が永続的にご利用いただけます
          </p>
          
          <div className="bg-white/20 rounded-lg p-4 mb-6">
            <p className="text-lg font-bold mb-2">🎯 32キャラクター分まとめて</p>
            <div className="flex justify-center items-center space-x-4">
              <div className="text-center">
                <div className="text-xl text-white/80 line-through">¥31,360</div>
                <div className="text-sm text-white/70">個別購入時</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="text-center">
                <div className="text-3xl font-bold">¥2,980</div>
                <div className="text-sm font-bold bg-yellow-400 text-gray-800 px-2 py-1 rounded">約91%OFF！</div>
              </div>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="bg-white text-pink-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-xl shadow-lg inline-flex items-center"
          >
            <Crown className="w-6 h-6 mr-2" />
            全キャラクター解禁
          </button>
          
          <p className="text-sm mt-6 opacity-80">
            安全なStripe決済でお支払いいただけます
          </p>
        </motion.div>

      </div>
    </div>
  )
}