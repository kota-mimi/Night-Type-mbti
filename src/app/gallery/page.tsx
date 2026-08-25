'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { chibiCharacterArt, getChibiImagePath } from '@/data/chibiCharacters'

export default function GalleryPage() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const typeCodes = Object.keys(genderedDiagramTypes[selectedGender])

  return (
    <main className="min-h-screen bg-[#fff8ee] text-[#211b18] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#352b52] px-4 py-2 text-sm font-bold text-white mb-5">
            <Sparkles className="h-4 w-4 text-[#ffd166]" /> NIGHT TYPE COLLECTION
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Night Type図鑑</h1>
          <p className="text-[#6f625b] leading-relaxed">個性豊かな16タイプのキャラクター。<br className="hidden sm:block" />気になるタイプをタップして、プロフィールをのぞいてみよう。</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex rounded-full bg-white border-2 border-[#211b18] p-1 shadow-[3px_3px_0_#211b18]">
            {(['male', 'female'] as const).map((gender) => (
              <button key={gender} onClick={() => setSelectedGender(gender)} className={`rounded-full px-6 py-2 text-sm font-black transition ${selectedGender === gender ? 'bg-[#352b52] text-white' : 'text-[#6f625b]'}`}>
                {gender === 'male' ? '男性版' : '女性版'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {typeCodes.map((typeCode, index) => {
            const type = genderedDiagramTypes[selectedGender][typeCode]
            const art = chibiCharacterArt[selectedGender][typeCode as keyof typeof chibiCharacterArt.male]
            return (
              <motion.article key={typeCode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.3) }} className="group relative overflow-hidden rounded-[28px] border-2 border-[#211b18] bg-white shadow-[4px_4px_0_#211b18]">
                <div className="relative aspect-square" style={{ backgroundColor: art?.color || '#f5d8bd' }}>
                  <Image src={getChibiImagePath(typeCode, selectedGender)} alt={type.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition duration-300 group-hover:scale-105" priority={index < 4} />
                </div>
                <div className="p-4 text-center min-h-[150px] flex flex-col justify-center">
                  <p className="text-xs font-black text-[#e4557f] mb-1">{typeCode}</p>
                  <h2 className="font-black leading-tight">{type.name}</h2>
                  <p className="text-xs text-[#786a62] mt-2 line-clamp-1">{art?.motif}</p>
                  <button onClick={() => setSelectedType(typeCode)} className="mt-4 rounded-full border-2 border-[#211b18] bg-[#fff8ee] px-4 py-2 text-xs font-black shadow-[2px_2px_0_#211b18] transition hover:-translate-y-0.5">自己紹介を見る</button>
                </div>
              </motion.article>
            )
          })}
        </div>

        {selectedType && (() => {
          const type = genderedDiagramTypes[selectedGender][selectedType]
          const art = chibiCharacterArt[selectedGender][selectedType as keyof typeof chibiCharacterArt.male]
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#211b18]/70 p-3 sm:p-6" onClick={() => setSelectedType(null)}>
              <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-sm max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[28px] border-2 border-[#211b18] bg-[#fff8ee] shadow-[6px_6px_0_#211b18] sm:max-h-[calc(100dvh-3rem)]">
                <button onClick={() => setSelectedType(null)} aria-label="閉じる" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border-2 border-[#211b18] bg-white shadow-[2px_2px_0_#211b18]"><X className="h-4 w-4" /></button>
                <div className="relative h-[min(48dvh,340px)]" style={{ backgroundColor: art?.color || '#f5d8bd' }}><Image src={getChibiImagePath(selectedType, selectedGender)} alt={type.name} fill sizes="384px" className="object-contain" /></div>
                <div className="px-5 pb-5 pt-3 text-center sm:px-6 sm:pb-6">
                  <p className="text-xs font-black text-[#e4557f]">{selectedType}</p>
                  <h2 className="mt-1 text-xl font-black sm:text-2xl">{type.name}</h2>
                  <p className="mt-3 text-sm font-bold leading-relaxed text-[#6f625b]">「{type.catchcopy}」</p>
                  <Link href="/quiz/1" className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-5 py-2.5 text-sm font-black text-white shadow-[3px_3px_0_#211b18]">自分のタイプを診断する</Link>
                </div>
              </motion.div>
            </div>
          )
        })()}

        <div className="text-center mt-12">
          <Link href="/quiz/1" className="inline-flex items-center gap-2 rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-8 py-4 font-black text-white shadow-[4px_4px_0_#211b18] transition hover:-translate-y-1"><Sparkles className="h-5 w-5" />あなたの1体目を見つける</Link>
          <p className="text-xs text-[#8b7e76] mt-4">24問・約3分／登録不要</p>
        </div>
      </div>
    </main>
  )
}
