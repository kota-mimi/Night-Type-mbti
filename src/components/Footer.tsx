'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-[#0d0b18] bg-[#17152b] py-10 text-[#f7f0ff]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-black tracking-tight text-[#f7f0ff]">夜のあなたを、もっと自由に。</p>
            <p className="text-xs font-medium text-[#b9afd0]">Night Type — 16タイプの夜のパーソナリティ診断</p>
          </div>
          
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
                className="rounded-full border-2 border-[#f7f0ff] bg-[#352b52] px-4 py-2 font-black shadow-[2px_2px_0_#0d0b18] transition hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">X (Twitter)</span>
              </a>
              <a 
                href="https://www.instagram.com/night_type32/"
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#f7f0ff] bg-[#352b52] px-4 py-2 font-black shadow-[2px_2px_0_#0d0b18] transition hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </div>
          </div>

          {/* 区切り線 */}
          <div className="h-0.5 bg-[#695b8f]"></div>

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
          <div className="pt-4 text-xs font-bold text-[#b9afd0]">
            © 2026 Night Type. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}
