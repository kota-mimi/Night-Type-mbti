export default function StructuredData() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Night Type - 夜の性格診断",
    "alternateName": ["Night Type", "ナイトタイプ", "ないとタイプ", "ナイトタイプ診断", "夜のMBTI風診断"],
    "description": "24問で恋愛や親密な場面の価値観を16タイプに分析する、18歳以上向けの無料エンタメ診断です。",
    "url": "https://www.night-type.net",
    "inLanguage": "ja-JP",
    "publisher": {
      "@type": "Organization",
      "name": "Night Type",
      "url": "https://www.night-type.net",
      "logo": "https://www.night-type.net/og-image.png"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
