export default function StructuredData() {
  // WebApplicationの構造化データ
  const webAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Night Type - 夜の性格診断",
    "alternateName": ["Night Type", "ナイトタイプ診断", "夜のMBTI診断"],
    "description": "32種類の夜の性格診断で、あなたに最適な夜の過ごし方を発見。24問・約3分で完了。科学的根拠に基づいたアプローチで夜のライフスタイルを最適化します。",
    "url": "https://night-type.net",
    "applicationCategory": "LifestyleApplication",
    "genre": ["診断", "性格分析", "エンターテイメント", "ライフスタイル"],
    "operatingSystem": "Web Browser",
    "browserRequirements": "HTML5, CSS3, JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY",
      "availability": "https://schema.org/InStock"
    },
    "creator": {
      "@type": "Organization", 
      "name": "Night Type",
      "url": "https://night-type.net",
      "logo": "https://night-type.net/og-image.png"
    },
    "datePublished": "2024-01-01",
    "dateModified": "2026-01-27", 
    "inLanguage": "ja-JP",
    "isAccessibleForFree": true,
    "keywords": "夜,性格,診断,MBTI,ライフスタイル,夜型,深夜,エンターテイメント,キャラクター診断,性格分析,16タイプ",
    "audience": {
      "@type": "Audience",
      "audienceType": "夜の過ごし方を改善したい成人",
      "geographicArea": "JP"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": "Night Type 夜の性格診断",
      "description": "24問の質問であなたの夜の性格タイプを診断し、最適な夜の過ごし方をご提案します",
      "timeRequired": "PT3M",
      "typicalAgeRange": "18-65",
      "educationalUse": "ライフスタイル最適化支援"
    },
    "featureList": [
      "32種類の詳細な夜のキャラクター分析（男女各16タイプ）",
      "科学的根拠に基づいた性格分析",
      "個別化された夜のライフスタイル提案",
      "完全無料での利用",
      "3分で完了する簡単診断"
    ]
  };

  // Quizの構造化データ
  const quizData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Night Type - 夜の性格診断",
    "description": "あなたの夜の性格が見つかる。32種類の夜のキャラクターから、あなたに最適な夜の過ごし方を診断します。",
    "url": "https://night-type.net/quiz/1",
    "timeRequired": "PT3M",
    "numberOfQuestions": 24,
    "typicalAgeRange": "18-65",
    "inLanguage": "ja-JP",
    "isAccessibleForFree": true,
    "educationalUse": "夜のライフスタイル最適化支援",
    "audience": {
      "@type": "Audience",
      "audienceType": "夜の過ごし方を改善したい成人",
      "geographicArea": "JP"
    },
    "author": {
      "@type": "Organization",
      "name": "Night Type",
      "url": "https://night-type.net"
    },
    "provider": {
      "@type": "Organization", 
      "name": "Night Type",
      "url": "https://night-type.net",
      "logo": "https://night-type.net/og-image.png"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "夜の性格分析",
        "description": "個人の夜間における行動パターンと性格特性の分析"
      },
      {
        "@type": "Thing", 
        "name": "ライフスタイル診断",
        "description": "最適な夜の過ごし方の提案と生活習慣の改善"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(quizData) }}
      />
    </>
  );
}