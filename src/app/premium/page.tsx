'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { Lock, Eye, Heart, Target, Crown, Zap } from 'lucide-react'

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

  const features = [
    {
      icon: <Eye className="w-8 h-8 text-pink-600" />,
      title: '裏性格の完全解析',
      description: '表面では見えない、あなたの夜の本性を暴き出します',
      preview: '例：あなたは実は●●な性癖を...',
      locked: '※詳細は17項目の分析でお見せします'
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: '夜の相性完全版',
      description: '16タイプ全てとの詳細相性と攻略法を公開',
      preview: 'ARTN男性の場合：彼女は●●なので...',
      locked: '※相性理由とテクニックを全公開'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-600" />,
      title: '落とし方マニュアル',
      description: 'タイプ別の口説き方からベッドテクニックまで',
      preview: 'ステップ1：●●で興味を引く...',
      locked: '※実践的な5ステップ攻略法'
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
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        
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
            夜の攻略法を<br className="md:hidden" />完全解禁
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-medium">
            無料版では見られない<br className="md:hidden" />
            <span className="text-pink-600 font-bold">「裏性格」「完全攻略法」</span>を解禁
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
            今すぐ全機能を解禁
          </h2>
          <p className="text-lg mb-8 opacity-90">
            一度の購入で、すべての攻略法が永続的にご利用いただけます
          </p>
          
          <div className="mb-8">
            <div className="text-5xl md:text-6xl font-bold mb-2">
              ¥2,980
            </div>
            <div className="text-lg opacity-80">
              買い切り（永続利用）
            </div>
          </div>

          <button
            onClick={handlePurchase}
            className="bg-white text-pink-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-colors font-bold text-xl shadow-lg inline-flex items-center"
          >
            <Crown className="w-6 h-6 mr-2" />
            プレミアム版を解除する
          </button>
          
          <p className="text-sm mt-6 opacity-80">
            安全なStripe決済でお支払いいただけます
          </p>
        </motion.div>

        {/* 特典一覧 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className={`text-2xl font-bold text-gray-800 text-center mb-8 ${zenMaruGothic.className}`}>
            プレミアム会員の特典
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              '16タイプ全ての詳細攻略法',
              '裏性格の完全分析レポート',
              'タイプ別落とし方マニュアル',
              'ベッドテクニック指南',
              '相性詳細データ（256パターン）',
              '永続アクセス権（追加料金なし）'
            ].map((benefit, index) => (
              <div key={index} className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}