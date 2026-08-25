'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { areAnswersValid } from '@/lib/scoring'
import type { Answer } from '@/types'

export default function GenderSelectionPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)

  useEffect(() => {
    // 24問の回答が完了しているかチェック
    const savedAnswers = localStorage.getItem('diet-quiz-answers')
    if (!savedAnswers) {
      router.push('/')
      return
    }

    let answers: Answer[]
    try {
      answers = JSON.parse(savedAnswers) as Answer[]
    } catch {
      localStorage.removeItem('diet-quiz-answers')
      router.push('/quiz/1')
      return
    }

    if (!Array.isArray(answers) || !areAnswersValid(answers)) {
      router.push('/quiz/1')
      return
    }
  }, [router])

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender)
    // 性別情報を保存
    localStorage.setItem('user-gender', gender)
  }

  const handleViewResults = () => {
    setIsLoading(true)
    
    // 結果ページに遷移
    setTimeout(() => {
      router.push('/result')
    }, 500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fff8ee] text-[#211b18]">
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative z-10">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg rounded-[32px] border-2 border-[#211b18] bg-white p-8 shadow-[7px_7px_0_#211b18] md:p-12"
        >
          
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-[#ffd166] px-4 py-2 text-xs font-black"><Sparkles className="h-4 w-4" />LAST STEP</div>
            <h1 className="text-2xl font-black md:text-3xl mb-4">
              <span className="text-[#e4557f]">最後</span>の質問です
            </h1>
            <p className="text-lg font-bold text-[#6f625b] leading-relaxed">
              結果に表示するキャラクター版を選んでください
            </p>
            <p className="mt-2 text-sm font-medium text-[#8a7a71]">
              あなた自身の性別にかかわらず選べます
            </p>
          </div>

          {/* 性別選択ボタン */}
          <div className="space-y-4">
            <motion.button
              onClick={() => handleGenderSelect('male')}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full rounded-full border-2 border-[#211b18] px-6 py-4 text-xl font-black shadow-[4px_4px_0_#211b18] transition disabled:opacity-50 ${
                selectedGender === 'male' 
                  ? 'bg-[#56c9c1] text-[#211b18]'
                  : 'bg-[#fff8ee] text-[#211b18] hover:bg-[#dff7f4]'
              }`}
            >
              男性キャラ版
            </motion.button>

            <motion.button
              onClick={() => handleGenderSelect('female')}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full rounded-full border-2 border-[#211b18] px-6 py-4 text-xl font-black shadow-[4px_4px_0_#211b18] transition disabled:opacity-50 ${
                selectedGender === 'female' 
                  ? 'bg-[#ff6f91] text-white'
                  : 'bg-[#fff8ee] text-[#211b18] hover:bg-[#ffe1e8]'
              }`}
            >
              女性キャラ版
            </motion.button>
          </div>

          {/* 診断を見るボタン */}
          {selectedGender && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <motion.button
                onClick={handleViewResults}
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-6 py-4 text-xl font-black text-white shadow-[4px_4px_0_#211b18] transition hover:-translate-y-1 disabled:opacity-50"
              >
                診断を見る
              </motion.button>
            </motion.div>
          )}

          {isLoading && (
            <div className="text-center mt-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-[#FF007F] border-t-transparent rounded-full mx-auto"
              />
              <p className="mt-2 font-bold text-[#6f625b]">診断結果を生成中...</p>
            </div>
          )}

        </motion.div>
        
      </div>
    </div>
  )
}
