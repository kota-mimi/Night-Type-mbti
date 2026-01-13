'use client'

import React, { useState, useEffect } from 'react'

interface A8AffiliateAd {
  name: string
  mobileCode: string  // モバイル用バナーコード
  desktopCode: string // デスクトップ用バナーコード
  url: string
}

// A8広告データ
const affiliateAds: A8AffiliateAd[] = [
  {
    name: 'Myprotein',
    mobileCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WF+G1IHKI+4YJS+61JSH" rel="nofollow">
<img border="0" width="234" height="60" alt="" src="https://www26.a8.net/svt/bgt?aid=260113551970&wid=001&eno=01&mid=s00000023140001015000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4AV4WF+G1IHKI+4YJS+61JSH" alt="">`,
    desktopCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WF+G1IHKI+4YJS+60OXD" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www22.a8.net/svt/bgt?aid=260113551970&wid=001&eno=01&mid=s00000023140001011000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www14.a8.net/0.gif?a8mat=4AV4WF+G1IHKI+4YJS+60OXD" alt="">`,
    url: 'https://px.a8.net/svt/ejp?a8mat=4AV4WF+G1IHKI+4YJS+61JSH'
  }
  // 他の案件もここに追加予定
]

export default function A8AffiliateBanner() {
  const [currentAd, setCurrentAd] = useState<A8AffiliateAd>(affiliateAds[0])
  const [isMobile, setIsMobile] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    // 画面サイズ判定
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    // ローテーション機能（今は1つだけなので無効）
    // const rotateAd = () => {
    //   const randomIndex = Math.floor(Math.random() * affiliateAds.length)
    //   setCurrentAd(affiliateAds[randomIndex])
    // }
    // 
    // const interval = setInterval(rotateAd, 30000) // 30秒ごと
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      // clearInterval(interval)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full flex justify-center">
      <div 
        className="a8-affiliate-banner"
        dangerouslySetInnerHTML={{
          __html: isMobile ? currentAd.mobileCode : currentAd.desktopCode
        }}
      />
    </div>
  )
}