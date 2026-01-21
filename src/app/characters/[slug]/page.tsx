import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { genderedDiagramTypes } from '@/data/diagramTypes';

// 全キャラクターのslugを生成
const getAllCharacterSlugs = () => {
  const slugs: string[] = [];
  Object.entries(genderedDiagramTypes.male).forEach(([key, char]) => {
    slugs.push(`male-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
  });
  Object.entries(genderedDiagramTypes.female).forEach(([key, char]) => {
    slugs.push(`female-${key.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
  });
  return slugs;
};

// slugからキャラクター情報を取得
const getCharacterBySlug = (slug: string) => {
  if (!slug || typeof slug !== 'string') return null;
  
  if (slug.startsWith('male-')) {
    const key = slug.replace('male-', '').toUpperCase();
    const char = genderedDiagramTypes.male[key as keyof typeof genderedDiagramTypes.male];
    return char ? { type: key, gender: 'male' as const, ...char } : null;
  }
  
  if (slug.startsWith('female-')) {
    const key = slug.replace('female-', '').toUpperCase();
    const char = genderedDiagramTypes.female[key as keyof typeof genderedDiagramTypes.female];
    return char ? { type: key, gender: 'female' as const, ...char } : null;
  }
  
  return null;
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await params.slug;
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
  return getAllCharacterSlugs().map((slug) => ({
    slug,
  }));
}

export default async function CharacterPage({ params }: PageProps) {
  const slug = await params.slug;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{character.emoji}</div>
          <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
          <p className="text-xl text-purple-200 font-medium">{character.catchcopy}</p>
        </div>

        {/* メインコンテンツ */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">基本的な生態</h2>
            <p className="text-lg text-gray-200 mb-6">{character.basicEcology}</p>
            
            <h2 className="text-2xl font-bold text-white mb-4">詳しい解説</h2>
            <p className="text-lg text-gray-200 mb-6">{character.detailedEcology}</p>
          </div>

          {/* 診断へのCTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                あなたはこのタイプ？
              </h3>
              <p className="text-lg text-purple-100 mb-6">
                無料の診断で、あなたの夜の性格タイプを発見しましょう
              </p>
              <Link
                href="/gender-selection"
                className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-100 transition-colors"
              >
                診断を始める
              </Link>
            </div>
          </div>

          {/* 他のキャラクター */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              他のキャラクタータイプも見る
            </h3>
            <div className="text-center">
              <Link
                href="/gallery"
                className="inline-block bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full hover:bg-white/20 transition-colors"
              >
                全キャラクター一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}