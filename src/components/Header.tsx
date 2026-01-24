'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Noto_Sans_JP, Noto_Serif_JP } from 'next/font/google'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { href: '/', label: 'ホーム', key: 'home' },
    { href: '/gallery', label: 'キャラクター一覧', key: 'gallery' },
    { href: '/about', label: 'Night Typeとは', key: 'about' },
    { href: '/contact', label: 'お問い合わせ', key: 'contact' },
  ]


  return (
    <header 
      className={`sticky top-0 z-50 ${notoSansJP.className}`}
      style={{
        backgroundColor: '#0a0a12',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        // GPU optimized for smooth rendering
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <div 
                className={`text-2xl font-black ${notoSerifJP.className} tracking-tight text-[#FF007F]`}
              >
                Night Type
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-[#AAAAAA] hover:text-[#FF007F] font-medium transition-colors duration-300"
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
              <X className="w-6 h-6 text-gray-300" />
            ) : (
              <Menu className="w-6 h-6 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Full Screen Overlay Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 w-screen h-screen z-[9999] md:hidden flex flex-col justify-center items-center"
          style={{
            backgroundColor: 'rgba(10, 10, 18, 0.98)',
            // GPU optimized for smooth rendering
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          onClick={() => setIsMenuOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-8 p-3 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            <X className="w-8 h-8 text-gray-300" />
          </button>

          {/* Menu Items */}
          <nav className="flex flex-col items-center space-y-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1 + index * 0.1,
                  ease: 'easeOut'
                }}
              >
                <Link
                  href={item.href}
                  className="block text-3xl font-medium text-[#AAAAAA] hover:text-[#FF007F] transition-colors duration-300 py-4 px-8 rounded-xl hover:bg-[#1A1A1A]"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsMenuOpen(false)
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-16 text-center"
          >
            <div 
              className={`text-xl font-black ${notoSerifJP.className} tracking-tight text-[#FF007F]`}
            >
              Night Type
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  )
}