import { Metadata } from 'next'
import { genderedDiagramTypes } from '@/data/diagramTypes'
import { slugToType } from '@/data/characterSlugs'

export function generateCharacterMetadata(slug: string): Metadata {
  const fullTypeCode = slugToType[slug]
  if (!fullTypeCode) {
    return {
      title: 'キャラクターが見つかりません',
    }
  }

  // タイプコードと性別を分離
  const [typeCode, gender] = fullTypeCode.split('-') as [string, 'male' | 'female']
  
  if (!typeCode || !gender || (gender !== 'male' && gender !== 'female')) {
    return {
      title: 'キャラクターが見つかりません',
    }
  }

  const character = genderedDiagramTypes[gender][typeCode]
  if (!character) {
    return {
      title: 'キャラクターが見つかりません',
    }
  }

  const title = `${character.name}（${typeCode}）| Night Type`
  const description = `${character.name}の詳細分析：${character.catchcopy} ${character.basicEcology} あなたのNight Typeを無料診断で発見しよう！`
  
  const url = `https://night-type.net/character/${slug}`
  const imageUrl = `https://night-type.net/characters/${typeCode}_${gender}_banner.png`

  return {
    title,
    description,
    keywords: [
      character.name,
      'Night Type',
      'MBTI',
      'キャラクター診断',
      '性格診断',
      typeCode,
      character.catchcopy.replace(/[。、]/g, ''),
      '夜の性格診断',
      'キャラ診断',
      '性格分析'
    ].join(', '),
    authors: [{ name: 'Night Type' }],
    creator: 'Night Type',
    publisher: 'Night Type',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Night Type',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${character.name}のキャラクター`,
        },
      ],
      locale: 'ja_JP',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@nighttype',
      site: '@nighttype',
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}