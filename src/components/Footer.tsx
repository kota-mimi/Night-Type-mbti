'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-8 mt-16 border-t border-gray-800/30" style={{ backgroundColor: '#0a0a12' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center space-y-6">
          
          {/* SNSセクション */}
          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm font-medium tracking-wider uppercase">
              Follow Us
            </h3>
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://x.com/nighttype32" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/30"
              >
                <span className="text-sm font-medium">X (Twitter)</span>
              </a>
              <a 
                href="https://www.instagram.com/night_type32/"
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-gray-500 hover:text-pink-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/30"
              >
                <span className="text-sm font-medium">Instagram</span>
              </a>
            </div>
          </div>

          {/* 区切り線 */}
          <div className="h-px bg-[#333333]"></div>

          {/* リーガルリンクセクション */}
          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm font-medium tracking-wider uppercase">
              Information
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
              <Link 
                href="/privacy" 
                className="group text-gray-500 hover:text-cyan-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/30 text-sm font-medium"
              >
                プライバシーポリシー
              </Link>
              <Link 
                href="/contact" 
                className="group text-gray-500 hover:text-emerald-400 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-gray-800/30 text-sm font-medium"
              >
                お問い合わせ
              </Link>
            </div>
          </div>

          {/* コピーライト */}
          <div className="pt-4 text-xs text-gray-600">
            © 2026 Night Type. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  )
}