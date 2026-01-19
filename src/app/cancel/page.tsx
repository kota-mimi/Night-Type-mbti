'use client'

import { motion } from 'framer-motion'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { XCircle, ArrowLeft, Crown, Heart } from 'lucide-react'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function CancelPage() {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center"
        >
          {/* キャンセルアイコン */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <XCircle className="w-24 h-24 text-gray-400 mx-auto" />
          </motion.div>

          {/* メインメッセージ */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h1 className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 ${zenMaruGothic.className}`}>
              決済がキャンセルされました
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              お支払い手続きが中断されました
            </p>
            <p className="text-gray-500">
              ご不明な点がございましたら、お気軽にお問い合わせください。
            </p>
          </motion.div>

          {/* 逃した機能の再訴求 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 mb-8 border-2 border-pink-200"
          >
            <h2 className={`text-xl font-bold text-pink-800 mb-4 ${zenMaruGothic.className}`}>
              💔 逃してしまった特典
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left mb-4">
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
                  <div className="w-6 h-6 bg-pink-200 rounded-full flex items-center justify-center mr-3">
                    <Crown className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
            <div className="bg-pink-100 rounded-lg p-4">
              <p className="text-sm text-pink-800 font-medium">
                ⏰ これらの特典がたった¥2,980で永続利用できます
              </p>
            </div>
          </motion.div>

          {/* CTAボタン */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-4 mb-8"
          >
            <a
              href="/premium"
              className="inline-block bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all font-bold text-lg shadow-lg transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2 inline" />
              もう一度試してみる
            </a>
            <br />
            <a
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              ホームに戻る
            </a>
          </motion.div>

          {/* サポート情報 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="pt-6 border-t border-gray-200"
          >
            <p className="text-xs text-gray-500">
              決済でお困りの場合は、
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