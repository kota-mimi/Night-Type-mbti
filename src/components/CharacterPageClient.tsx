'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Home } from 'lucide-react'
import { Noto_Sans_JP } from 'next/font/google'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { getChibiImagePath } from '@/data/chibiCharacters'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

interface Props {
  slug: string
  typeCode: string
  gender: 'male' | 'female'
}

export default function CharacterPageClient({ typeCode, gender }: Props) {
  // 指定された性別のキャラクターデータを取得
  const character = genderedDiagramTypes[gender][typeCode]
  
  if (!character) {
    return <div>キャラクターが見つかりません</div>
  }

  return (
    <div className={`min-h-screen bg-[#111111] relative overflow-hidden ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        
        {/* メインキャラクターカード */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-6 mb-6"
        >
          {/* タイプコード */}
          <div className="text-center mb-4">
            <span className={`text-lg font-bold px-4 py-2 rounded-full ${
              gender === 'male' 
                ? 'text-[#00FFFF] bg-[#00FFFF]/10 border border-[#00FFFF]/30' 
                : 'text-[#FF007F] bg-[#FF007F]/10 border border-[#FF007F]/30'
            }`}>
              {typeCode}
            </span>
          </div>

          {/* シェアしやすい新キャラクター画像 */}
          <div className="mb-6 overflow-hidden rounded-2xl border-2 border-[#333333] bg-[#fff8ee]">
            <Image 
              src={getChibiImagePath(typeCode, gender)}
              alt={character.name}
              width={600}
              height={600}
              className="w-full"
            />
          </div>

          <div className="text-center mb-7">
            <h1 className="text-3xl font-black text-white">{character.name}</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{character.catchcopy}</p>
          </div>

          {/* 基本生態 */}
          {character.basicEcology && (
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-200 mb-3 text-center">基本生態</h3>
              <p className="text-gray-300 text-sm leading-relaxed text-center">
                {character.basicEcology}
              </p>
            </div>
          )}
        </motion.div>


        {/* おすすめアイテムセクション */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <div className="max-w-md mx-auto">
            {/* セクション見出し */}
            <div className="text-center mb-6">
              <h2 className={`text-xl md:text-2xl font-bold mb-2 ${notoSansJP.className}`} style={{
                background: 'linear-gradient(135deg, #FF007F 0%, #00FFFF 50%, #9966FF 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(255, 0, 127, 0.3)'
              }}>
                おすすめのアイテム
              </h2>
              <p className="text-gray-400 text-sm">あなたにぴったりの商品</p>
            </div>

            {/* カードエリア */}
            <div className="grid grid-cols-1 gap-4">
              {/* Gender-specific Card */}
              <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4">
                <div className="flex flex-col h-full">
                  {/* ラベル */}
                  <div className="mb-3">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide text-black ${
                      gender === 'male' ? 'bg-[#00FFFF]' : 'bg-[#FF007F]'
                    }`}>
                      {gender === 'male' ? 'FOR MEN' : 'FOR WOMEN'}
                    </div>
                  </div>
                  
                  {/* ダブルボタン */}
                  <div className="space-y-2">
                    {/* DMM Button */}
                    <a
                      href={gender === 'male' 
                        ? "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Flist%2F%3D%2Flist_type%3Dmono%2Fsort%3Dranking%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"
                        : "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3Diroha%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#FF007F] text-[#FF007F] hover:border-[#E6006B] hover:text-[#E6006B]"
                    >
                      DMMで探す ➤
                    </a>
                    
                    {/* Amazon Button */}
                    <a
                      href={gender === 'male' ? "https://amzn.to/4k34pzM" : "https://amzn.to/4qLOvfF"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#00FFFF] text-[#00FFFF] hover:border-[#00CCCC] hover:text-[#00CCCC]"
                    >
                      Amazonで探す ➤
                    </a>
                  </div>
                </div>
              </div>

              {/* FOR COUPLES Card */}
              <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-4">
                <div className="flex flex-col h-full">
                  {/* ラベル */}
                  <div className="mb-3">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-[#9966FF] text-black">
                      FOR COUPLES
                    </div>
                  </div>
                  
                  {/* ダブルボタン */}
                  <div className="space-y-2">
                    {/* DMM Button */}
                    <a
                      href={gender === 'male' 
                        ? "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3D%25E3%2582%25AB%25E3%2583%2583%25E3%2583%2597%25E3%2583%25AB%25E5%2590%2591%25E3%2581%2591%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"
                        : "https://al.fanza.co.jp/?lurl=https%3A%2F%2Fwww.dmm.co.jp%2Fmono%2Fgoods%2F-%2Fsearch%2F%3D%2Fsearchstr%3D%25E3%2582%25AB%25E3%2583%2583%25E3%2583%2597%25E3%2583%25AB%2F&af_id=nighttype-001&ch=toolbar&ch_id=link"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#FF007F] text-[#FF007F] hover:border-[#E6006B] hover:text-[#E6006B]"
                    >
                      DMMで探す ➤
                    </a>
                    
                    {/* Amazon Button */}
                    <a
                      href={gender === 'male' ? "https://amzn.to/49NIBF2" : "https://amzn.to/4aaudFU"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 bg-transparent border border-[#00FFFF] text-[#00FFFF] hover:border-[#00CCCC] hover:text-[#00CCCC]"
                    >
                      Amazonで探す ➤
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 診断ボタン */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-8 mb-6"
        >
          <Link href="/quiz/1">
            <button
              className={`w-full text-white font-bold py-4 px-8 rounded-full text-lg relative overflow-hidden border-2 transition-all duration-300 ${
                gender === 'male'
                  ? 'border-[#00FFFF] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                  : 'border-[#FF007F] hover:shadow-[0_0_20px_rgba(255,0,127,0.4)]'
              }`}
              style={{
                background: gender === 'male'
                  ? 'linear-gradient(135deg, #00FFFF 0%, #FF007F 50%, #00FFFF 100%)'
                  : 'linear-gradient(135deg, #FF007F 0%, #00FFFF 50%, #FF007F 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite'
              }}
            >
              あなたのNight Typeは何かな？
              <br />
              <span className="text-base">診断してみよう！</span>
            </button>
          </Link>
        </motion.div>

        {/* ホームに戻る */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center"
        >
          <Link href="/">
            <button className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium transition-colors duration-300">
              <Home className="w-5 h-5" />
              ホームに戻る
            </button>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
