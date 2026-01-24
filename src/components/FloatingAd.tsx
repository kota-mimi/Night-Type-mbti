'use client'

import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface FloatingAdProps {
  imageUrl?: string
  linkUrl?: string
  altText?: string
  onClose?: () => void
  closable?: boolean
}

export default function FloatingAd({
  imageUrl = "/line-ad.png",
  linkUrl = "#",
  altText = "広告バナー",
  onClose,
  closable = true
}: FloatingAdProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // サーバーサイドレンダリング時は非表示で表示する（ハイドレーション後に表示）
  if (!isMounted) {
    return (
      <div style={{ display: 'none' }}>
        <img src={imageUrl} alt={altText} style={{ display: 'none' }} />
      </div>
    );
  }

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleClick = () => {
    if (linkUrl && linkUrl !== "#") {
      window.open(linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`
        fixed bottom-4 right-4 z-50 
        transition-all duration-300 ease-in-out
        opacity-100
        w-[100px] h-[100px]
      `}
    >
      {/* 広告バナー本体 */}
      <div 
        onClick={handleClick}
        className={`
          relative bg-transparent rounded-full border border-[#333333] overflow-hidden
          ${linkUrl && linkUrl !== "#" ? 'cursor-pointer' : 'cursor-default'}
          transform hover:scale-125 transition-transform duration-300 ease-out
          w-full h-full
        `}
        style={{ backgroundColor: 'transparent' }}
      >
        {/* 閉じるボタン */}
        {closable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleClose()
            }}
            className="
              absolute top-1 right-1 z-10
              bg-black bg-opacity-50 rounded-full
              p-1 hover:bg-opacity-70
              transition-all duration-200
            "
            aria-label="広告を閉じる"
          >
            <X size={12} color="white" />
          </button>
        )}

        {/* 広告画像 */}
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover rounded-full"
          style={{
            display: 'block',
            position: 'relative',
            zIndex: 10
          }}
          onError={(e) => {
            // 画像が読み込めない場合のフォールバック
            const target = e.target as HTMLImageElement
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Ccircle cx='70' cy='70' r='65' fill='%23ff0000'/%3E%3Ctext x='70' y='80' text-anchor='middle' fill='white' font-size='14' font-weight='bold'%3EERROR%3C/text%3E%3C/svg%3E"
          }}
        />

      </div>

    </div>
  )
}