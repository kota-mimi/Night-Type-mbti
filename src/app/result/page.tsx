'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Twitter, MessageSquare, Instagram, Download, Copy } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Noto_Sans_JP } from 'next/font/google'
import { getTypeFromAnswers } from '@/lib/scoring'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { Answer } from '@/types'
import { characterSlugs } from '@/data/characterSlugs'
import { getCharacterIdByCode, getCharacterById, getCompatibility, getDetailedCompatibilityReason } from '@/lib/characterMapping'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})


export default function ResultPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<string>('')
  const [userGender, setUserGender] = useState<'male' | 'female'>('male')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 性別情報を取得
    const savedGender = localStorage.getItem('user-gender') as 'male' | 'female'
    if (savedGender) {
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

    const answers: Answer[] = JSON.parse(savedAnswers)
    console.log("Parsed answers:", answers);
    console.log("Answers length:", answers.length);
    
    if (answers.length !== 24) {
      console.log("Invalid answers length, redirecting to home");
      router.push('/')
      return
    }

    console.log("Calling getTypeFromAnswers...");
    const typeCode = getTypeFromAnswers(answers)
    console.log("Received typeCode:", typeCode);
    
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

      // バナー画像のURLを取得
      const imageUrl = `/characters/${userType}_${userGender}_banner.png`
      
      // 画像をfetchしてblobに変換
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error('画像の取得に失敗しました')
      }
      
      const blob = await response.blob()
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
    alert('リンクをコピーしました！')
  }

  const handleRestart = () => {
    localStorage.removeItem('diet-quiz-answers')
    router.push('/quiz/1')
  }

  if (isLoading) {
    return (
      <div className={`bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16 ${notoSansJP.className}`}>
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
      <div className={`bg-[#111111] flex items-center justify-center min-h-[50vh] pt-16 ${notoSansJP.className}`}>
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
    <div className={`bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      {/* Removed floating orbs for flat design */}
      <div className="container mx-auto px-4 pt-8 pb-16 max-w-4xl relative z-10">
        
        {/* メインコンテンツカード */}
        <motion.div
          id="result-card"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="neon-card p-8 md:p-12"
        >
          
          {/* キャラクター画像とタイトル */}
          <div className="mb-16">
            {/* キャラクター絵文字を中央配置 */}
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="mb-6">
                  <Image 
                    src={`/characters/${userType}_${userGender}_banner.png`}
                    alt={`${typeData.name} Banner`}
                    width={600}
                    height={200}
                    className="border border-[#333333]"
                    onError={(e) => {
                      // フォールバックとしてテスト画像を表示
                      e.currentTarget.src = '/test_banner.png'
                    }}
                    priority
                  />
                </div>
              </div>
            </div>

          </div>

          {/* 【広告枠 A】画像と基本生態の間 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="text-center">
              <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4 max-w-md mx-auto">
                <div className="text-gray-500 text-xs mb-2">Advertisement</div>
                <div className="w-full h-24 bg-[#0A0A0A] border border-[#2A2A2A] rounded flex items-center justify-center">
                  <div className="text-gray-600 text-sm">Ad Space 320×100</div>
                </div>
              </div>
            </div>
          </motion.div>

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
                <div className="text-xs leading-relaxed text-[#AAAAAA] text-center max-w-md mx-auto">
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
                
                // 詳細な相性説明を取得
                const bestReason = getDetailedCompatibilityReason(userType, userGender, 'best');
                const worstReason = getDetailedCompatibilityReason(userType, userGender, 'worst');

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {/* 最高のパートナー */}
                    <div className="bg-[#1A1A1A] border border-green-500/30 rounded-lg p-6 relative overflow-hidden">
                      {/* 背景キャラクター画像 - 無効化 
                      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                        <div className="animate-bounce-slow">
                          {bestPartner?.code ? (
                            <img 
                              src={userGender === 'male' 
                                ? `/characters/${bestPartner.code}_character.png`
                                : `/characters/${bestPartner.code}_male_character.png`}
                              alt={bestPartner.name} 
                              className="w-32 h-32 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <span className="text-6xl" style={{display: bestPartner?.code ? 'none' : 'block'}}>
                            {bestPartner ? (genderedDiagramTypes[targetGender]?.[bestPartner.code]?.emoji || '💕') : '💕'}
                          </span>
                        </div>
                      </div>
                      */}
                      <div className="text-center space-y-3 relative">
                        <h3 className="text-lg font-bold text-green-400" style={{
                          textShadow: '0 0 10px rgba(34, 197, 94, 0.5)'
                        }}>最高のパートナー</h3>
                        <h4 className="text-lg font-bold text-gray-200">
                          {bestPartner?.name || '相性の良いタイプ'}
                        </h4>
                      </div>
                      <div className="text-sm leading-relaxed text-gray-300 mt-4 text-left">
                        <p>{bestReason || 'このタイプとの相性は抜群です。お互いの特性が補完し合い、素晴らしい関係を築くことができます。'}</p>
                      </div>
                    </div>

                    {/* 最悪の天敵 */}
                    <div className="bg-[#1A1A1A] border border-red-500/30 rounded-lg p-6 relative overflow-hidden">
                      {/* 背景キャラクター画像 - 無効化 
                      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                        <div className="animate-float">
                          {worstEnemy?.code ? (
                            <img 
                              src={userGender === 'male' 
                                ? `/characters/${worstEnemy.code}_character.png`
                                : `/characters/${worstEnemy.code}_male_character.png`}
                              alt={worstEnemy.name} 
                              className="w-32 h-32 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                                if (nextElement) nextElement.style.display = 'block';
                              }}
                            />
                          ) : null}
                          <span className="text-6xl" style={{display: worstEnemy?.code ? 'none' : 'block'}}>{worstEnemy ? (genderedDiagramTypes[targetGender]?.[worstEnemy.code]?.emoji || '⚠️') : '⚠️'}
                            {worstEnemy ? (genderedDiagramTypes[targetGender]?.[worstEnemy.code]?.emoji || '⚠️') : '⚠️'}
                          </span>
                        </div>
                      </div>
                      */}
                      <div className="text-center space-y-3 relative">
                        <h3 className="text-lg font-bold text-red-400" style={{
                          textShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                        }}>最悪の天敵</h3>
                        <h4 className="text-lg font-bold text-gray-200">
                          {worstEnemy?.name || '相性の悪いタイプ'}
                        </h4>
                      </div>
                      <div className="text-sm leading-relaxed text-gray-300 mt-4 text-left">
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

          {/* 【広告枠 B】ボタン下部 */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex justify-center"
          >
            <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 max-w-sm mx-auto">
              <div className="text-gray-500 text-xs mb-4 text-center">Advertisement</div>
              <div className="w-full h-64 bg-[#0A0A0A] border border-[#2A2A2A] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-600 text-sm mb-2">300×250</div>
                  <div className="text-gray-700 text-xs">Banner Ad Space</div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
        
      </div>
    </div>
  )
}