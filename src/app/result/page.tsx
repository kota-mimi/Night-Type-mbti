'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Twitter, MessageSquare, Instagram, Download, Copy } from 'lucide-react'
import Image from 'next/image'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'
import { getTypeFromAnswers } from '@/lib/scoring'
import { diagramTypes } from '@/data/diagramTypes'
import { Answer } from '@/types'
import A8AffiliateBanner from '@/components/A8AffiliateBanner'
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
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // まずローカルストレージから直接タイプを確認
    const savedType = localStorage.getItem('diet-quiz-result-type')
    if (savedType && diagramTypes[savedType]) {
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
    const typeData = diagramTypes[userType]
    if (!typeData) return

    if (platform === 'instagram') {
      // Instagramの場合は画像共有機能を使用
      handleDownloadImage()
      return
    }

    // 一時的に診断結果ページに誘導（ドメイン移行中のため）
    const shareUrl = `${window.location.origin}/result`
    const shareText = `私のダイエットタイプは「${typeData.name}」でした${typeData.emoji}\n${typeData.catchcopy}\n\nあなたも診断してみて👇\n${shareUrl}\n\n#ダイエットキャラ診断16`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  }

  const handleLineMenuRequest = () => {
    const typeData = diagramTypes[userType]
    if (!typeData) return

    const menuText = `【${typeData.name}専用】ヘルシーくん利用希望\n\n診断結果：${userType}\nキャッチコピー：${typeData.catchcopy}\n\nLINEで使えるヘルシーくんを利用したいです！\n専用メニュー・記録機能について詳しく教えてください。`
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(menuText)}`
    window.open(lineUrl, '_blank')
  }

  const handleDownloadImage = async () => {
    try {
      const typeData = diagramTypes[userType]
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
    const typeData = diagramTypes[userType]
    if (!typeData) return
    // 一時的に診断結果ページに誘導（ドメイン移行中のため）
    const shareUrl = `${window.location.origin}/result`
    navigator.clipboard.writeText(shareUrl)
    alert('リンクをコピーしました！')
  }

  const handleRestart = () => {
    localStorage.removeItem('diet-quiz-answers')
    router.push('/quiz/1')
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
    <div className={`min-h-screen bg-gradient-to-b from-[#87CEEB] to-[#B0E0E6] ${notoSansJP.className}`}>
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
            {/* キャラクター画像を中央配置 */}
            <div className="flex justify-center items-center">
              {/* キャラクター画像 */}
              <div className="text-center">
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

            {/* 広告バナーエリア */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <div className="w-full max-w-lg">
                {/* 広告画像をここに配置 */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <Image
                    src="/ads/line-app-ad.png" // 作成予定の広告画像
                    alt="LINEアプリ広告"
                    width={500}
                    height={300}
                    className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      // LINE公式アカウントへ誘導
                      window.open('https://lin.ee/BCYVfcD', '_blank')
                    }}
                    quality={95}
                  />
                </div>
              </div>
            </motion.div>
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
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-bold text-red-700 text-center">
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
                <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 text-left">
                  {typeData.fatCause.split('。').map((sentence, index, array) => (
                    <p key={index} className="mb-4">
                      {sentence.trim()}
                      {index < array.length - 1 && sentence.trim() && '。'}
                    </p>
                  ))}
                </div>
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
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-base md:text-lg font-bold text-green-700 text-center">
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
                <div className="text-sm md:text-base leading-relaxed text-gray-700 space-y-4 text-left">
                  {typeData.solution.split('。').map((sentence, index, array) => (
                    <p key={index} className="mb-4">
                      {sentence.trim()}
                      {index < array.length - 1 && sentence.trim() && '。'}
                    </p>
                  ))}
                </div>
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
                <div className="bg-pink-50/90 backdrop-blur-sm rounded-lg p-6 border border-pink-200 relative overflow-hidden">
                  {/* 背景キャラクター画像 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <div className="animate-bounce-slow">
                      <Image
                        src={`/characters/${typeData.compatibility.good.type}_gallery.png`}
                        alt={`${diagramTypes[typeData.compatibility.good.type]?.name || typeData.compatibility.good.type}のキャラクター`}
                        width={200}
                        height={240}
                        className="w-32 h-auto"
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative">
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
                <div className="bg-purple-50/90 backdrop-blur-sm rounded-lg p-6 border border-purple-200 relative overflow-hidden">
                  {/* 背景キャラクター画像 */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                    <div className="animate-float">
                      <Image
                        src={`/characters/${typeData.compatibility.bad.type}_gallery.png`}
                        alt={`${diagramTypes[typeData.compatibility.bad.type]?.name || typeData.compatibility.bad.type}のキャラクター`}
                        width={200}
                        height={240}
                        className="w-32 h-auto"
                      />
                    </div>
                  </div>
                  <div className="text-center space-y-3 relative">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={`/character/${characterSlugs[userType]}`}
                className={`inline-block bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors font-bold shadow-lg text-lg ${notoSansJP.className}`}
              >
                詳細情報を見る
              </Link>
              <button
                onClick={handleRestart}
                className={`inline-block bg-[#2196F3] text-white px-8 py-3 rounded-full hover:bg-[#1976D2] transition-colors font-bold shadow-lg text-lg ${notoSansJP.className}`}
              >
                もう一度診断する
              </button>
            </div>
          </div>

          {/* A8アフィリエイトバナー */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <A8AffiliateBanner />
          </motion.div>

        </motion.div>
        
      </div>
    </div>
  )
}