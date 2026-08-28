import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '診断中',
  robots: { index: false, follow: false },
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
