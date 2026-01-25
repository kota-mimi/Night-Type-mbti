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

  return <CharacterPageClient slug={slug} typeCode={typeCode} gender={gender} />
}