'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Noto_Sans_JP, Zen_Maru_Gothic } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'ホーム', key: 'home' },
    { href: '/gallery', label: 'キャラクター一覧', key: 'gallery' },
    { href: '/about', label: 'ダイエットMBTIとは', key: 'about' },
  ]

  return (
    <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className={`text-2xl font-black text-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text ${zenMaruGothic.className}`}>
                ダイエットキャラ診断
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 md:hidden"
      >
        <div className="p-6 pt-20">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-xl font-medium text-gray-700 hover:text-green-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </motion.div>
    </header>
  )
}