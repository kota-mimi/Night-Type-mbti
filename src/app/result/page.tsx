'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Twitter, MessageSquare, Instagram, Download, Copy } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { getTypeFromAnswers } from '@/lib/scoring'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { Answer } from '@/types'
import { characterSlugs } from '@/data/characterSlugs'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function ResultPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string>('')
  const [userGender, setUserGender] = useState<'male' | 'female'>('male')
  const [isLoading, setIsLoading] = useState(true)
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  useEffect(() => {
    // 性別情報を取得
    const savedGender = localStorage.getItem('user-gender') as 'male' | 'female'
    if (savedGender) {
      setUserGender(savedGender)
    }

    // まずローカルストレージから直接タイプを確認
    const savedType = localStorage.getItem('diet-quiz-result-type')
    if (savedType && genderedDiagramTypes[savedGender || 'male'][savedType]) {
      setUserType(savedType)
      setIsLoading(false)
      return
    }

    // タイプが保存されていない場合は従来の方法で計算
    const savedAnswers = localStorage.getItem('diet-quiz-answers')
    if (!savedAnswers) {
      router.push('/')
      return
    }

    const answers: Answer[] = JSON.parse(savedAnswers)
    if (answers.length !== 24) {
      router.push('/')
      return
    }

    const typeCode = getTypeFromAnswers(answers)
    // Use setTimeout to avoid synchronous state update
    setTimeout(() => {
      setUserType(typeCode)
      setIsLoading(false)
    }, 0)
  }, [router])

  const handleShare = (platform: string) => {
    const typeData = genderedDiagramTypes[userGender][userType]
    if (!typeData) return

    if (platform === 'instagram') {
      // Instagramの場合は画像共有機能を使用
      handleDownloadImage()
      return
    }

    // キャラクター個別ページのURLを生成
    const characterSlug = characterSlugs[userType]
    const shareUrl = `${window.location.origin}/character/${characterSlug}`
    const shareText = `私のダイエットタイプは「${typeData.name}」でした${typeData.emoji}\n${typeData.catchcopy}\n\nあなたも診断してみて👇\n${shareUrl}\n\n#ダイエットキャラ診断16`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  }

  const handleLineMenuRequest = () => {
    const typeData = genderedDiagramTypes[userGender][userType]
    if (!typeData) return

    const menuText = `【${typeData.name}専用】ヘルシーくん利用希望\n\n診断結果：${userType}\nキャッチコピー：${typeData.catchcopy}\n\nLINEで使えるヘルシーくんを利用したいです！\n専用メニュー・記録機能について詳しく教えてください。`
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(menuText)}`
    window.open(lineUrl, '_blank')
  }

  const handleDownloadImage = async () => {
    try {
      const typeData = genderedDiagramTypes[userGender][userType]
      if (!typeData) {
        alert('エラー: 診断結果が見つかりません。')
        return
      }

      // キャラクター画像のURLを取得
      const imageUrl = `/characters/${userType}_new3.png`
      
      // 画像をfetchしてblobに変換
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error('画像の取得に失敗しました')
      }
      
      const blob = await response.blob()
      const file = new File([blob], `${typeData.name}.png`, { type: 'image/png' })

      // Web Share API対応チェック
      if (navigator.share) {
        // 一時的に診断結果ページに誘導（ドメイン移行中のため）
        const shareUrl = `${window.location.origin}/result`
        const shareData = {
          title: `私のダイエットタイプは「${typeData.name}」`,
          text: `${typeData.catchcopy}\n\nダイエットキャラ診断16で診断してみて！\n${shareUrl}`,
          files: [file]
        }

        // ファイル共有が可能かチェック
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
          return
        }
      }

      // Web Share API非対応またはファイル共有非対応の場合は画像ダウンロード
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${typeData.name}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      alert('画像をダウンロードしました！SNSアプリで共有してください。')

    } catch (error) {
      console.error('画像共有エラー:', error)
      alert('画像の共有に失敗しました。')
    }
  }

  const handleCopyLink = () => {
    const typeData = genderedDiagramTypes[userGender][userType]
    if (!typeData) return
    // キャラクター個別ページのURLを生成
    const characterSlug = characterSlugs[userType]
    const shareUrl = `${window.location.origin}/character/${characterSlug}`
    navigator.clipboard.writeText(shareUrl)
    alert('リンクをコピーしました！')
  }

  const handleRestart = () => {
    localStorage.removeItem('diet-quiz-answers')
    router.push('/quiz/1')
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex items-center justify-center ${notoSansJP.className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const handleUnlockPremium = async () => {
    setIsUnlocking(true)
    
    // 3秒間のローディング
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsUnlocking(false)
    setIsPremiumUnlocked(true)
    
    // プレミアムエリアまでスクロール
    setTimeout(() => {
      const premiumElement = document.getElementById('premium-section')
      if (premiumElement) {
        premiumElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const typeData = genderedDiagramTypes[userGender][userType]
  if (!typeData) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 flex items-center justify-center ${notoSansJP.className}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#333333] mb-4">エラーが発生しました</h1>
          <button
            onClick={handleRestart}
            className="bg-[#2196F3] text-white px-6 py-3 rounded-full font-bold hover:bg-[#1976D2] transition-colors"
          >
            最初からやり直す
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* メインコンテンツカード */}
        <motion.div
          id="result-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          
          {/* キャラクター画像とタイトル */}
          <div className="mb-16">
            {/* キャラクター絵文字を中央配置 */}
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-pink-100 to-rose-200 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <span className="text-8xl">{typeData.emoji}</span>
                </div>
                {/* キャラクター名 */}
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`text-3xl md:text-4xl font-bold text-gray-800 mb-4 ${zenMaruGothic.className}`}
                >
                  {typeData.name}
                </motion.h1>
                {/* キャッチコピー */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg md:text-xl text-gray-600 font-medium max-w-2xl mx-auto leading-relaxed"
                >
                  {typeData.catchcopy}
                </motion.p>
              </div>
            </div>

          </div>

          {/* セクションごとの直接配置 */}
          <div className="space-y-10">
          
          {/* 夜の生態レポートセクション */}
          {typeData.nightEcologyReport && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-gray-800 text-center ${zenMaruGothic.className}`}>
                夜の生態レポート
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-left">
                <p className="mb-4">{typeData.nightEcologyReport}</p>
              </div>
            </motion.div>
          )}

          {/* あなたのエロさの正体セクション */}
          {typeData.yourSexiness && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-pink-600 text-center ${zenMaruGothic.className}`}>
                あなたのエロさの正体
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-left">
                <p className="mb-4">{typeData.yourSexiness}</p>
              </div>
            </motion.div>
          )}

          {/* 閲覧注意：本能のカルテセクション */}
          {typeData.instinctChart && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-red-600 text-center ${zenMaruGothic.className}`}>
                閲覧注意：本能のカルテ
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-left">
                <p className="mb-4">{typeData.instinctChart}</p>
              </div>
            </motion.div>
          )}

          {/* 夜の口癖・脳内セクション */}
          {typeData.nightPhrase && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-purple-600 text-center ${zenMaruGothic.className}`}>
                夜の口癖・脳内
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-center">
                <p className="mb-4 font-medium text-purple-800">{typeData.nightPhrase}</p>
              </div>
            </motion.div>
          )}

          {/* 事後の賢者タイムセクション */}
          {typeData.afterTime && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-blue-600 text-center ${zenMaruGothic.className}`}>
                事後の賢者タイム
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-left">
                <p className="mb-4">{typeData.afterTime}</p>
              </div>
            </motion.div>
          )}

          {/* SM診断セクション */}
          {typeData.sm_diagnosis && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-3 border border-rose-300 rounded-lg p-4"
            >
              <h2 className={`text-xl font-bold text-rose-600 text-center ${zenMaruGothic.className}`}>
                SM診断
              </h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <h3 className="text-sm font-medium text-rose-700 mb-1">脳内ドS度</h3>
                  <div className="text-2xl font-bold text-rose-600">{typeData.sm_diagnosis.mind_s}%</div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-rose-700 mb-1">肉体ドM度</h3>
                  <div className="text-2xl font-bold text-rose-600">{typeData.sm_diagnosis.body_m}%</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ステータスセクション */}
          {typeData.stats && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-3 border border-pink-300 rounded-lg p-4"
            >
              <h2 className={`text-xl font-bold text-pink-600 text-center ${zenMaruGothic.className}`}>
                ステータス
              </h2>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <h3 className="text-xs font-medium text-pink-700 mb-1">性欲</h3>
                  <div className="text-lg font-bold text-pink-600">{typeData.stats.libido}</div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-pink-700 mb-1">変態度</h3>
                  <div className="text-lg font-bold text-pink-600">{typeData.stats.hentai}</div>
                </div>
                <div>
                  <h3 className="text-xs font-medium text-pink-700 mb-1">むっつり度</h3>
                  <div className="text-lg font-bold text-pink-600">{typeData.stats.muttsuri}</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 浮気分析セクション */}
          {typeData.uwaki && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="space-y-3 border border-rose-300 rounded-lg p-4"
            >
              <h2 className={`text-xl font-bold text-rose-600 text-center ${zenMaruGothic.className}`}>
                浮気分析
              </h2>
              <div className="text-center mb-3">
                <div className="text-2xl font-bold text-rose-600 mb-1">{typeData.uwaki.percent}</div>
                <div className="text-sm font-medium text-rose-700">{typeData.uwaki.type}</div>
              </div>
              <div className="text-xs leading-relaxed text-gray-600 text-center max-w-md mx-auto">
                <p>{typeData.uwaki.text}</p>
              </div>
            </motion.div>
          )}
          
          {/* フォールバック：基本生態セクション（Night Type項目がない場合） */}
          {!typeData.nightEcologyReport && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h2 className={`text-2xl font-bold text-gray-800 text-center ${zenMaruGothic.className}`}>
                基本生態
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 max-w-4xl mx-auto text-left">
                {typeData.detailedEcology.split('。').map((sentence, index, array) => (
                  <p key={index} className="mb-4">
                    {sentence.trim()}
                    {index < array.length - 1 && sentence.trim() && '。'}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* 相性チェックセクション */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-8"
          >
            <h2 className={`text-2xl font-bold text-pink-500 text-center ${zenMaruGothic.className}`}>
              相性チェック
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* 最高のパートナー */}
                <div className="bg-pink-50/90 backdrop-blur-sm rounded-lg p-6 border border-pink-200 relative overflow-hidden">
                  {/* 背景絵文字 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <div className="animate-bounce-slow">
                      <span className="text-6xl">
                        {genderedDiagramTypes[userGender === 'male' ? 'female' : 'male'][typeData.compatibility.good.type]?.emoji || '💕'}
                      </span>
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative">
                    <h3 className="text-lg font-bold text-pink-600">最高のパートナー</h3>
                    <h4 className="text-lg font-bold text-gray-800">
                      {genderedDiagramTypes[userGender === 'male' ? 'female' : 'male'][typeData.compatibility.good.type]?.name || typeData.compatibility.good.type}
                    </h4>
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700 mt-4 text-left">
                    {typeData.compatibility.good.reason.split('。').map((sentence, index, array) => (
                      <p key={index} className={index < array.length - 1 ? 'mb-2' : ''}>
                        {sentence.trim()}
                        {index < array.length - 1 && sentence.trim() && '。'}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 最悪の天敵 */}
                <div className="bg-red-50/90 backdrop-blur-sm rounded-lg p-6 border border-red-200 relative overflow-hidden">
                  {/* 背景キャラクター画像 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <div className="animate-float">
                      <span className="text-6xl">
                        {genderedDiagramTypes[userGender === 'male' ? 'female' : 'male'][typeData.compatibility.bad.type]?.emoji || '⚠️'}
                      </span>
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative">
                    <h3 className="text-lg font-bold text-red-600">最悪の天敵</h3>
                    <h4 className="text-lg font-bold text-gray-800">
                      {genderedDiagramTypes[userGender === 'male' ? 'female' : 'male'][typeData.compatibility.bad.type]?.name || typeData.compatibility.bad.type}
                    </h4>
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700 mt-4 text-left">
                    {typeData.compatibility.bad.reason.split('。').map((sentence, index, array) => (
                      <p key={index} className={index < array.length - 1 ? 'mb-2' : ''}>
                        {sentence.trim()}
                        {index < array.length - 1 && sentence.trim() && '。'}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          </div>

          {/* プレミアムセクション */}
          <motion.div
            id="premium-section"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="space-y-6 mt-8"
          >
            {!isPremiumUnlocked ? (
              /* ロック状態 */
              <div className="relative">
                {/* 仮のプレミアムコンテンツ（ぼかし） */}
                <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 relative overflow-hidden">
                  {/* ぼかしコンテンツ */}
                  <div className="filter blur-sm select-none pointer-events-none space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-400">🔍 深層心理プロファイル</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-yellow-300 font-bold mb-2">潜在性癖</h4>
                          <p className="text-gray-300 text-sm">あなたの奥底に眠る本当の願望...</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-yellow-300 font-bold mb-2">脳内麻薬</h4>
                          <p className="text-gray-300 text-sm">快楽を感じる瞬間の分析...</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-yellow-300 font-bold mb-2">夜の適職</h4>
                          <p className="text-gray-300 text-sm">あなたにぴったりの役割...</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg">
                          <h4 className="text-yellow-300 font-bold mb-2">NG行動</h4>
                          <p className="text-gray-300 text-sm">絶対にしてはいけないこと...</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-yellow-400">👑 運命の攻略ランキング</h3>
                      <div className="space-y-3">
                        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 p-4 rounded-lg">
                          <h4 className="text-white font-bold">🥇 1位: 最高の相手</h4>
                          <p className="text-yellow-100 text-sm">完全攻略法が記載...</p>
                        </div>
                        <div className="bg-gradient-to-r from-gray-600 to-gray-500 p-4 rounded-lg">
                          <h4 className="text-white font-bold">🥈 2位: 良好な相手</h4>
                          <p className="text-gray-200 text-sm">上手なアプローチ方法...</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-4 rounded-lg">
                          <h4 className="text-white font-bold">🥉 3位: 相性良い相手</h4>
                          <p className="text-orange-100 text-sm">効果的な戦略...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* オーバーレイ */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="text-center text-white space-y-6 max-w-md">
                      <div className="text-6xl">🔒</div>
                      <h2 className={`text-2xl font-bold text-yellow-400 ${zenMaruGothic.className}`}>
                        裏・性癖カルテ & 運命の攻略書
                      </h2>
                      <p className="text-lg font-medium">Premium</p>
                      <p className="text-red-300 text-sm bg-red-900 bg-opacity-50 rounded-lg px-4 py-2">
                        ⚠️ 閲覧注意：ここから先は、あなたの歪んだ本能が記述されています
                      </p>
                      
                      {!isUnlocking ? (
                        <motion.button
                          onClick={handleUnlockPremium}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg"
                        >
                          🗝️ 鍵を開けて本性を暴く
                        </motion.button>
                      ) : (
                        <div className="flex flex-col items-center space-y-4">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full"
                          />
                          <p className="text-yellow-300 font-medium">本能を解析中...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* アンロック状態 */
              <div className="bg-gradient-to-br from-black to-gray-900 rounded-2xl p-8 border-2 border-yellow-500">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className={`text-3xl font-bold text-yellow-400 mb-2 ${zenMaruGothic.className}`}>
                      🔓 裏・性癖カルテ & 運命の攻略書
                    </h2>
                    <p className="text-yellow-300">Premium Unlocked</p>
                  </div>

                  {/* プレミアムコンテンツ */}
                  {typeData.premium ? (
                    <div className="space-y-8">
                      {/* PART 1: 深層心理プロファイル */}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                          🔍 PART 1：あなたの本性（Deep Profile）
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-gray-800 p-6 rounded-lg border border-red-500">
                            <h4 className="text-red-400 font-bold mb-3 flex items-center">
                              ⚠️ 禁断の「潜在的性癖」
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {typeData.premium.deep_profile.潜在性癖}
                            </p>
                          </div>
                          <div className="bg-gray-800 p-6 rounded-lg border border-purple-500">
                            <h4 className="text-purple-400 font-bold mb-3 flex items-center">
                              💊 脳内麻薬（ドーパミン）スイッチ
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {typeData.premium.deep_profile.脳内麻薬}
                            </p>
                          </div>
                          <div className="bg-gray-800 p-6 rounded-lg border border-green-500">
                            <h4 className="text-green-400 font-bold mb-3 flex items-center">
                              🔞 あなたが輝く「夜の適職」
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {typeData.premium.deep_profile.夜の適職}
                            </p>
                          </div>
                          <div className="bg-gray-800 p-6 rounded-lg border border-red-500">
                            <h4 className="text-red-400 font-bold mb-3 flex items-center">
                              📉 あなたが「不能」になる瞬間
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {typeData.premium.deep_profile.NG行動}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* PART 2: 運命の相手 & 攻略法（Best 3）*/}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                          👑 PART 2：運命の相手 & 攻略法（Best 3）
                        </h3>
                        <div className="space-y-4">
                          {typeData.premium.ranking.best3.map((item, index) => {
                            const bgColors = [
                              'bg-gradient-to-r from-yellow-600 to-yellow-500',
                              'bg-gradient-to-r from-gray-600 to-gray-500',
                              'bg-gradient-to-r from-orange-600 to-orange-500'
                            ];
                            const medals = ['🥇', '🥈', '🥉'];
                            const oppositeGender = userGender === 'male' ? 'female' : 'male';
                            const targetData = genderedDiagramTypes[oppositeGender][item.type];
                            return (
                              <div key={item.rank} className={`${bgColors[index]} p-6 rounded-lg`}>
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-white font-bold text-lg">
                                    {medals[index]} 第{item.rank}位：{item.title}
                                  </h4>
                                  <div className="text-2xl">
                                    {targetData?.emoji || '💖'}
                                  </div>
                                </div>
                                <div className="text-white text-sm leading-relaxed">
                                  <div className="mb-3">
                                    <span className="font-bold">【{targetData?.name || item.title}】</span>
                                  </div>
                                  <p>{item.strategy}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* PART 3: 地雷・天敵リスト（Worst 3）*/}
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">
                          💀 PART 3：地雷・天敵リスト（Worst 3）
                        </h3>
                        <div className="space-y-4">
                          {typeData.premium.ranking.worst3.map((item, index) => {
                            const oppositeGender = userGender === 'male' ? 'female' : 'male';
                            const targetData = genderedDiagramTypes[oppositeGender][item.type];
                            return (
                              <div key={item.rank} className="bg-red-900/50 border border-red-500 p-6 rounded-lg">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="text-red-400 font-bold text-lg">
                                    💀 ワースト{item.rank}位：{item.title}
                                  </h4>
                                  <div className="text-2xl">
                                    {targetData?.emoji || '⚠️'}
                                  </div>
                                </div>
                                <div className="text-red-100 text-sm leading-relaxed">
                                  <div className="mb-3">
                                    <span className="font-bold">【{targetData?.name || item.title}】</span>
                                  </div>
                                  <p>{item.reason}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* プレミアムデータがない場合の表示 */
                    <div className="text-center text-gray-300 py-12 border-2 border-dashed border-gray-600 rounded-lg">
                      <div className="text-4xl mb-4">🚧</div>
                      <h3 className="text-xl font-bold mb-2">プレミアムデータ準備中</h3>
                      <p className="text-sm">
                        このキャラクターの深層プロファイルと攻略ランキングデータを準備しています。<br/>
                        近日追加予定です。
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>

        </motion.div>

        {/* Share Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 sm:mt-8 max-w-md mx-auto space-y-6"
        >
          
          {/* Share Section */}
          <div className="space-y-4">
            <h3 className={`text-center text-gray-600 font-medium ${notoSansJP.className}`}>
              結果をシェアする
            </h3>
            
            {/* Horizontal Icon Row */}
            <div className="flex flex-row gap-4 justify-center">
              {/* Copy Link */}
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                title="リンクをコピー"
              >
                <Copy className="w-5 h-5" />
              </motion.button>

              {/* Instagram */}
              <motion.button
                onClick={() => handleShare('instagram')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-r from-[#E4405F] via-[#C13584] to-[#833AB4] hover:opacity-90 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                title="Instagram Storyにシェア"
              >
                <Instagram className="w-5 h-5" />
              </motion.button>

              {/* X (Twitter) */}
              <motion.button
                onClick={() => handleShare('twitter')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-black hover:bg-gray-800 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                title="X (Twitter) にシェア"
              >
                <Twitter className="w-5 h-5" />
              </motion.button>

              {/* Download */}
              <motion.button
                onClick={handleDownloadImage}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                title="画像をダウンロード"
              >
                <Download className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* ボタンエリア */}
          <div className="text-center pt-8 space-y-4">
            <button
              onClick={handleRestart}
              className={`inline-block bg-[#2196F3] text-white px-8 py-3 rounded-full hover:bg-[#1976D2] transition-colors font-bold shadow-lg text-lg ${notoSansJP.className}`}
            >
              もう一度診断する
            </button>
          </div>

          {/* A8アフィリエイトバナー */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
          </motion.div>

        </motion.div>
        
      </div>
    </div>
  )
}