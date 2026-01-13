'use client'

import React, { useState, useEffect } from 'react'

interface A8AffiliateAd {
  name: string
  mobileCode: string  // 120x60 バナーコード
  desktopCode: string // 300x250 バナーコード
  url: string
}

// A8広告データ
const affiliateAds: A8AffiliateAd[] = [
  {
    name: 'Myprotein',
    mobileCode: `<a href="https://px.a8.net/svt/ejp?a8mat=45K5P3+4V1GMQ+45DI+661TT" rel="nofollow">
<img border="0" width="120" height="60" alt="" src="https://www21.a8.net/svt/bgt?aid=251203287294&wid=001&eno=01&mid=s00000019359001036000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www16.a8.net/0.gif?a8mat=45K5P3+4V1GMQ+45DI+661TT" alt="">`,
    desktopCode: `<a href="https://px.a8.net/svt/ejp?a8mat=45K5P3+4V1GMQ+45DI+609HT" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www20.a8.net/svt/bgt?aid=251203287294&wid=001&eno=01&mid=s00000019359001009000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=45K5P3+4V1GMQ+45DI+609HT" alt="">`,
    url: 'https://px.a8.net/svt/ejp?a8mat=45K5P3+4V1GMQ+45DI+661TT'
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