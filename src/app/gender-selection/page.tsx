'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Noto_Sans_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

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

    const answers = JSON.parse(savedAnswers)
    if (answers.length !== 24) {
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
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full"
        >
          
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              最後の質問です
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              あなたの性別を教えてください
            </p>
          </div>

          {/* 性別選択ボタン */}
          <div className="space-y-4">
            <motion.button
              onClick={() => handleGenderSelect('male')}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 text-xl font-bold rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 ${
                selectedGender === 'male' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              男性
            </motion.button>

            <motion.button
              onClick={() => handleGenderSelect('female')}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 text-xl font-bold rounded-full shadow-lg transition-all duration-300 disabled:opacity-50 ${
                selectedGender === 'female' 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
            >
              女性
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
                className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
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
                className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto"
              />
              <p className="text-gray-600 mt-2">診断結果を生成中...</p>
            </div>
          )}

        </motion.div>
        
      </div>
    </div>
  )
}