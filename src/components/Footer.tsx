'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#050510] py-6 mt-16 border-t border-gray-800/50">
      {/* メインフッターコンテンツ - ミニマルデザイン */}
      <div className="max-w-4xl mx-auto px-4">
        {/* 中央配置のシンプルレイアウト */}
        <div className="text-center space-y-4">
          
          {/* SNSリンク */}
          <div className="flex justify-center items-center space-x-6">
            <a 
              href="https://x.com/diet_chara16" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              X (Twitter)
            </a>
            <a 
              href="https://www.instagram.com/diet_chara16?igsh=MXNwOWc2eHM0c3Y5bg%3D%3D&utm_source=qr"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              Instagram
            </a>
            <Link 
              href="/privacy" 
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              プライバシーポリシー
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-500 hover:text-gray-400 transition-colors text-sm"
            >
              お問い合わせ
            </Link>
          </div>

        </div>
      </div>
    </footer>
  )
}