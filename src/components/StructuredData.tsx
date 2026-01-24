export default function StructuredData() {
  // WebApplicationの構造化データ
  const webAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ダイエットキャラ診断16",
    "alternateName": "ダイエットタイプ診断",
    "description": "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。24問・約3分で完了。科学的根拠に基づいた継続可能なアプローチをご提案します。",
    "url": "https://night-type.net",
    "applicationCategory": "HealthApplication",
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
      "name": "ダイエットキャラ診断16",
      "url": "https://night-type.net",
      "sameAs": [
        "https://x.com/diet_chara16",
        "https://www.instagram.com/diet_chara16"
      ]
    },
    "datePublished": "2024-01-01",
    "dateModified": "2026-01-13", 
    "inLanguage": "ja-JP",
    "isAccessibleForFree": true,
    "keywords": "ダイエット,診断,MBTI,性格,痩せる,減量,健康,フィットネス,キャラクター診断,ダイエット法",
    "audience": {
      "@type": "Audience",
      "audienceType": "ダイエットを検討している一般消費者"
    },
    "mainEntity": {
      "@type": "Quiz",
      "name": "ダイエットキャラ診断16",
      "description": "24問の質問であなたのダイエットタイプを診断",
      "timeRequired": "PT3M",
      "typicalAgeRange": "18-65",
      "educationalUse": "ダイエット方法の選択支援"
    }
  };

  // Quizの構造化データ
  const quizData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "ダイエットキャラ診断16",
    "description": "あなたの性格と、痩せ方が見つかる。16種類のダイエットキャラクターから、あなたに最適なダイエット方法を診断します。",
    "url": "https://night-type.net/quiz/1",
    "timeRequired": "PT3M",
    "numberOfQuestions": 24,
    "typicalAgeRange": "18-65",
    "inLanguage": "ja-JP",
    "isAccessibleForFree": true,
    "educationalUse": "ダイエット方法の選択支援",
    "audience": {
      "@type": "Audience",
      "audienceType": "ダイエットを検討している成人"
    },
    "author": {
      "@type": "Organization",
      "name": "ダイエットキャラ診断16"
    },
    "provider": {
      "@type": "Organization", 
      "name": "ダイエットキャラ診断16",
      "url": "https://night-type.net"
    }
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