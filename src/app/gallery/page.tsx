'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { diagramTypes } from '@/data/diagramTypes'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export default function GalleryPage() {
  const typeKeys = Object.keys(diagramTypes) as Array<keyof typeof diagramTypes>
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#87CEEB] via-[#B0E0E6] to-[#98E4E8] ${notoSansJP.className}`}>
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

        {/* タイプ一覧グリッド */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
        >
          {typeKeys.map((typeCode, index) => {
            const type = diagramTypes[typeCode]
            return (
              <motion.div
                key={typeCode}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* キャラクター画像 */}
                <div className="flex justify-center pt-4 pb-2">
                  <Image
                    src={`/characters/${typeCode}_new3.png`}
                    alt={`${type.name}のキャラクター`}
                    width={160}
                    height={190}
                    className="w-32 h-auto rounded-lg drop-shadow-md"
                    quality={95}
                  />
                </div>

                <div className="p-4 space-y-3">
                  {/* タイプコード */}
                  <div className="text-center">
                    <span className="inline-block bg-[#2196F3] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {typeCode}
                    </span>
                  </div>

                  {/* タイプ名 */}
                  <h3 className="text-lg font-bold text-[#333333] text-center">
                    {type.name}
                  </h3>

                  {/* キャッチコピー */}
                  <p className="text-sm text-[#2196F3] font-medium text-center leading-relaxed">
                    {type.catchcopy}
                  </p>

                  {/* 基本生態（短縮版） */}
                  <p className="text-xs text-[#666666] text-center leading-relaxed line-clamp-3">
                    {type.basicEcology.substring(0, 80)}...
                  </p>

                  {/* 詳細ボタン */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        // 該当タイプの結果を生成するためのスコアを計算
                        const typeCodeStr = String(typeCode)
                        
                        // スコアリング: 質問1-5(SG軸), 6-10(RE軸), 11-15(FC軸), 16-20(QL軸)
                        // 正の値なら前者(S,R,F,Q)、負の値なら後者(G,E,C,L)
                        const answers = Array.from({ length: 20 }, (_, i) => {
                          const questionId = i + 1
                          let score = 1 // デフォルト値
                          
                          // 各軸に対して正しいスコアを設定
                          if (questionId >= 1 && questionId <= 5) {
                            // SG軸: Sタイプなら正、Gタイプなら負
                            score = typeCodeStr.startsWith('S') ? 2 : -2
                          } else if (questionId >= 6 && questionId <= 10) {
                            // RE軸: Rタイプなら正、Eタイプなら負
                            score = typeCodeStr.charAt(1) === 'R' ? 2 : -2
                          } else if (questionId >= 11 && questionId <= 15) {
                            // FC軸: Fタイプなら正、Cタイプなら負
                            score = typeCodeStr.charAt(2) === 'F' ? 2 : -2
                          } else if (questionId >= 16 && questionId <= 20) {
                            // QL軸: Qタイプなら正、Lタイプなら負
                            score = typeCodeStr.charAt(3) === 'Q' ? 2 : -2
                          }
                          
                          return {
                            questionId,
                            score
                          }
                        })
                        
                        localStorage.setItem('diet-quiz-answers', JSON.stringify(answers))
                        window.location.href = '/result'
                      }}
                      className="w-full bg-[#4CAF50] hover:bg-[#45A049] text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      詳細を見る
                    </button>
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
          <Link href="/">
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