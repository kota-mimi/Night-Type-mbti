import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'キャラクター版を選択',
  robots: { index: false, follow: false },
}

export default function GenderSelectionLayout({ children }: { children: React.ReactNode }) {
  return children
}
