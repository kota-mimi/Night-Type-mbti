export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ダイエットタイプ診断",
    "description": "16タイプのダイエット性格診断で、あなたに最適なダイエット方法を発見。20問・約3分で完了。科学的根拠に基づいた継続可能なアプローチをご提案します。",
    "url": "https://diet-type16.com",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "JPY"
    },
    "creator": {
      "@type": "Organization",
      "name": "ダイエットタイプ診断"
    },
    "datePublished": "2024-01-01",
    "inLanguage": "ja-JP",
    "isAccessibleForFree": true,
    "keywords": "ダイエット,診断,MBTI,性格,痩せる,減量,健康,フィットネス",
    "audience": {
      "@type": "Audience",
      "audienceType": "一般消費者"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}