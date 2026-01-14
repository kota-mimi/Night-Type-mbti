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
  },
  {
    name: 'Campaign2',
    mobileCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX" rel="nofollow">
<img border="0" width="234" height="60" alt="" src="https://www22.a8.net/svt/bgt?aid=260113552178&wid=001&eno=01&mid=s00000016145004010000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX" alt="">`,
    desktopCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NV9N5" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www24.a8.net/svt/bgt?aid=260113552178&wid=001&eno=01&mid=s00000016145004009000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www15.a8.net/0.gif?a8mat=4AV4WG+2XZ6GI+3GKQ+NV9N5" alt="">`,
    url: 'https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX'
  },
  {
    name: '遺伝子博士',
    mobileCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX" rel="nofollow">
<img border="0" width="234" height="60" alt="" src="https://www20.a8.net/svt/bgt?aid=260113552178&wid=001&eno=01&mid=s00000016145004010000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX" alt="">`,
    desktopCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NUU7L" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=260113552178&wid=001&eno=01&mid=s00000016145004007000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www18.a8.net/0.gif?a8mat=4AV4WG+2XZ6GI+3GKQ+NUU7L" alt="">`,
    url: 'https://px.a8.net/svt/ejp?a8mat=4AV4WG+2XZ6GI+3GKQ+NVHCX'
  },
  {
    name: 'スマートリング',
    mobileCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+555TWY+5THY+5ZU29" rel="nofollow">
<img border="0" width="320" height="50" alt="" src="https://www29.a8.net/svt/bgt?aid=260113552311&wid=001&eno=01&mid=s00000027151001007000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www17.a8.net/0.gif?a8mat=4AV4WG+555TWY+5THY+5ZU29" alt="">`,
    desktopCode: `<a href="https://px.a8.net/svt/ejp?a8mat=4AV4WG+555TWY+5THY+5ZEMP" rel="nofollow">
<img border="0" width="300" height="250" alt="" src="https://www26.a8.net/svt/bgt?aid=260113552311&wid=001&eno=01&mid=s00000027151001005000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4AV4WG+555TWY+5THY+5ZEMP" alt="">`,
    url: 'https://px.a8.net/svt/ejp?a8mat=4AV4WG+555TWY+5THY+5ZU29'
  }
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

    // ローテーション機能（30秒ごとにランダム切り替え）
    const rotateAd = () => {
      const randomIndex = Math.floor(Math.random() * affiliateAds.length)
      setCurrentAd(affiliateAds[randomIndex])
    }
    
    const interval = setInterval(rotateAd, 30000) // 30秒ごと
    
    return () => {
      window.removeEventListener('resize', checkScreenSize)
      clearInterval(interval)
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