'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { getQuestionGroupByPage, getTotalPages } from '@/lib/questionGroups'
import { Answer } from '@/types'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const pageNumber = parseInt(params.id as string)
  const questionGroup = getQuestionGroupByPage(pageNumber)
  const totalPages = getTotalPages()
  
  const [answers, setAnswers] = useState<{[key: number]: number}>({})
  const [savedAnswers, setSavedAnswers] = useState<Answer[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // ローカルストレージから回答を取得・保存
  useEffect(() => {
    // 診断開始時（Page 1）で前回の結果をクリア
    if (pageNumber === 1) {
      localStorage.removeItem('diet-quiz-result-type')
    }
    
    const saved = localStorage.getItem('diet-quiz-answers')
    if (saved) {
      setSavedAnswers(JSON.parse(saved))
    }
  }, [])
  
  useEffect(() => {
    if (savedAnswers.length > 0) {
      localStorage.setItem('diet-quiz-answers', JSON.stringify(savedAnswers))
    }
  }, [savedAnswers])

  const progress = ((pageNumber - 1) / totalPages) * 100

  const handleAnswerSelect = (questionId: number, score: number) => {
    const newAnswers = {
      ...answers,
      [questionId]: score
    }
    setAnswers(newAnswers)
    
    // 現在の質問のインデックスを取得
    const currentIndex = questionGroup.findIndex(q => q.id === questionId)
    const nextIndex = currentIndex + 1
    
    // 次の質問がある場合、0.5秒後にスクロール
    if (nextIndex < questionGroup.length) {
      setTimeout(() => {
        const nextQuestionElement = document.getElementById(`question-${questionGroup[nextIndex].id}`)
        if (nextQuestionElement) {
          nextQuestionElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
        }
      }, 500)
    }
  }

  const handleNext = useCallback(() => {
    // 全ての質問に回答されているかチェック
    const allAnswered = questionGroup.every(q => answers[q.id] !== undefined)
    if (!allAnswered) return

    setIsLoading(true)

    // 回答を保存
    const newAnswers = questionGroup.map(q => ({
      questionId: q.id,
      score: answers[q.id]
    }))
    
    console.log("=== DEBUG: Quiz Page ===");
    console.log("Page:", pageNumber);
    console.log("Current answers for this page:", answers);
    console.log("New answers:", newAnswers);
    console.log("Existing saved answers:", savedAnswers);

    const updatedAnswers = [
      ...savedAnswers.filter(a => !questionGroup.find(q => q.id === a.questionId)),
      ...newAnswers
    ]
    console.log("Updated answers:", updatedAnswers);
    setSavedAnswers(updatedAnswers)

    setTimeout(() => {
      if (pageNumber < totalPages) {
        router.push(`/quiz/${pageNumber + 1}`)
      } else {
        // 診断完了、性別選択ページへ
        router.push('/gender-selection')
      }
    }, 500)
  }, [answers, questionGroup, savedAnswers, pageNumber, totalPages, router])

  const handleBack = useCallback(() => {
    if (pageNumber > 1) {
      router.push(`/quiz/${pageNumber - 1}`)
    } else {
      router.push('/')
    }
  }, [pageNumber, router])

  // キーボードショートカット
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key

      switch (key) {
        case 'Enter':
          // Enterキーで次へ
          const allAnswered = questionGroup.every(q => answers[q.id] !== undefined)
          if (allAnswered && !isLoading) {
            handleNext()
          }
          return
        case 'Backspace':
          // Backspaceで戻る
          handleBack()
          return
        default:
          return
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [answers, questionGroup, isLoading])

  if (!questionGroup) {
    return <div>ページが見つかりません</div>
  }

  const allAnswered = questionGroup.every(q => answers[q.id] !== undefined)

  return (
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-32 h-32 top-10 right-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-24 h-24 top-1/3 left-20" style={{animationDelay: '2s'}} />
      <div className="floating-orb orb-purple w-28 h-28 bottom-20 right-1/3" style={{animationDelay: '4s'}} />
      {/* プログレスバー */}
      <div className="w-full bg-midnight-800 h-3 relative">
        <motion.div
          className="h-full bg-[#FF007F]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={handleBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass-button p-2 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-gray-300" />
          </motion.button>
          
          <span className="text-gray-400 font-medium">
            ページ {pageNumber} / {totalPages}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={pageNumber}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* 質問リスト */}
            <div className="neon-card p-8 space-y-8">
              {questionGroup.map((question, index) => (
                <div key={question.id} id={`question-${question.id}`} className="space-y-4 scroll-mt-20">
                  <h3 className="text-base md:text-lg font-medium text-gray-200 text-left leading-relaxed">
                    {question.text}
                  </h3>

                  {/* 4段階スケール - モバイル最適化版 */}
                  <div className="w-full mx-auto py-4">
                    {/* スマホ用レイアウト */}
                    <div className="sm:hidden">
                      <div className="space-y-4">
                        {/* ボタン群 - スマホ用サイズ */}
                        <div className="flex justify-center gap-4">
                          {[2, 1, -1, -2].map((score, scoreIndex) => {
                            const isSelected = answers[question.id] === score
                            const size = scoreIndex === 0 || scoreIndex === 3 ? 'w-12 h-12' : 'w-10 h-10'
                            
                            const colorStyle = scoreIndex <= 1 ? {
                              borderColor: isSelected ? '#00FFFF' : '#00FFFF',
                              backgroundColor: isSelected ? '#00FFFF' : '#1A1A1A',
                              border: `1px solid ${isSelected ? '#00FFFF' : '#333333'}`
                            } : {
                              borderColor: isSelected ? '#FF007F' : '#FF007F', 
                              backgroundColor: isSelected ? '#FF007F' : '#1A1A1A',
                              border: `1px solid ${isSelected ? '#FF007F' : '#333333'}`
                            }
                            
                            return (
                              <motion.button
                                key={score}
                                onClick={() => handleAnswerSelect(question.id, score)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${size} rounded-full transition-all duration-300 border-2`}
                                style={colorStyle}
                              />
                            )
                          })}
                        </div>
                        
                        {/* ラベル */}
                        <div className="flex justify-between text-xs px-2">
                          <span className="neon-cyan font-medium">そう思う</span>
                          <span className="neon-pink font-medium">そう思わない</span>
                        </div>
                      </div>
                    </div>

                    {/* PC/タブレット用レイアウト */}
                    <div className="hidden sm:block">
                      <div className="space-y-4">
                        <div className="flex items-center justify-center gap-6">
                          <div className="flex items-center gap-3">
                          {[2, 1, -1, -2].map((score, scoreIndex) => {
                            const isSelected = answers[question.id] === score
                            const size = scoreIndex === 0 ? 'w-16 h-16' :
                                        scoreIndex === 1 ? 'w-12 h-12' :
                                        scoreIndex === 2 ? 'w-12 h-12' :
                                        'w-16 h-16'
                            
                            const colorStyle = scoreIndex <= 1 ? {
                              borderColor: isSelected ? '#00FFFF' : '#00FFFF',
                              backgroundColor: isSelected ? '#00FFFF' : '#1A1A1A',
                              border: `1px solid ${isSelected ? '#00FFFF' : '#333333'}`
                            } : {
                              borderColor: isSelected ? '#FF007F' : '#FF007F', 
                              backgroundColor: isSelected ? '#FF007F' : '#1A1A1A',
                              border: `1px solid ${isSelected ? '#FF007F' : '#333333'}`
                            }
                            
                            return (
                              <motion.button
                                key={score}
                                onClick={() => handleAnswerSelect(question.id, score)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className={`${size} rounded-full transition-all duration-300 border-2`}
                                style={colorStyle}
                              />
                            )
                          })}
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-sm px-8">
                          <span className="neon-cyan font-medium">そう思う</span>
                          <span className="neon-pink font-medium">そう思わない</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {index < questionGroup.length - 1 && (
                    <hr className="border-gray-600 my-6" />
                  )}
                </div>
              ))}
            </div>

            {/* 進捗インジケーター */}
            <div className="neon-card p-4 text-center">
              <div className="mb-3">
                <span className="text-gray-400 text-sm">
                  {Object.keys(answers).length} / {questionGroup.length}
                </span>
              </div>
              
              {/* 次へボタン */}
              <motion.button
                onClick={handleNext}
                disabled={!allAnswered || isLoading}
                whileHover={allAnswered ? { scale: 1.02 } : {}}
                whileTap={allAnswered ? { scale: 0.98 } : {}}
                className={`w-full py-3 rounded-lg font-medium text-base transition-all duration-300 ${
                  allAnswered
                    ? 'luxury-button text-white'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                  />
                ) : (
                  pageNumber < totalPages ? '次へ' : '次へ'
                )}
              </motion.button>

              {!allAnswered && (
                <div className="text-gray-500 text-xs mt-2">
                  全ての質問に回答してください
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}