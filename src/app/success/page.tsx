'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { Crown, CheckCircle, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function SuccessPage() {
  useEffect(() => {
    // プレミアム購入フラグを設定
    localStorage.setItem('isPremium', 'true')
    
    // 紙吹雪エフェクト
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ec4899', '#f43f5e', '#8b5cf6']
    })

    // 少し遅れてもう一度
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ec4899', '#f43f5e', '#8b5cf6']
      })
    }, 500)

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ec4899', '#f43f5e', '#8b5cf6']
      })
    }, 1000)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-b from-emerald-100 to-green-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* 成功アイコン */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative mx-auto w-24 h-24">
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -right-2"
              >
                <Crown className="w-8 h-8 text-yellow-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* メインメッセージ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 ${zenMaruGothic.className}`}>
              決済が完了しました！
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              プレミアム機能が解禁されました🎉
            </p>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full inline-flex items-center font-bold">
              <Crown className="w-5 h-5 mr-2" />
              プレミアム会員になりました
            </div>
          </motion.div>

          {/* 解禁された機能一覧 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-8"
          >
            <h2 className={`text-xl font-bold text-gray-800 mb-4 ${zenMaruGothic.className}`}>
              🔓 解禁された機能
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {[
                '💖 裏性格の完全解析',
                '🔥 夜の相性完全版',
                '🎯 タイプ別落とし方マニュアル',
                '✨ ベッドテクニック指南',
                '💝 256パターンの相性詳細',
                '👑 永続アクセス権'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAボタン */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-4"
          >
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-bold text-lg shadow-lg transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2 inline" />
              今すぐ攻略法を見る
            </a>
            <p className="text-sm text-gray-500">
              診断結果ページで詳細な攻略法をお楽しみください
            </p>
          </motion.div>

          {/* サポート情報 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-xs text-gray-500">
              ご質問がございましたら、
              <a href="/contact" className="text-pink-600 hover:text-pink-700 underline ml-1">
                お問い合わせページ
              </a>
              よりご連絡ください。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}