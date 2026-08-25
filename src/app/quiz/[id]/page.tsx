'use client'

import { useState, useEffect } from 'react'
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

function loadSavedAnswers(): Answer[] {
  if (typeof window === 'undefined') return []

  try {
    const saved = localStorage.getItem('diet-quiz-answers')
    const parsed: unknown = saved ? JSON.parse(saved) : []
    return Array.isArray(parsed) ? parsed as Answer[] : []
  } catch {
    localStorage.removeItem('diet-quiz-answers')
    return []
  }
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const pageNumber = parseInt(params.id as string)
  const questionGroup = getQuestionGroupByPage(pageNumber)
  const totalPages = getTotalPages()
  
  const [savedAnswers, setSavedAnswers] = useState<Answer[]>(loadSavedAnswers)
  const [answers, setAnswers] = useState<{[key: number]: number}>(() => {
    const groupIds = new Set(questionGroup?.map(question => question.id) ?? [])
    return Object.fromEntries(
      loadSavedAnswers()
        .filter(answer => groupIds.has(answer.questionId))
        .map(answer => [answer.questionId, answer.score])
    )
  })
  const [isLoading, setIsLoading] = useState(false)
  
  // 診断開始時に前回の結果だけをクリアする
  useEffect(() => {
    if (pageNumber === 1) {
      localStorage.removeItem('diet-quiz-result-type')
    }
  }, [pageNumber])

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

  const handleNext = () => {
    // 全ての質問に回答されているかチェック
    const allAnswered = questionGroup.every(q => answers[q.id] !== undefined)
    if (!allAnswered) return

    setIsLoading(true)

    // 回答を保存
    const newAnswers = questionGroup.map(q => ({
      questionId: q.id,
      score: answers[q.id]
    }))
    
    const updatedAnswers = [
      ...savedAnswers.filter(a => !questionGroup.find(q => q.id === a.questionId)),
      ...newAnswers
    ]
    setSavedAnswers(updatedAnswers)
    localStorage.setItem('diet-quiz-answers', JSON.stringify(updatedAnswers))

    setTimeout(() => {
      if (pageNumber < totalPages) {
        router.push(`/quiz/${pageNumber + 1}`)
      } else {
        // 診断完了、性別選択ページへ
        router.push('/gender-selection')
      }
    }, 500)
  }

  const handleBack = () => {
    if (pageNumber > 1) {
      router.push(`/quiz/${pageNumber - 1}`)
    } else {
      router.push('/')
    }
  }

  if (!questionGroup) {
    return <div>ページが見つかりません</div>
  }

  const allAnswered = questionGroup.every(q => answers[q.id] !== undefined)

  return (
    <div className={`min-h-screen bg-[#fff8ee] text-[#211b18] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      {/* プログレスバー */}
      <div className="relative h-3 w-full border-b-2 border-[#211b18] bg-white">
        <motion.div
          className="h-full bg-[#ff6f91]"
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
            className="rounded-full border-2 border-[#211b18] bg-white p-2 shadow-[2px_2px_0_#211b18] transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-[#211b18]" />
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
                  <h3 className="text-left text-base font-bold leading-relaxed text-[#211b18] md:text-lg">
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
                              borderColor: '#211b18',
                              backgroundColor: isSelected ? '#56c9c1' : '#ffffff',
                              border: '2px solid #211b18'
                            } : {
                              borderColor: '#211b18',
                              backgroundColor: isSelected ? '#ff6f91' : '#ffffff',
                              border: '2px solid #211b18'
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
                              borderColor: '#211b18',
                              backgroundColor: isSelected ? '#56c9c1' : '#ffffff',
                              border: '2px solid #211b18'
                            } : {
                              borderColor: '#211b18',
                              backgroundColor: isSelected ? '#ff6f91' : '#ffffff',
                              border: '2px solid #211b18'
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
                whileHover={allAnswered ? { 
                  scale: 1.02,
                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)'
                } : {}}
                whileTap={allAnswered ? { scale: 0.98 } : {}}
                className={`w-full py-3 rounded-lg font-medium text-base transition-all duration-300 relative overflow-hidden ${
                  allAnswered
                    ? 'bg-[#ff6f91] text-white border-2 border-[#211b18] shadow-[4px_4px_0_#211b18]'
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed border-2 border-gray-600'
                }`}
                style={{}}
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
