import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Night Type図鑑｜男女32キャラクター一覧',
  description: '大人の夜の性格診断「Night Type」の男女32キャラクターを一覧で紹介。気になるタイプの性格や特徴を見つけよう。',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Night Type図鑑｜男女32キャラクター一覧',
    description: '16タイプ×男女の全32キャラクターを一覧で紹介。',
    url: '/gallery',
    images: ['/og-image.png'],
  },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
