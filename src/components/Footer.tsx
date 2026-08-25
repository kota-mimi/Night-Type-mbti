'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[#211b18] bg-[#ffd166] py-10 text-[#211b18]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          
          {/* SNSセクション */}
          <div className="space-y-4">
            <h3 className="text-sm font-black tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://x.com/nighttype32" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#211b18] bg-white px-4 py-2 font-black shadow-[2px_2px_0_#211b18] transition hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">X (Twitter)</span>
              </a>
              <a 
                href="https://www.instagram.com/night_type32/"
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#211b18] bg-white px-4 py-2 font-black shadow-[2px_2px_0_#211b18] transition hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </div>
          </div>

          {/* 区切り線 */}
          <div className="h-0.5 bg-[#211b18]"></div>

          {/* リーガルリンクセクション */}
          <div className="space-y-4">
            <h3 className="text-sm font-black tracking-wider uppercase">
              Information
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <Link 
                href="/privacy" 
                className="px-4 py-2 text-sm font-bold underline decoration-2 underline-offset-4"
              >
                プライバシーポリシー
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-2 text-sm font-bold underline decoration-2 underline-offset-4"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* コピーライト */}
          <div className="pt-4 text-xs font-bold text-[#6f625b]">
            © 2026 Night Type. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}
