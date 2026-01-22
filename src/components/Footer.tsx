'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#050510] py-6 mt-16 border-t border-gray-800/50">
      {/* メインフッターコンテンツ - ミニマルデザイン */}
      <div className="max-w-4xl mx-auto px-4">
        {/* 中央配置のシンプルレイアウト */}
        <div className="text-center space-y-4">
          
          {/* SNSリンク - モバイル対応 */}
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <a 
              href="https://x.com/diet_chara16" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm px-3 py-2 rounded-md"
            >
              X (Twitter)
            </a>
            <a 
              href="https://www.instagram.com/diet_chara16?igsh=MXNwOWc2eHM0c3Y5bg%3D%3D&utm_source=qr"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm px-3 py-2 rounded-md"
            >
              Instagram
            </a>
            <Link 
              href="/privacy" 
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm px-3 py-2 rounded-md"
            >
              プライバシーポリシー
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm px-3 py-2 rounded-md"
            >
              お問い合わせ
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}