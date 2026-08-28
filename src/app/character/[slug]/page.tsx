import { genderedDiagramTypes } from '@/data/diagramTypes'
import { characterSlugs, slugToType } from '@/data/characterSlugs'
import { generateCharacterMetadata } from '@/utils/characterMeta'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import CharacterPageClient from '@/components/CharacterPageClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return generateCharacterMetadata(slug)
}

export async function generateStaticParams() {
  return Object.values(characterSlugs).map((slug) => ({
    slug,
  }))
}

export default async function CharacterPage({ params }: Props) {
  const { slug } = await params
  
  // スラッグからキャラクタータイプ（ARTN-male形式）を取得
  const fullTypeCode = slugToType[slug]
  
  if (!fullTypeCode) {
    notFound()
  }
  
  // タイプコードと性別を分離
  const [typeCode, gender] = fullTypeCode.split('-') as [string, 'male' | 'female']
  
  if (!typeCode || !gender || (gender !== 'male' && gender !== 'female')) {
    notFound()
  }
  
  const character = genderedDiagramTypes[gender][typeCode]
  
  if (!character) {
    notFound()
  }

  const url = `https://night-type.net/character/${slug}`
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        name: `${character.name}（${typeCode}）の性格・特徴`,
        description: `${character.catchcopy} ${character.basicEcology}`,
        url,
        inLanguage: 'ja-JP',
        isPartOf: { '@type': 'WebSite', name: 'Night Type', url: 'https://night-type.net' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://night-type.net' },
          { '@type': 'ListItem', position: 2, name: 'Night Type図鑑', item: 'https://night-type.net/gallery' },
          { '@type': 'ListItem', position: 3, name: character.name, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CharacterPageClient slug={slug} typeCode={typeCode} gender={gender} />
    </>
  )
}
