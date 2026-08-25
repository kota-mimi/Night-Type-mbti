'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Twitter, Instagram, Download, Copy } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { areAnswersValid, getTypeFromAnswers } from '@/lib/scoring'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { Answer } from '@/types'
import { characterSlugs } from '@/data/characterSlugs'
import { getCharacterById, getCompatibility, getDetailedCompatibilityReason } from '@/lib/characterMapping'
import { getChibiImagePath } from '@/data/chibiCharacters'
import html2canvas from 'html2canvas'
import { trackEvent } from '@/lib/analyticsEvents'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const compatibilityCutouts = new Set([
  'AFTN-female',
  'ARTC-female',
])

function getCompatibilityCutoutPath(typeCode: string, gender: 'male' | 'female') {
  const key = `${typeCode}-${gender}`
  return compatibilityCutouts.has(key) ? `/characters/cutout/${typeCode}_${gender}.png` : null
}

export default function ResultPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string>('')
  const [userGender, setUserGender] = useState<'male' | 'female'>('male')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 性別情報を取得
    const savedGender = localStorage.getItem('user-gender')
    if (savedGender === 'male' || savedGender === 'female') {
      setUserGender(savedGender)
    }

    // 新しい診断の場合は前回の結果をクリア
    localStorage.removeItem('diet-quiz-result-type')

    // タイプが保存されていない場合は従来の方法で計算
    const savedAnswers = localStorage.getItem('diet-quiz-answers')
    console.log("=== DEBUG: Result Page ===");
    console.log("savedAnswers (raw):", savedAnswers);
    
    if (!savedAnswers) {
      console.log("No saved answers found, redirecting to home");
      router.push('/')
      return
    }

    let answers: Answer[]
    try {
      answers = JSON.parse(savedAnswers) as Answer[]
    } catch {
      localStorage.removeItem('diet-quiz-answers')
      router.push('/')
      return
    }

    if (!Array.isArray(answers) || !areAnswersValid(answers)) {
      localStorage.removeItem('diet-quiz-answers')
      router.push('/quiz/1')
      return
    }

    const typeCode = getTypeFromAnswers(answers)
    trackEvent('quiz_complete', { type: typeCode, gender: savedGender || 'unknown' })

    try {
      const discovered = JSON.parse(localStorage.getItem('night-type-discovered-types') || '[]')
      const nextDiscovered = Array.isArray(discovered)
        ? Array.from(new Set([...discovered.filter((value): value is string => typeof value === 'string'), typeCode]))
        : [typeCode]
      localStorage.setItem('night-type-discovered-types', JSON.stringify(nextDiscovered))
    } catch {
      localStorage.setItem('night-type-discovered-types', JSON.stringify([typeCode]))
    }
    
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
      trackEvent('result_share', { platform: 'instagram', type: userType })
      // Instagramの場合は画像共有機能を使用
      handleDownloadImage()
      return
    }

    trackEvent('result_share', { platform, type: userType })

    // キャラクター個別ページのURLを生成
    const characterKey = `${userType}-${userGender}`
    const characterSlug = characterSlugs[characterKey]
    const shareUrl = `${window.location.origin}/character/${characterSlug}`
    const shareText = `私のNight Typeは「${typeData.name}」でした！\n${typeData.catchcopy}\n\nあなたも診断してみて👇`
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank')
  }

  const handleDownloadImage = async () => {
    try {
      const typeData = genderedDiagramTypes[userGender][userType]
      if (!typeData) {
        alert('エラー: 診断結果が見つかりません。')
        return
      }

      const shareCard = document.getElementById('share-card')
      if (!shareCard) throw new Error('シェアカードが見つかりません')
      const canvas = await html2canvas(shareCard, { scale: 2, backgroundColor: '#fff8ee', useCORS: true })
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((value) => value ? resolve(value) : reject(new Error('画像変換に失敗しました')), 'image/png')
      })
      const file = new File([blob], `${typeData.name}.png`, { type: 'image/png' })

      // Web Share API対応チェック
      if (navigator.share) {
        // キャラクター個別ページのURLを生成
        const characterKey = `${userType}-${userGender}`
        const characterSlug = characterSlugs[characterKey]
        const shareUrl = `${window.location.origin}/character/${characterSlug}`
        const shareData = {
          title: `私のNight Typeは「${typeData.name}」`,
          text: `${typeData.catchcopy}\n\nNight Typeで診断してみて！\n${shareUrl}`,
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
    const characterKey = `${userType}-${userGender}`
    const characterSlug = characterSlugs[characterKey]
    const shareUrl = `${window.location.origin}/character/${characterSlug}`
    navigator.clipboard.writeText(shareUrl)
    trackEvent('result_share', { platform: 'copy', type: userType })
    alert('リンクをコピーしました！')
  }

  const handleRestart = () => {
    localStorage.removeItem('diet-quiz-answers')
    router.push('/quiz/1')
  }

  if (isLoading) {
    return (
      <div className={`result-page bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16 ${notoSansJP.className}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-[#FF007F] border-t-transparent rounded-full"
        />
      </div>
    )
  }


  // 適切な性別のデータを使用
  const typeData = genderedDiagramTypes[userGender][userType]
  
  if (!typeData) {
    return (
      <div className={`result-page bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16 ${notoSansJP.className}`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-200 mb-4">エラーが発生しました</h1>
          <button
            onClick={handleRestart}
            className="luxury-button text-white px-6 py-3 rounded-full font-bold transition-all"
          >
            最初からやり直す
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`result-page bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl relative z-10">
        
        {/* メインコンテンツカード */}
        <motion.div
          id="result-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="result-report"
        >
          
          {/* SNSにそのまま保存できる診断カード */}
          <div id="share-card" className="mb-16 overflow-hidden rounded-[32px] border-2 border-[#211b18] bg-[#fff8ee] text-[#211b18] shadow-[6px_6px_0_#211b18]">
            <div className="relative aspect-square w-full max-w-[620px] mx-auto">
              <Image src={getChibiImagePath(userType, userGender)} alt={typeData.name} fill sizes="620px" className="object-cover" priority />
              <div className="absolute left-5 top-5 rounded-full border-2 border-[#211b18] bg-white px-4 py-2 text-sm font-black shadow-[2px_2px_0_#211b18]">NIGHT TYPE · {userType}</div>
            </div>
            <div className="px-6 pb-8 text-center">
              <p className="text-xs font-black tracking-[0.25em] text-[#e4557f] mb-2">YOUR NIGHT CHARACTER</p>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{typeData.name}</h1>
              <p className="mt-4 text-sm md:text-base font-bold leading-relaxed text-[#6f625b]">{typeData.catchcopy}</p>
              <p className="mt-5 text-xs font-black">night-type.net</p>
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
              <h2 className={`text-2xl font-bold text-[#00FFFF] text-center`}>
                夜の生態レポート
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.nightEcologyReport?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
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
              <h2 className={`text-2xl font-bold text-[#FF007F] text-center`}>
                あなたのエロさの正体
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.yourSexiness?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
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
              <h2 className={`text-2xl font-bold text-red-400 text-center`} style={{
                textShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
              }}>
                閲覧注意：本能のカルテ
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.instinctChart?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
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
              <h2 className={`text-2xl font-bold text-[#9966FF] text-center`} style={{
                textShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
              }}>
                夜の口癖・脳内
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.nightPhrase?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
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
              <h2 className={`text-2xl font-bold text-[#FF007F] text-center`}>
                事後の賢者タイム
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.afterTime?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SM診断セクション */}
          {typeData.sm_diagnosis && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="space-y-3"
            >
              <h2 className={`text-xl font-bold text-[#FF007F] text-center`}>
                SM診断
              </h2>
              <div className="neon-card p-4 border border-pink-500/30">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">脳内ドS度</h3>
                    <div className="text-2xl font-bold text-[#FF007F]">{typeData.sm_diagnosis.mind_s}%</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">肉体ドM度</h3>
                    <div className="text-2xl font-bold text-[#FF007F]">{typeData.sm_diagnosis.body_m}%</div>
                  </div>
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
              className="space-y-3"
            >
              <h2 className={`text-xl font-bold text-[#00FFFF] text-center`}>
                ステータス
              </h2>
              <div className="neon-card p-4 border border-cyan-500/30">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1">性欲</h3>
                    <div className="text-lg font-bold text-[#00FFFF]">{typeData.stats.libido}</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1">変態度</h3>
                    <div className="text-lg font-bold text-[#00FFFF]">{typeData.stats.hentai}</div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white mb-1">むっつり度</h3>
                    <div className="text-lg font-bold text-[#00FFFF]">{typeData.stats.muttsuri}</div>
                  </div>
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
              className="space-y-3"
            >
              <h2 className={`text-xl font-bold text-[#9966FF] text-center`} style={{
                textShadow: '0 0 10px rgba(168, 85, 247, 0.5)'
              }}>
                浮気分析
              </h2>
              <div className="neon-card p-4 border border-purple-500/30">
                <div className="text-center mb-3">
                  <div className="text-2xl font-bold text-[#9966FF] mb-1">{typeData.uwaki.percent}</div>
                  <div className="text-sm font-bold text-white">{typeData.uwaki.type}</div>
                </div>
                <div className="mx-auto max-w-md text-center text-sm font-medium leading-relaxed text-[#514741]">
                  <p>{typeData.uwaki.text}</p>
                </div>
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
              <h2 className={`text-2xl font-bold text-gray-300 text-center`}>
                基本生態
              </h2>
              <div className="text-sm md:text-base leading-relaxed text-gray-300 space-y-4 max-w-4xl mx-auto text-left">
                <div style={{ lineHeight: '1.8' }}>
                  {typeData.detailedEcology?.split('。').filter(sentence => sentence.trim()).reduce((acc: string[], sentence: string, index: number, array: string[]) => {
                    if (index % 2 === 0) {
                      const nextSentence = array[index + 1] || '';
                      acc.push(`${sentence.trim()}。${nextSentence ? ` ${nextSentence.trim()}。` : ''}`);
                    }
                    return acc;
                  }, []).map((paragraph: string, index: number) => (
                    <p key={index} className="mb-6 text-gray-300">{paragraph}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Night Type Selection - おすすめアイテムセクション */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="my-16"
          >
            <div className="max-w-5xl mx-auto">
              {/* セクション見出し */}
              <div className="text-center mb-8 md:mb-12">
                <h2 className={`text-2xl md:text-3xl font-black mb-4 text-[#352b52] ${notoSansJP.className}`}>
                  あなたの夜を、もう一歩快適に
                </h2>
                <p className="text-sm text-gray-400 max-w-xl mx-auto">結果を読んだあとに興味があれば。Night Type編集部が用途別に選びやすい入口だけをまとめました。</p>
              </div>

              {/* カードエリア - 性別判定による動的表示 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(() => {
                  const isMale = userGender === 'male';
                  
                  return (
                    <>
                      {/* Gender-specific Card (Left) */}
                      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 h-full">
                          <div className="flex flex-col h-full">
                            {/* アイコン・ラベル */}
                            <div className="mb-4">
                              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide text-black ${
                                isMale ? 'bg-[#00FFFF]' : 'bg-[#FF007F]'
                              }`}>
                                {isMale ? 'FOR MEN' : 'FOR WOMEN'}
                              </div>
                            </div>
                            
                            {/* ダブルボタン */}
                            <div className="space-y-2">
                              {/* Main Button - DMM */}
                              <a
                                href={isMale ? "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Flist%2F%3D%2Flist_type%3Dmono%2Fsort%3Dranking%2F&af_id=nighttype-001&ch=toolbar&ch_id=link" : "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3Diroha%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('affiliate_click', { store: 'dmm', audience: isMale ? 'men' : 'women', type: userType })}
                                className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#FF007F] text-[#FF007F] hover:border-[#E6006B] hover:text-[#E6006B]"
                              >
                                DMMで探す ➤
                              </a>
                              
                              {/* Sub Button - Amazon */}
                              <a
                                href={isMale ? "https://amzn.to/4k34pzM" : "https://amzn.to/4qLOvfF"}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('affiliate_click', { store: 'amazon', audience: isMale ? 'men' : 'women', type: userType })}
                                className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#00FFFF] text-[#00FFFF] hover:border-[#00CCCC] hover:text-[#00CCCC]"
                              >
                                Amazonで探す ➤
                              </a>
                            </div>
                          </div>
                      </div>

                      {/* COUPLES Card (Right) */}
                      <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 h-full">
                        <div className="flex flex-col h-full">
                          {/* アイコン・ラベル */}
                          <div className="mb-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#9966FF] text-black">
                              FOR COUPLES
                            </div>
                          </div>
                          
                          {/* ダブルボタン */}
                          <div className="space-y-2">
                            {/* Main Button - DMM */}
                            <a
                              href={isMale ? "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3D%25E3%2582%25AB%25E3%2583%2583%25E3%2583%2597%25E3%2583%25AB%25E5%2590%2591%25E3%2581%2591%2F&af_id=nighttype-001&ch=toolbar&ch_id=link" : "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3D%25E3%2582%25AB%25E3%2583%2583%25E3%2583%2597%25E3%2583%25AB%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackEvent('affiliate_click', { store: 'dmm', audience: 'couples', type: userType })}
                              className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#FF007F] text-[#FF007F] hover:border-[#E6006B] hover:text-[#E6006B]"
                            >
                              DMMで探す ➤
                            </a>
                            
                            {/* Sub Button - Amazon */}
                            <a
                              href={isMale ? "https://amzn.to/49NIBF2" : "https://amzn.to/4aaudFU"}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackEvent('affiliate_click', { store: 'amazon', audience: 'couples', type: userType })}
                              className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#00FFFF] text-[#00FFFF] hover:border-[#00CCCC] hover:text-[#00CCCC]"
                            >
                              Amazonで探す ➤
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
              <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">※ 広告・アフィリエイトリンクを含みます。購入者の追加負担はありません。</p>
            </div>
          </motion.div>

          {/* 相性チェックセクション */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="space-y-8"
          >
            <h2 className={`text-2xl font-bold text-[#FF007F] text-center`}>
              相性チェック
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {(() => {
                // 新しいマスター相性システムを使用
                const compatibility = getCompatibility(userType);
                if (!compatibility) {
                  return <div className="text-center text-gray-500">相性データを取得できませんでした</div>;
                }

                const targetGender = userGender === 'male' ? 'female' : 'male';
                const bestPartner = getCharacterById(compatibility.best, targetGender);
                const worstEnemy = getCharacterById(compatibility.worst, targetGender);
                const bestCutout = bestPartner?.code ? getCompatibilityCutoutPath(bestPartner.code, targetGender) : null;
                const worstCutout = worstEnemy?.code ? getCompatibilityCutoutPath(worstEnemy.code, targetGender) : null;
                
                // 詳細な相性説明を取得
                const bestReason = getDetailedCompatibilityReason(userType, userGender, 'best');
                const worstReason = getDetailedCompatibilityReason(userType, userGender, 'worst');

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* 最高のパートナー */}
                    <div className="relative min-h-[240px] overflow-hidden rounded-[24px] border-2 border-[#4f9f69] bg-[#eaf8ef] p-6 shadow-[4px_4px_0_#211b18]">
                      {bestCutout && (
                        <div className="pointer-events-none absolute -bottom-4 -right-3 h-48 w-48 opacity-45">
                          <Image src={bestCutout} alt="" fill sizes="192px" className="object-contain object-bottom" />
                        </div>
                      )}
                      <div className="relative space-y-3 text-left">
                        <h3 className="text-lg font-black text-[#287a45]">最高のパートナー</h3>
                        <h4 className="text-lg font-bold text-gray-200">
                          {bestPartner?.name || '相性の良いタイプ'}
                        </h4>
                      </div>
                      <div className={`relative mt-4 text-left text-sm font-medium leading-relaxed text-[#514741] ${bestCutout ? 'pr-16 sm:pr-24' : ''}`}>
                        <p>{bestReason || 'このタイプとの相性は抜群です。お互いの特性が補完し合い、素晴らしい関係を築くことができます。'}</p>
                      </div>
                    </div>

                    {/* 最悪の天敵 */}
                    <div className="relative min-h-[240px] overflow-hidden rounded-[24px] border-2 border-[#d06b75] bg-[#fff0f1] p-6 shadow-[4px_4px_0_#211b18]">
                      {worstCutout && (
                        <div className="pointer-events-none absolute -bottom-4 -right-3 h-48 w-48 opacity-45">
                          <Image src={worstCutout} alt="" fill sizes="192px" className="object-contain object-bottom" />
                        </div>
                      )}
                      <div className="relative space-y-3 text-left">
                        <h3 className="text-lg font-black text-[#b84251]">最悪の天敵</h3>
                        <h4 className="text-lg font-bold text-gray-200">
                          {worstEnemy?.name || '相性の悪いタイプ'}
                        </h4>
                      </div>
                      <div className={`relative mt-4 text-left text-sm font-medium leading-relaxed text-[#514741] ${worstCutout ? 'pr-16 sm:pr-24' : ''}`}>
                        <p>{worstReason || 'このタイプとは価値観や行動パターンが大きく異なるため、理解し合うのが難しい関係です。'}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
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
            <h3 className={`text-center text-gray-400 font-medium ${notoSansJP.className}`}>
              結果をシェアする
            </h3>
            
            {/* Horizontal Icon Row */}
            <div className="flex flex-row gap-4 justify-center">
              {/* Copy Link */}
              <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 glass-button text-gray-300 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center"
                title="リンクをコピー"
              >
                <Copy className="w-5 h-5" />
              </motion.button>

              {/* Instagram */}
              <motion.button
                onClick={() => handleShare('instagram')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-[#E4405F] hover:bg-[#C13584] text-white rounded-full border border-[#333333] transition-all duration-300 flex items-center justify-center"
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
                className="w-12 h-12 glass-button text-gray-300 hover:text-white rounded-full transition-all duration-300 flex items-center justify-center"
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
              className={`inline-block luxury-button text-white px-8 py-3 rounded-full transition-all font-bold text-lg ${notoSansJP.className}`}
            >
              もう一度診断する
            </button>
          </div>


        </motion.div>
        
      </div>
    </div>
  )
}
