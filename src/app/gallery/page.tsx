'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { diagramTypes } from '@/data/diagramTypes'
import { questions } from '@/data/questions'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { characterSlugs } from '@/data/characterSlugs'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

function GalleryContent() {
  const typeKeys = Object.keys(diagramTypes) as Array<keyof typeof diagramTypes>
  const searchParams = useSearchParams()
  const rawHighlightType = searchParams.get('highlight')
  const highlightType = rawHighlightType ? rawHighlightType.trim().toUpperCase() : null
  
  // デバッグログ
  console.log('🎯 Gallery rawHighlightType:', rawHighlightType)
  console.log('🎯 Gallery processed highlightType:', highlightType)
  console.log('📝 Available typeKeys:', typeKeys)
  console.log('🔍 All URL params:', Object.fromEntries(searchParams))
  
  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8">
        
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            {highlightType && diagramTypes[highlightType as keyof typeof diagramTypes] 
              ? `${diagramTypes[highlightType as keyof typeof diagramTypes].name}をシェアされました！`
              : '全16タイプ診断結果'
            }
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/90"
          >
            {highlightType && diagramTypes[highlightType as keyof typeof diagramTypes]
              ? 'あなたも同じタイプかも？ 診断してみましょう！'
              : 'あなたはどのタイプに当てはまりますか？'
            }
          </motion.p>
        </div>

        {/* タイプ一覧グリッド */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {typeKeys.map((typeCode, index) => {
            const type = diagramTypes[typeCode]
            // より厳密な比較（大文字小文字を統一）
            const isHighlighted = highlightType !== null && highlightType === String(typeCode).toUpperCase()
            
            // デバッグログ
            if (index < 5) { // 最初の5つログ出力
              console.log(`🔍 Checking ${typeCode}: highlightType="${highlightType}", String(typeCode)="${String(typeCode)}", isHighlighted=${isHighlighted}`)
            }
            
            // 特定のハイライト対象の場合は詳細ログ
            if (typeCode === 'GECL' || isHighlighted) {
              console.log(`🎯 SPECIAL CHECK for ${typeCode}: highlightType="${highlightType}", isHighlighted=${isHighlighted}`)
            }
            
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
            
            // ハイライト時の特別なスタイル
            if (isHighlighted) {
              cardBgColor = 'bg-gradient-to-r from-yellow-200/80 to-orange-200/80' 
              textColor = 'text-orange-700'
            }
            
            return (
              <motion.div
                key={typeCode}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`${cardBgColor} rounded-2xl p-4 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${isHighlighted ? 'ring-4 ring-yellow-400 ring-opacity-60 scale-110 shadow-2xl' : ''}`}
              >
                <div className="bg-white rounded-xl p-4 shadow-sm"
              >
                {/* タイプコード - 小さく上部に表示 */}
                <div className="text-center pt-4 pb-2">
                  <h2 className={`text-lg font-bold ${textColor}`}>
                    {typeCode}
                  </h2>
                </div>

                {/* キャラクター画像 - 大きく中央に */}
                <div className="flex justify-center pb-4">
                  <Image
                    src={`/characters/${typeCode === 'SRFQ' ? 'SRFQ_gallery.png' : typeCode === 'SECQ' ? 'SECQ_gallery.png' : typeCode === 'SEFL' ? 'SEFL_gallery.png' : typeCode === 'SRCL' ? 'SRCL_gallery.png' : typeCode === 'GEFQ' ? 'GEFQ_gallery.png' : typeCode === 'SRFL' ? 'SRFL_gallery.png' : typeCode === 'GRCQ' ? 'GRCQ_gallery.png' : typeCode === 'GEFL' ? 'GEFL_gallery.png' : typeCode === 'GECL' ? 'GECL_gallery.png' : typeCode === 'GECQ' ? 'GECQ_gallery.png' : typeCode === 'SRCQ' ? 'SRCQ_gallery.png' : typeCode === 'SEFQ' ? 'SEFQ_gallery.png' : typeCode === 'GRCL' ? 'GRCL_gallery.png' : typeCode === 'GRFQ' ? 'GRFQ_gallery.png' : typeCode === 'SECL' ? 'SECL_gallery.png' : typeCode === 'GRFL' ? 'GRFL_gallery.png' : typeCode + '_new3.png'}`}
                    alt={`${type.name}のキャラクター`}
                    width={160}
                    height={180}
                    className="w-36 h-auto"
                    quality={95}
                  />
                </div>

                <div className="px-4 pb-6 space-y-3">
                  {/* タイプ名 */}
                  <h3 className="text-sm font-bold text-[#333333] text-center leading-tight">
                    {type.name}
                  </h3>

                  {/* 基本生態（3行でキリよく） */}
                  <p className="text-sm text-[#666666] text-left leading-relaxed">
                    {(() => {
                      const text = type.basicEcology
                      // 3行表示用の文字数制限（約45-60文字で3行）
                      if (text.length <= 60) return text
                      
                      // 「です」「ます」「。」で終わる位置を探す（45-60文字の範囲）
                      const cutPoints = []
                      for (let i = 45; i < Math.min(text.length, 60); i++) {
                        if (text.substring(i, i + 2) === 'です' || 
                            text.substring(i, i + 2) === 'ます' || 
                            text.charAt(i) === '。') {
                          cutPoints.push(text.charAt(i) === '。' ? i + 1 : i + 2)
                        }
                      }
                      
                      if (cutPoints.length > 0) {
                        return text.substring(0, cutPoints[0])
                      }
                      
                      // 見つからない場合は55文字で切って「。」を追加
                      return text.substring(0, 55) + '。'
                    })()}
                  </p>

                  {/* 詳細ボタン */}
                  <div className="pt-3 space-y-2">
                    <Link 
                      href={`/character/${characterSlugs[typeCode]}`}
                      className="block w-full bg-[#2196F3] hover:bg-[#1976D2] text-white text-sm font-medium py-3 px-4 rounded-full transition-colors text-center"
                    >
                      詳しく見る
                    </Link>
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
                        window.location.href = '/result'
                      }}
                      className="w-full bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium py-2 px-4 rounded-full transition-colors"
                    >
                      診断結果で見る
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
      <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}