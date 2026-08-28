import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ストーリー画像を作る',
  robots: { index: false, follow: false },
}

export default function StoryMakerLayout({ children }: { children: React.ReactNode }) {
  return children
}
