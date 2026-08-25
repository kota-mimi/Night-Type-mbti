'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LockKeyhole, Sparkles } from 'lucide-react'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { chibiCharacterArt, getChibiImagePath } from '@/data/chibiCharacters'

const DISCOVERED_TYPES_KEY = 'night-type-discovered-types'

export default function GalleryPage() {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male')
  const [discovered, setDiscovered] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(DISCOVERED_TYPES_KEY) || '[]')
      if (Array.isArray(saved)) {
        const validTypes = saved.filter((value): value is string => typeof value === 'string')
        queueMicrotask(() => setDiscovered(validTypes))
      }
    } catch {
      localStorage.removeItem(DISCOVERED_TYPES_KEY)
    }
  }, [])

  const typeCodes = Object.keys(genderedDiagramTypes[selectedGender])

  return (
    <main className="min-h-screen bg-[#fff8ee] text-[#211b18] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#211b18] px-4 py-2 text-sm font-bold text-white mb-5">
            <Sparkles className="h-4 w-4 text-[#ffd166]" /> NIGHT TYPE COLLECTION
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">夜の住人図鑑</h1>
          <p className="text-[#6f625b] leading-relaxed">診断で出会ったタイプだけが開くコレクション。<br className="hidden sm:block" />名前も性格も、結果を見るまでのお楽しみです。</p>
          <p className="mt-4 font-bold text-sm">発見済み {discovered.length} / 16</p>
        </header>

        <div className="flex justify-center mb-8">
          <div className="flex rounded-full bg-white border-2 border-[#211b18] p-1 shadow-[3px_3px_0_#211b18]">
            {(['male', 'female'] as const).map((gender) => (
              <button key={gender} onClick={() => setSelectedGender(gender)} className={`rounded-full px-6 py-2 text-sm font-black transition ${selectedGender === gender ? 'bg-[#211b18] text-white' : 'text-[#6f625b]'}`}>
                {gender === 'male' ? '男性版' : '女性版'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {typeCodes.map((typeCode, index) => {
            const unlocked = discovered.includes(typeCode)
            const type = genderedDiagramTypes[selectedGender][typeCode]
            const art = chibiCharacterArt[selectedGender][typeCode as keyof typeof chibiCharacterArt.male]
            return (
              <motion.article key={typeCode} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.03, 0.3) }} className="relative overflow-hidden rounded-[28px] border-2 border-[#211b18] bg-white shadow-[4px_4px_0_#211b18]">
                <div className="relative aspect-square" style={{ backgroundColor: art?.color || '#f5d8bd' }}>
                  <Image src={getChibiImagePath(typeCode, selectedGender)} alt={unlocked ? type.name : '未発見のNight Type'} fill sizes="(max-width: 768px) 50vw, 25vw" className={`object-cover transition duration-500 ${unlocked ? '' : 'blur-[10px] grayscale opacity-45 scale-105'}`} priority={index < 4} />
                  {!unlocked && <div className="absolute inset-0 flex items-center justify-center bg-[#211b18]/10"><div className="grid h-12 w-12 place-items-center rounded-full bg-white border-2 border-[#211b18] shadow-[2px_2px_0_#211b18]"><LockKeyhole className="h-5 w-5" /></div></div>}
                </div>
                <div className="p-4 text-center min-h-[106px] flex flex-col justify-center">
                  {unlocked ? <><p className="text-xs font-black text-[#e4557f] mb-1">{typeCode}</p><h2 className="font-black leading-tight">{type.name}</h2><p className="text-xs text-[#786a62] mt-2 line-clamp-1">{art?.motif}</p></> : <><p className="text-xs font-bold text-[#9b8e86] mb-1">UNKNOWN</p><h2 className="font-black">？？？？？</h2><p className="text-xs text-[#9b8e86] mt-2">診断すると開放</p></>}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/quiz/1" className="inline-flex items-center gap-2 rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-8 py-4 font-black text-white shadow-[4px_4px_0_#211b18] transition hover:-translate-y-1"><Sparkles className="h-5 w-5" />あなたの1体目を見つける</Link>
          <p className="text-xs text-[#8b7e76] mt-4">24問・約3分／登録不要</p>
        </div>
      </div>
    </main>
  )
}
