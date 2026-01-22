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
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-64 h-64 top-20 left-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-48 h-48 top-1/2 right-20" style={{animationDelay: '4s'}} />
      <div className="floating-orb orb-purple w-56 h-56 bottom-20 left-1/3" style={{animationDelay: '8s'}} />
      <div className="floating-orb orb-pink w-40 h-40 top-1/3 right-1/4" style={{animationDelay: '12s'}} />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
        
        {/* ヘッダー */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4" style={{
            textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'
          }}>
            全16タイプ診断結果
          </h1>
          <p className="text-lg text-gray-400">
            あなたはどのタイプに当てはまりますか？
          </p>
        </motion.div>

        {/* 男女選択タブ */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="glass-card p-2 border border-gray-600/30">
            <div className="flex">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'male'
                    ? 'luxury-button text-white'
                    : 'text-neon-cyan-400 hover:bg-cyan-500/10 hover:text-neon-cyan-300'
                }`}
              >
                男性版
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'female'
                    ? 'luxury-button text-white'
                    : 'text-neon-pink-400 hover:bg-pink-500/10 hover:text-neon-pink-300'
                }`}
              >
                女性版
              </button>
            </div>
          </div>
        </motion.div>

        {/* タイプ一覧グリッド */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          {typeKeys.map((typeCode, index) => {
            // 選択された性別のキャラクターデータを使用
            const type = genderedDiagramTypes[selectedGender][typeCode]
            
            return (
              <motion.div
                key={typeCode}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="glass-card p-6 border border-gray-600/30 hover:border-neon-cyan-500/50 transition-all duration-300 group"
                style={{
                  boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div className="relative">
                {/* タイプコード */}
                <div className="text-center mb-4">
                  <h2 className="text-lg font-bold neon-gold mb-2">
                    {typeCode}
                  </h2>
                </div>

                {/* キャラクター絵文字 */}
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-midnight-700 to-midnight-800 rounded-full flex items-center justify-center shadow-lg border border-gray-600 group-hover:border-neon-cyan-500/50 transition-all duration-300">
                    <span className="text-4xl animate-float">{type.emoji}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* タイプ名 */}
                  <h3 className="text-base font-bold text-gray-200 text-center leading-tight group-hover:text-neon-cyan-300 transition-colors duration-300">
                    {type.name}
                  </h3>

                  {/* 基本生態 */}
                  <p className="text-sm text-gray-400 text-left leading-relaxed h-[5.5rem] overflow-hidden group-hover:text-gray-300 transition-colors duration-300">
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
                  <div className="pt-2">
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
                      className="w-full luxury-button text-white text-sm font-medium py-3 px-4 rounded-full transition-all duration-300 group-hover:scale-105"
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
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <Link href="/quiz/1">
            <button className="inline-flex items-center gap-2 luxury-button text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105">
              <Home className="w-5 h-5" />
              診断を始める
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-midnight-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-neon-pink-500 border-t-transparent rounded-full"
          style={{
            boxShadow: '0 0 10px rgba(255, 0, 127, 0.5)'
          }}
        />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}