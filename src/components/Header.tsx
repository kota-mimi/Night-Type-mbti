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
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <div 
                className={`text-2xl font-black ${notoSerifJP.className} tracking-tight`}
                style={{
                  background: 'linear-gradient(to right, #FF007F, #00FFFF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 10px rgba(255, 0, 127, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 0, 127, 0.4))'
                }}
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
                className="text-gray-300 font-medium transition-all duration-300"
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = 'linear-gradient(to right, #FF007F, #00FFFF)'
                  target.style.webkitBackgroundClip = 'text'
                  target.style.webkitTextFillColor = 'transparent'
                  target.style.textShadow = '0 0 15px rgba(255, 0, 127, 0.6), 0 0 25px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = 'none'
                  target.style.webkitBackgroundClip = 'unset'
                  target.style.webkitTextFillColor = 'unset'
                  target.style.textShadow = 'none'
                }}
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black bg-opacity-80 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-out Menu */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMenuOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed top-0 right-0 h-full w-[85vw] max-w-sm z-50 md:hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(5, 5, 16, 0.98), rgba(10, 10, 25, 0.95))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '2px solid rgba(255, 0, 127, 0.3)',
          boxShadow: '-5px 0 25px rgba(0, 0, 0, 0.5), inset 1px 0 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2"
          >
            <X className="w-6 h-6 text-gray-300" />
          </button>
        </div>
        
        <div className="p-6">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-xl font-medium text-gray-300 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
                onMouseEnter={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = 'linear-gradient(to right, #FF007F, #00FFFF)'
                  target.style.webkitBackgroundClip = 'text'
                  target.style.webkitTextFillColor = 'transparent'
                  target.style.textShadow = '0 0 15px rgba(255, 0, 127, 0.6), 0 0 25px rgba(0, 255, 255, 0.4)'
                }}
                onMouseLeave={(e) => {
                  const target = e.target as HTMLElement
                  target.style.background = 'none'
                  target.style.webkitBackgroundClip = 'unset'
                  target.style.webkitTextFillColor = 'unset'
                  target.style.textShadow = 'none'
                }}
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