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
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-48 h-48 top-20 left-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-32 h-32 top-1/3 right-20" style={{animationDelay: '3s'}} />
      <div className="floating-orb orb-purple w-40 h-40 bottom-20 left-1/3" style={{animationDelay: '6s'}} />
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen relative z-10">
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="dark-card p-8 md:p-12 max-w-lg w-full"
        >
          
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-200 mb-4">
              <span className="neon-gold">最後</span>の質問です
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
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
              className={`w-full py-4 px-6 text-xl font-bold rounded-full transition-all duration-300 disabled:opacity-50 ${
                selectedGender === 'male' 
                  ? 'bg-neon-cyan-500 text-midnight-900 shadow-lg'
                  : 'glass-button text-neon-cyan-500 hover:bg-neon-cyan-500 hover:text-midnight-900'
              }`}
              style={selectedGender === 'male' ? {
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)'
              } : {}}
            >
              男性
            </motion.button>

            <motion.button
              onClick={() => handleGenderSelect('female')}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-4 px-6 text-xl font-bold rounded-full transition-all duration-300 disabled:opacity-50 ${
                selectedGender === 'female' 
                  ? 'bg-neon-pink-500 text-white shadow-lg'
                  : 'glass-button text-neon-pink-500 hover:bg-neon-pink-500 hover:text-white'
              }`}
              style={selectedGender === 'female' ? {
                boxShadow: '0 0 20px rgba(255, 0, 127, 0.6), 0 0 40px rgba(255, 0, 127, 0.3)'
              } : {}}
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
                className="w-full py-4 px-6 luxury-button text-white text-xl font-bold rounded-full transition-all duration-300 disabled:opacity-50"
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
                className="w-6 h-6 border-2 border-neon-pink-500 border-t-transparent rounded-full mx-auto"
                style={{
                  boxShadow: '0 0 10px rgba(255, 0, 127, 0.5)'
                }}
              />
              <p className="text-gray-400 mt-2">診断結果を生成中...</p>
            </div>
          )}

        </motion.div>
        
      </div>
    </div>
  )
}