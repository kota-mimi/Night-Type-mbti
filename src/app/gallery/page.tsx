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
  // 選択された性別に応じて適切なキーを使用
  const typeKeys = Object.keys(genderedDiagramTypes[selectedGender])
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            全16タイプ診断結果
          </h1>
          <p className="text-lg text-gray-600">
            あなたはどのタイプに当てはまりますか？
          </p>
        </div>

        {/* 男女選択タブ */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedGender === 'male'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-rose-500 hover:bg-rose-50'
                }`}
              >
                男性版
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-200 ${
                  selectedGender === 'female'
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'text-rose-500 hover:bg-rose-50'
                }`}
              >
                女性版
              </button>
            </div>
          </div>
        </div>

        {/* タイプ一覧グリッド */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {typeKeys.map((typeCode, index) => {
            // 選択された性別のキャラクターデータを使用
            const type = genderedDiagramTypes[selectedGender][typeCode]
            
            // 統一感のあるカードデザイン
            const cardBgColor = 'bg-gradient-to-br from-pink-50 to-rose-50'
            const textColor = 'text-rose-600'
            
            return (
              <motion.div
                key={typeCode}
                className={`${cardBgColor} rounded-2xl p-4 shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl border border-pink-100`}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                {/* タイプコード - 小さく上部に表示 */}
                <div className="text-center pt-4 pb-2">
                  <h2 className={`text-lg font-bold ${textColor}`}>
                    {typeCode}
                  </h2>
                </div>

                {/* キャラクター絵文字 - 大きく中央に */}
                <div className="flex justify-center pb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-rose-200 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-5xl">
                      {type.emoji}
                    </span>
                  </div>
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
                        
                        // Night Code対応スコアリング
                        const answers = Array.from({ length: 24 }, (_, i) => {
                          const questionId = i + 1
                          const question = questions.find(q => q.id === questionId)
                          
                          if (!question) return { questionId, score: 1 }
                          
                          let targetScore: number = 0
                          
                          // Night Code軸に対応した目標スコア設定
                          if (question.axis === 'AP') {
                            // AP軸: Aタイプなら正方向、Pタイプなら負方向
                            targetScore = typeCodeStr.charAt(0) === 'A' ? 3 : -3
                          } else if (question.axis === 'RF') {
                            // RF軸: Rタイプなら正方向、Fタイプなら負方向
                            targetScore = typeCodeStr.charAt(1) === 'R' ? 3 : -3
                          } else if (question.axis === 'TE') {
                            // TE軸: Tタイプなら正方向、Eタイプなら負方向
                            targetScore = typeCodeStr.charAt(2) === 'T' ? 3 : -3
                          } else if (question.axis === 'NC') {
                            // NC軸: Nタイプなら正方向、Cタイプなら負方向
                            targetScore = typeCodeStr.charAt(3) === 'N' ? 3 : -3
                          }
                          
                          // question.directionに基づいて実際の回答値を調整
                          let answerScore: number
                          if (question.direction === 'positive') {
                            answerScore = targetScore
                          } else {
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
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-medium py-3 px-4 rounded-full transition-colors duration-200"
                    >
                      詳しく見る
                    </button>
                  </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ホームに戻るボタン */}
        <div className="text-center">
          <Link href="/quiz/1">
            <button className="inline-flex items-center gap-2 bg-white text-rose-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
              <Home className="w-5 h-5" />
              診断を始める
            </button>
          </Link>
        </div>
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