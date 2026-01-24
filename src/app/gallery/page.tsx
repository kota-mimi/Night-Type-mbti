'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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

function CharacterImageWithFallback({ typeCode, name, index }: { typeCode: string; name: string; index: number }) {
  const [imageError, setImageError] = useState(false)
  
  if (imageError) {
    return (
      <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#333333] mx-auto mt-20">
        <span className="text-4xl animate-float">👑</span>
      </div>
    )
  }
  
  return (
    <div className="relative w-full aspect-[4/5] flex items-center justify-center overflow-hidden">
      <Image 
        src={`/characters/${typeCode}_gallery.png`}
        alt={name}
        width={400}
        height={500}
        sizes="(max-width: 768px) 300px, 400px"
        className="object-contain w-full h-full transition-all duration-300 md:character-popout"
        onError={() => setImageError(true)}
        priority={index < 4}
      />
    </div>
  )
}

function GalleryContent() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  // 選択された性別に応じて適切なキーを使用
  const typeKeys = Object.keys(genderedDiagramTypes[selectedGender])
  
  return (
    <div className={`bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-6xl relative z-10">
        
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
          <div className="p-2 border border-gray-600/30 rounded-xl" style={{ backgroundColor: 'rgba(10, 10, 18, 0.95)' }}>
            <div className="flex">
              <button
                onClick={() => setSelectedGender('male')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'male'
                    ? 'luxury-button text-white'
                    : 'text-[#00FFFF] hover:bg-[#1A1A1A] hover:text-[#66FFFF]'
                }`}
              >
                男性版
              </button>
              <button
                onClick={() => setSelectedGender('female')}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 ${
                  selectedGender === 'female'
                    ? 'luxury-button text-white'
                    : 'text-[#FF007F] hover:bg-[#1A1A1A] hover:text-[#FF66B3]'
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
                className="p-4 border border-gray-600/30 transition-all duration-300 group"
                style={{
                  backgroundColor: 'rgba(10, 10, 18, 0.95)',
                  borderRadius: '20px'
                }}
              >
                <div className="relative overflow-hidden">
                
                {/* キャラクター画像 - ポップアウト効果 */}
                <div className="relative mb-4 overflow-hidden">
                  {selectedGender === 'female' ? (
                    <div className="relative h-full flex items-end justify-center">
                      <CharacterImageWithFallback 
                        typeCode={typeCode}
                        name={type.name}
                        index={index}
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="w-24 h-24 bg-[#1A1A1A] rounded-full flex items-center justify-center border border-[#333333] group-hover:border-[#00FFFF] transition-all duration-300">
                        <span className="text-4xl animate-float">{type.emoji}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* タイプコード */}
                <div className="text-center mb-1">
                  <h2 className={`text-xl font-bold mb-1 ${
                    selectedGender === 'male' 
                      ? 'text-[#00FFFF]' 
                      : 'text-[#FF007F]'
                  }`}>
                    {typeCode}
                  </h2>
                </div>

                <div className="space-y-3 flex flex-col h-full">
                  {/* タイプ名 */}
                  <h3 className="text-base font-bold text-gray-200 text-center leading-tight transition-colors duration-300">
                    {type.name}
                  </h3>

                  {/* 基本生態 */}
                  <p className="text-sm text-gray-400 text-left leading-relaxed transition-colors duration-300 mb-4">
                    {type.basicEcology}
                  </p>

                  {/* 詳細ボタン */}
                  <div className="mt-auto pt-3">
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
                      className={`w-full text-white text-sm font-medium py-3 px-4 rounded-full transition-all duration-300 relative overflow-hidden ${
                        selectedGender === 'male' 
                          ? 'border border-[#00FFFF] hover:bg-[#222222] hover:-translate-y-1'
                          : 'border border-[#FF007F] hover:bg-[#222222] hover:-translate-y-1'
                      }`}
                      style={{
                        background: selectedGender === 'male' 
                          ? 'rgba(10, 30, 50, 0.9)' 
                          : 'rgba(40, 10, 30, 0.9)'
                      }}
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
      <div className="bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#FF007F] border-t-transparent rounded-full"
        />
      </div>
    }>
      <GalleryContent />
    </Suspense>
  )
}