'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { questions } from '@/data/questions'
import { Suspense, useState } from 'react'
import { characterSlugs } from '@/data/characterSlugs'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

function GalleryContent() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  const typeKeys = Object.keys(genderedDiagramTypes.male) as Array<keyof typeof genderedDiagramTypes.male>
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            全16タイプ診断結果
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90"
          >
            あなたはどのタイプに当てはまりますか？
          </motion.p>
        </div>

        {/* 男女選択タブ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'male'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-blue-500 hover:bg-blue-50'
                }`}
              >
                👨 男性版
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'female'
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'text-pink-500 hover:bg-pink-50'
                }`}
              >
                👩 女性版
              </button>
            </div>
          </div>
        </motion.div>

        {/* タイプ一覧グリッド */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {typeKeys.map((typeCode, index) => {
            const type = genderedDiagramTypes[selectedGender][typeCode]
            
            // カードの背景色とテキスト色を決定
            let cardBgColor = 'bg-blue-200/50' // デフォルト
            let textColor = 'text-blue-600' // デフォルト
            const typeCodeStr = String(typeCode)
            if (typeCodeStr.startsWith('SR')) {
              cardBgColor = 'bg-green-200/50' // SR系統（緑）
              textColor = 'text-green-600'
            } else if (typeCodeStr.startsWith('SE')) {
              cardBgColor = 'bg-purple-200/50' // SE系統（紫）
              textColor = 'text-purple-600'
            } else if (typeCodeStr.startsWith('GR')) {
              cardBgColor = 'bg-red-400/60' // GR系統（赤）
              textColor = 'text-red-600'
            } else if (typeCodeStr.startsWith('GE')) {
              cardBgColor = 'bg-blue-200/50' // GE系統（青）
              textColor = 'text-blue-600'
            }
            
            return (
              <motion.div
                key={typeCode}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`${cardBgColor} rounded-2xl p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                <div className="bg-white rounded-xl p-4 shadow-sm"
              >
                {/* タイプコード - 小さく上部に表示 */}
                <div className="text-center pt-4 pb-2">
                  <h2 className={`text-lg font-bold ${textColor}`}>
                    {typeCode}
                  </h2>
                </div>

                {/* キャラクター絵文字 - 大きく中央に */}
                <div className="flex justify-center pb-4">
                  <motion.div
                    key={`${typeCode}-${selectedGender}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-5xl">
                      {type.emoji}
                    </span>
                  </motion.div>
                </div>

                <div className="px-4 pb-6 space-y-3">
                  {/* タイプ名 */}
                  <h3 className="text-sm font-bold text-[#333333] text-center leading-tight">
                    {type.name}
                  </h3>

                  {/* 基本生態（4行でキリよく） */}
                  <p className="text-sm text-[#666666] text-left leading-relaxed h-[6.5rem]">
                    {(() => {
                      const text = type.basicEcology
                      // 4行表示用の文字数制限（約60-80文字で4行）
                      if (text.length <= 80) return text
                      
                      // 「です」「ます」「。」で終わる位置を探す（60-80文字の範囲）
                      const cutPoints = []
                      for (let i = 60; i < Math.min(text.length, 80); i++) {
                        if (text.substring(i, i + 2) === 'です' || 
                            text.substring(i, i + 2) === 'ます' || 
                            text.charAt(i) === '。') {
                          cutPoints.push(text.charAt(i) === '。' ? i + 1 : i + 2)
                        }
                      }
                      
                      if (cutPoints.length > 0) {
                        return text.substring(0, cutPoints[0])
                      }
                      
                      // 見つからない場合は75文字で切って「。」を追加
                      return text.substring(0, 75) + '。'
                    })()}
                  </p>

                  {/* 詳細ボタン */}
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        // 該当タイプの結果を生成するためのスコアを計算
                        const typeCodeStr = String(typeCode)
                        
                        // 新しいdirection対応スコアリング
                        const answers = Array.from({ length: 24 }, (_, i) => {
                          const questionId = i + 1
                          const question = questions.find(q => q.id === questionId)
                          
                          if (!question) return { questionId, score: 1 } // 質問が見つからない場合のデフォルト
                          
                          let targetScore: number = 0
                          
                          // 各軸に対して目標とする方向を決定
                          if (questionId >= 1 && questionId <= 6) {
                            // SG軸: Sタイプなら正方向、Gタイプなら負方向
                            targetScore = typeCodeStr.startsWith('S') ? 3 : -3
                          } else if (questionId >= 7 && questionId <= 12) {
                            // RE軸: Rタイプなら正方向、Eタイプなら負方向
                            targetScore = typeCodeStr.charAt(1) === 'R' ? 3 : -3
                          } else if (questionId >= 13 && questionId <= 18) {
                            // FC軸: Fタイプなら正方向、Cタイプなら負方向
                            targetScore = typeCodeStr.charAt(2) === 'F' ? 3 : -3
                          } else if (questionId >= 19 && questionId <= 24) {
                            // QL軸: Qタイプなら正方向、Lタイプなら負方向
                            targetScore = typeCodeStr.charAt(3) === 'Q' ? 3 : -3
                          }
                          
                          // question.directionに基づいて実際の回答値を調整
                          let answerScore: number
                          if (question.direction === 'positive') {
                            // positive質問の場合、目標スコアそのまま
                            answerScore = targetScore
                          } else {
                            // negative質問の場合、目標スコアを逆転
                            answerScore = -targetScore
                          }
                          
                          return {
                            questionId,
                            score: answerScore
                          }
                        })
                        
                        localStorage.setItem('diet-quiz-answers', JSON.stringify(answers))
                        localStorage.setItem('user-gender', selectedGender)
                        localStorage.setItem('diet-quiz-result-type', String(typeCode))
                        window.location.href = '/result'
                      }}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-3 px-4 rounded-full transition-colors"
                    >
                      詳しく見る
                    </button>
                  </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* ホームに戻るボタン */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link href="/quiz/1">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-[#2196F3] font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5" />
              診断を始める
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}