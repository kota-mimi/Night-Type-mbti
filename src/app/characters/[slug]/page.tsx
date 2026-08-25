import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { genderedDiagramTypes } from '@/data/diagramTypes';
import { characterSlugs, slugToType } from '@/data/characterSlugs';
import { getChibiImagePath } from '@/data/chibiCharacters';

// slugからキャラクター情報を取得
const getCharacterBySlug = (slug: string) => {
  if (!slug || typeof slug !== 'string') return null;
  
  // 既存のslugToTypeマッピングを使用
  const typeKey = slugToType[slug];
  if (!typeKey) return null;
  
  const [typeCode, gender] = typeKey.split('-') as [string, 'male' | 'female'];
  if (gender === 'male') {
    const key = typeCode as keyof typeof genderedDiagramTypes.male;
    const char = genderedDiagramTypes.male[key];
    return char ? { type: key, gender: 'male' as const, ...char } : null;
  }
  
  if (gender === 'female') {
    const key = typeCode as keyof typeof genderedDiagramTypes.female;
    const char = genderedDiagramTypes.female[key];
    return char ? { type: key, gender: 'female' as const, ...char } : null;
  }
  
  return null;
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  
  if (!character) {
    return {
      title: 'キャラクターが見つかりません',
    };
  }

  return {
    title: `${character.name} | Night Type MBTI診断`,
    description: `${character.catchcopy} ${character.basicEcology}`,
    openGraph: {
      title: `${character.name} | Night Type MBTI診断`,
      description: `${character.catchcopy} ${character.basicEcology}`,
      images: ['/opengraph-image.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.name} | Night Type MBTI診断`,
      description: `${character.catchcopy} ${character.basicEcology}`,
    },
  };
}

export async function generateStaticParams() {
  return Object.values(characterSlugs).map((slug) => ({
    slug,
  }));
}

export default async function CharacterPage({ params }: PageProps) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#111111]">
      <div className="container mx-auto px-4 py-8">
        {/* メインキャラクターカード */}
        <div className="flex justify-center items-center min-h-[70vh]">
          <div className="max-w-md mx-auto">
            <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-8 text-center">
              <Image src={getChibiImagePath(String(character.type), character.gender)} alt={character.name} width={500} height={500} className="mb-5 w-full rounded-2xl" />
              
              {/* キャラクター名 */}
              <h1 className="text-2xl font-bold text-white mb-2">{character.name}</h1>
              
              {/* キャッチコピー */}
              <p className="text-sm text-gray-300 mb-6">{character.catchcopy}</p>
              
              {/* 基本生態 */}
              <div className="mb-6">
                <h2 className="text-lg font-bold text-white mb-3">基本生態</h2>
                <p className="text-sm text-gray-300 leading-relaxed">{character.basicEcology}</p>
              </div>
            </div>
            
            {/* 診断CTA */}
            <div className="mt-8">
              <div className="bg-[#1A1A1A] border border-[#333333] rounded-lg p-6 text-center">
                <h3 className="text-lg font-bold text-white mb-2">
                  あなたの夜タイプは何？
                </h3>
                <p className="text-sm text-gray-300 mb-4">
                  診断してみよう！
                </p>
                <Link
                  href="/quiz/1"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                  診断を始める
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
