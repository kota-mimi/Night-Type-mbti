'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { Lock, Eye, Heart, Target, Crown, Zap, ArrowLeft } from 'lucide-react'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { characterSlugs } from '@/data/characterSlugs'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function CharacterPremiumPage() {
  const params = useParams()
  const slug = params.slug as string
  const [userGender, setUserGender] = useState<'male' | 'female'>('male')
  const [isPurchased, setIsPurchased] = useState(false)
  const [characterCode, setCharacterCode] = useState<string>('')
  const [typeData, setTypeData] = useState<any>(null)

  useEffect(() => {
    // 性別情報を取得
    const savedGender = localStorage.getItem('user-gender') as 'male' | 'female'
    if (savedGender) {
      setUserGender(savedGender)
    }

    // キャラクターコードを取得
    const code = Object.keys(characterSlugs).find(key => characterSlugs[key] === slug)
    if (code) {
      setCharacterCode(code)
      const data = genderedDiagramTypes[savedGender || 'male'][code]
      setTypeData(data)
      
      // 購入状態をチェック
      const purchased = localStorage.getItem(`premium_${code}`)
      if (purchased === 'true') {
        setIsPurchased(true)
      }
    }
  }, [slug])

  const handlePurchase = async () => {
    // TODO: Stripe決済を実装
    console.log(`Stripe決済を開始... キャラクター: ${characterCode}`)
    // 仮の処理（後でStripe実装時に置き換え）
    alert('決済システムは実装中です')
  }

  if (!typeData) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">キャラクターが見つかりません</h1>
          <a href="/gallery" className="text-pink-600 hover:text-pink-700 underline">
            キャラクター一覧に戻る
          </a>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: <Eye className="w-8 h-8 text-pink-600" />,
      title: `${typeData.name}の裏性格完全解析`,
      description: 'このキャラクター専用の深層心理と隠された性癖を暴露',
      preview: `例：${typeData.name}は実は●●な性癖を...`,
      locked: '※詳細は17項目の専用分析でお見せします'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: `${typeData.name}専用攻略法`,
      description: 'このタイプ専用の落とし方からベッドテクニックまで',
      preview: `${typeData.name}の落とし方ステップ1：●●で興味を引く...`,
      locked: '※実践的な5ステップ攻略法を公開'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: `${typeData.name}との相性完全版`,
      description: 'このキャラクターとの詳細相性と具体的なテクニック',
      preview: `${typeData.name}は●●なので、こうアプローチすると...`,
      locked: '※相性理由と具体的なテクニックを全公開'
    }
  ]

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
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg mb-6 mx-auto">
              <span className="text-6xl">{typeData.emoji}</span>
            </div>
            <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-6 ${zenMaruGothic.className}`}>
              {typeData.name}攻略法解禁済み
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              このキャラクター専用の攻略法がご利用いただけます！<br/>
              診断結果ページで詳細をお楽しみください。
            </p>
            <div className="space-y-4">
              <a
                href={`/character/${slug}`}
                className="inline-block bg-yellow-500 text-white px-8 py-4 rounded-full hover:bg-yellow-600 transition-colors font-bold text-lg shadow-lg"
              >
                攻略法を見る
              </a>
              <br/>
              <a
                href="/gallery"
                className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                他のキャラクターも見る
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
        {/* ヘッダー */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg mb-6 mx-auto">
            <span className="text-8xl">{typeData.emoji}</span>
          </div>
          
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full mb-6">
            <Crown className="w-5 h-5 mr-2" />
            <span className="font-bold">専用攻略法</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-6 ${zenMaruGothic.className}`}>
            {typeData.name}<br className="md:hidden" />攻略法を完全解禁
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            このタイプ専用の<br className="md:hidden" />
            <span className="text-pink-600 font-bold">「裏性格」「攻略法」「相性テクニック」</span>を解禁
          </p>
        </motion.div>

        {/* 機能紹介 */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden"
            >
              <div className="text-center mb-6">
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
              
              {/* プレビューエリア */}
              <div className="bg-gray-50 rounded-lg p-4 relative">
                <p className="text-sm text-gray-700 mb-2">
                  {feature.preview}
                </p>
                
                {/* ぼかし効果 */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-500 font-medium">
                      {feature.locked}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 価格とCTA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl shadow-2xl p-8 md:p-12 text-center text-white"
        >
          <Zap className="w-12 h-12 mx-auto mb-6" />
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${zenMaruGothic.className}`}>
            {typeData.name}専用攻略法を解禁
          </h2>
          <p className="text-lg mb-8 opacity-90">
            このキャラクター専用の攻略法が永続的にご利用いただけます
          </p>
          
          <div className="mb-8">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              ¥300
            </div>
            <div className="text-lg opacity-80">
              キャラクター専用（永続利用）
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="bg-white text-pink-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-xl shadow-lg inline-flex items-center"
          >
            <Crown className="w-6 h-6 mr-2" />
            {typeData.name}攻略法を解禁する
          </button>
          
          <p className="text-sm mt-6 opacity-80">
            安全なStripe決済でお支払いいただけます
          </p>
        </motion.div>

        {/* 全機能版の案内 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h3 className={`text-2xl font-bold text-gray-800 mb-4 ${zenMaruGothic.className}`}>
            全16キャラクターの攻略法をお得に！
          </h3>
          <p className="text-gray-600 mb-6">
            すべてのキャラクターの攻略法を一度に解禁できます
          </p>
          <div className="flex justify-center items-center space-x-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 line-through">¥9,600</div>
              <div className="text-sm text-gray-500">個別購入時</div>
            </div>
            <div className="text-4xl text-pink-500">→</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-600">¥2,980</div>
              <div className="text-sm text-green-600 font-bold">約69%OFF！</div>
            </div>
          </div>
          <a
            href="/premium"
            className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-bold shadow-lg"
          >
            全機能版を見る
          </a>
        </motion.div>

      </div>
    </div>
  )
}