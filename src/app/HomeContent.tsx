'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock3, LockKeyhole, Sparkles } from 'lucide-react'
import { trackEvent } from '@/lib/analyticsEvents'

const previewCharacters = [
  { src: '/characters/chibi/ARTN_male.png', rotate: '-rotate-3', label: '絶対君主' },
  { src: '/characters/chibi/AFEC_female.png', rotate: 'rotate-2', label: '無邪気なティンカーベル' },
  { src: '/characters/chibi/PFTC_male.png', rotate: '-rotate-1', label: '性癖研究員' },
]

export default function HomeContent() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fff8ee] text-[#211b18]">
      <section className="relative px-4 pt-12 pb-20 md:pt-20">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#ffb6c8]/50 blur-3xl" />
        <div className="absolute top-20 -right-20 h-72 w-72 rounded-full bg-[#82d9d0]/40 blur-3xl" />
        <div className="relative mx-auto max-w-6xl grid lg:grid-cols-[1fr_1.05fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#211b18] bg-[#ffd166] px-4 py-2 text-xs font-black shadow-[3px_3px_0_#211b18] mb-7">
              <Sparkles className="h-4 w-4" /> 大人の本音を、かわいく診断
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-[-0.05em] leading-[0.95]">
              夜のあなたは、<br /><span className="text-[#e4557f]">どのタイプ？</span>
            </h1>
            <p className="mt-7 text-base md:text-lg leading-relaxed text-[#695c55] max-w-xl mx-auto lg:mx-0">
              24問から、主導権・刺激・感情・変化の好みを分析。<br className="hidden sm:block" />あなたの本音を16タイプのキャラクターにします。
            </p>
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 text-xs font-bold text-[#695c55]">
              <span className="inline-flex items-center gap-1.5"><Clock3 className="h-4 w-4" />約3分</span>
              <span className="inline-flex items-center gap-1.5"><LockKeyhole className="h-4 w-4" />登録不要</span>
              <span className="inline-flex items-center gap-1.5"><Sparkles className="h-4 w-4" />完全無料</span>
            </div>
            <Link href="/quiz/1" onClick={() => trackEvent('quiz_start', { location: 'home_hero' })} className="mt-9 inline-flex items-center gap-3 rounded-full border-2 border-[#211b18] bg-[#ff6f91] px-8 py-4 text-lg font-black text-white shadow-[5px_5px_0_#211b18] transition hover:-translate-y-1 hover:shadow-[7px_7px_0_#211b18]">
              診断をはじめる <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 md:gap-5 items-center">
            {previewCharacters.map((character, index) => (
              <motion.div key={character.src} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: index === 1 ? -18 : 12 }} transition={{ delay: 0.15 + index * 0.1 }} className={`${character.rotate} overflow-hidden rounded-[28px] border-2 border-[#211b18] bg-white shadow-[5px_5px_0_#211b18]`}>
                <div className="relative aspect-square"><Image src={character.src} alt={character.label} fill sizes="33vw" className="object-cover" priority /></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y-2 border-[#211b18] bg-[#352b52] px-4 py-5 text-white">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm font-black">
          <span>4つの本音軸</span><span className="text-[#ff8faa]">×</span><span>16タイプ</span><span className="text-[#75d5cc]">×</span><span>男女32キャラクター</span>
        </div>
      </section>

      <section className="px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-black tracking-[0.25em] text-[#e4557f]">MEET THE CHARACTERS</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black">キャラクターは見える。答えはまだ秘密。</h2>
          <p className="mt-5 leading-relaxed text-[#695c55]">図鑑では全キャラクターの軽い自己紹介を公開。詳しい生態・相性・本能のカルテは、あなた自身の診断結果で分かります。</p>
          <Link href="/gallery" className="mt-7 inline-flex items-center gap-2 font-black underline decoration-2 underline-offset-8">Night Type図鑑を見る <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  )
}
