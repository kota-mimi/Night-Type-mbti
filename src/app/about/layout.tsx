import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Night Typeとは｜4つの分析軸と16タイプ',
  description: 'Night Typeが分析する「主導権・刺激の源・判断基準・変化の好み」の4軸と、16タイプの考え方を解説します。',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'Night Typeとは｜4つの分析軸と16タイプ',
    description: '大人の夜の性格を分析する4つの軸を解説。',
    url: '/about',
    images: ['/og-image.png'],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
