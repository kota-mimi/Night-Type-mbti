'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Twitter, MessageSquare, Instagram, Download } from 'lucide-react'
import Image from 'next/image'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { getTypeFromAnswers } from '@/lib/scoring'
import { diagramTypes } from '@/data/diagramTypes'
import { Answer } from '@/types'

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
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const savedAnswers = localStorage.getItem('diet-quiz-answers')
    if (!savedAnswers) {
      router.push('/')
      return
    }

    const answers: Answer[] = JSON.parse(savedAnswers)
    if (answers.length !== 20) {
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
    const typeData = diagramTypes[userType]
    if (!typeData) return

    const shareText = `私のダイエットタイプは「${typeData.name}」でした${typeData.emoji}\n${typeData.catchcopy}\n\nあなたも診断してみて👇\n${window.location.origin}\n\n#ダイエットタイプ診断`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(shareText)}`,
      instagram: shareText
    }

    if (platform === 'instagram') {
      navigator.clipboard.writeText(shareText)
      alert('シェア用テキストをコピーしました！Instagramに貼り付けてシェアしてください。')
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
    }
  }

  const handleLineMenuRequest = () => {
    const typeData = diagramTypes[userType]
    if (!typeData) return

    const menuText = `【${typeData.name}専用】ヘルシーくん利用希望\n\n診断結果：${userType}\nキャッチコピー：${typeData.catchcopy}\n\nLINEで使えるヘルシーくんを利用したいです！\n専用メニュー・記録機能について詳しく教えてください。`
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(menuText)}`
    window.open(lineUrl, '_blank')
  }

  const handleDownloadImage = () => {
    // 画像ダウンロード機能（将来的に実装）
    alert('画像ダウンロード機能は近日公開予定です！')
  }

  const handleRestart = () => {
    localStorage.removeItem('diet-quiz-answers')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] flex items-center justify-center ${notoSansJP.className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#2196F3] border-t-transparent rounded-full"
        />
      </div>
    )
  }

  const typeData = diagramTypes[userType]
  if (!typeData) {
    return (
      <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] flex items-center justify-center ${notoSansJP.className}`}>
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
    <div className={`min-h-screen ${notoSansJP.className}`} 
         style={{
           background: `
             linear-gradient(135deg, 
               rgba(135, 206, 235, 0.95) 0%, 
               rgba(176, 224, 230, 0.95) 25%,
               rgba(152, 228, 232, 0.95) 50%,
               rgba(176, 196, 222, 0.95) 75%,
               rgba(221, 160, 221, 0.95) 100%
             ),
             radial-gradient(circle at 30% 70%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 70% 30%, rgba(173, 216, 230, 0.3) 0%, transparent 50%),
             radial-gradient(circle at 50% 50%, rgba(240, 248, 255, 0.2) 0%, transparent 70%)
           `
         }}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        
        {/* メインコンテンツカード */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12"
        >
          
          {/* キャラクター画像とタイトル */}
          <div className="mb-16">
            {/* キャラクター画像とキャッチコピーを横並び */}
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* キャラクター画像 */}
              <div className="flex-shrink-0 text-center">
                {!imageError ? (
                  <Image
                    src={`/characters/${userType}_new3.png`}
                    alt={`${typeData.name}のキャラクター`}
                    width={640}
                    height={760}
                    className="w-full max-w-lg h-auto rounded-2xl"
                    quality={95}
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="text-6xl drop-shadow-xl sm:text-7xl md:text-8xl">{typeData.emoji}</div>
                )}
              </div>
              
            </div>
          </div>

          {/* セクションごとの直接配置 */}
          <div className="space-y-10">
          
          {/* 基本生態セクション */}
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

          {/* 太る原因セクション */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            <h2 className={`text-2xl font-bold text-red-600 text-center ${zenMaruGothic.className}`}>
              太る原因
            </h2>
            {/* サブタイトルと本文を横並び */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 md:w-1/4">
                <h3 className={`text-base font-bold text-red-700 whitespace-nowrap overflow-hidden text-ellipsis ${
                  (userType === 'SEFL' || userType === 'SECL') ? 'text-left' : 'text-center'
                }`}>
                  {
                    userType === 'SRFQ' ? '目標達成後の爆発（リバウンド）' :
                    userType === 'SRFL' ? 'ストレスの抱え込みすぎ' :
                    userType === 'SRCQ' ? '『ヘルシーなもの』の食べすぎ' :
                    userType === 'SRCL' ? '停滞期への過剰反応' :
                    userType === 'SEFQ' ? '買ったことで満足症候群' :
                    userType === 'SEFL' ? '『体にいいもの』なら太らないという誤解' :
                    userType === 'SECQ' ? '『明日からやる』の無限ループ' :
                    userType === 'SECL' ? '『最適な方法』を探しすぎて動けない' :
                    userType === 'GRFQ' ? '『付き合い』での飲み食い' :
                    userType === 'GRFL' ? '『ご褒美』の頻度が高い' :
                    userType === 'GRCQ' ? '無理な減量による反動' :
                    userType === 'GRCL' ? '『監督』ポジションへの安住' :
                    userType === 'GEFQ' ? '『やってみた動画』で満足' :
                    userType === 'GEFL' ? '『ご褒美スタバ』の常習化' :
                    userType === 'GECQ' ? '『頭でっかち』による行動不全' :
                    '自分への甘さが糖度120%'
                  }
                </h3>
              </div>
              <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-700 space-y-4 text-left">
                {typeData.fatCause.split('。').map((sentence, index, array) => (
                  <p key={index} className="mb-4">
                    {sentence.trim()}
                    {index < array.length - 1 && sentence.trim() && '。'}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* あなただけの痩せ方セクション */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className={`text-2xl font-bold text-green-600 text-center ${zenMaruGothic.className}`}>
              あなただけの痩せ方
            </h2>
            {/* サブタイトルと本文を横並び */}
            <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
              <div className="flex-shrink-0 md:w-1/4">
                <h3 className={`text-base font-bold text-green-700 whitespace-nowrap overflow-hidden text-ellipsis ${
                  (userType === 'GRFL' || userType === 'GEFQ' || userType === 'GECQ') ? 'text-left' : 'text-center'
                }`}>
                  {
                    userType === 'SRFQ' ? 'チートデイの『義務化』' :
                    userType === 'SRFL' ? '匿名アカウントでの発散' :
                    userType === 'SRCQ' ? '『ヘルシーくん』への完全服従' :
                    userType === 'SRCL' ? '『ヘルシーくん』での記録習慣' :
                    userType === 'SEFQ' ? '飽きる前提の『味変』戦略' :
                    userType === 'SEFL' ? '『見た目』の変化を楽しむ' :
                    userType === 'SECQ' ? '『夜だけ』管理法' :
                    userType === 'SECL' ? '『思考停止』の実践' :
                    userType === 'GRFQ' ? '『宣言』による退路遮断' :
                    userType === 'GRFL' ? '『料理教室』や『サークル』へ参加' :
                    userType === 'GRCQ' ? '『賭け』の要素を取り入れる' :
                    userType === 'GRCL' ? '『プレイヤー』に戻る宣言' :
                    userType === 'GEFQ' ? '『次々と乗り換える』サーキット' :
                    userType === 'GEFL' ? '『憧れの服』を先に買う' :
                    userType === 'GECQ' ? '『誰かに教える』ために実践する' :
                    '『ハードルを地面に埋める』'
                  }
                </h3>
              </div>
              <div className="flex-1 text-sm md:text-base leading-relaxed text-gray-700 space-y-4 text-left">
                {typeData.solution.split('。').map((sentence, index, array) => (
                  <p key={index} className="mb-4">
                    {sentence.trim()}
                    {index < array.length - 1 && sentence.trim() && '。'}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 相性チェックセクション */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-8"
          >
            <h2 className={`text-2xl font-bold text-pink-500 text-center ${zenMaruGothic.className}`}>
              相性チェック
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* 最高の相性 */}
                <div className="bg-pink-50 rounded-lg p-6 border border-pink-200">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-bold text-pink-600">最高の相性</h3>
                    <h4 className="text-lg font-bold text-gray-800">
                      {diagramTypes[typeData.compatibility.good.type]?.name || typeData.compatibility.good.type}
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

                {/* 要注意 */}
                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <div className="text-center space-y-3">
                    <h3 className="text-lg font-bold text-purple-600">要注意</h3>
                    <h4 className="text-lg font-bold text-gray-800">
                      {diagramTypes[typeData.compatibility.bad.type]?.name || typeData.compatibility.bad.type}
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

        </motion.div>

        {/* Love Character 64 スタイルボタンスタック */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 sm:mt-8 max-w-md mx-auto space-y-3 sm:space-y-4"
        >
          
          {/* Primary CTA - LINE専用メニュー */}
          <motion.button
            onClick={handleLineMenuRequest}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            animate={{ 
              scale: [1, 1.02, 1],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className={`w-full bg-[#06C755] hover:bg-[#05b04a] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${zenMaruGothic.className}`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-sm sm:text-base md:text-lg">ヘルシーくんを使ってみる（LINE無料）</span>
          </motion.button>

          {/* Secondary - Instagram Story */}
          <motion.button
            onClick={() => handleShare('instagram')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gradient-to-r from-[#E4405F] via-[#C13584] to-[#833AB4] hover:opacity-90 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${zenMaruGothic.className}`}
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm sm:text-base">Instagram Storyにシェア</span>
          </motion.button>

          {/* Tertiary - X (Twitter) */}
          <motion.button
            onClick={() => handleShare('twitter')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-black hover:bg-gray-800 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 ${zenMaruGothic.className}`}
          >
            <Twitter className="w-5 h-5" />
            <span className="text-sm sm:text-base">X (Twitter) にシェア</span>
          </motion.button>

          {/* Utility - 画像ダウンロード */}
          <motion.button
            onClick={handleDownloadImage}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-bold py-4 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${zenMaruGothic.className}`}
          >
            <Download className="w-5 h-5" />
            <span className="text-base">画像をダウンロード</span>
          </motion.button>

          {/* もう一度診断ボタン */}
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-full shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-6 ${notoSansJP.className}`}
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">もう一度診断する</span>
          </motion.button>

        </motion.div>
        
      </div>
    </div>
  )
}