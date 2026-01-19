// キャラクターIDと相性データの完全定義

// ■ 1. キャラクターID定義 (Master Map)
// ID: 1~16, Code: NightCode
export const characterIdMap = {
  1:  { code: 'ARTN', male: '絶対君主',           female: '冷徹な女帝' },
  2:  { code: 'AFTN', male: '夜のCEO',            female: '氷の美貌' },
  3:  { code: 'AREN', male: '過保護なパトロン',   female: '過保護なママ' },
  4:  { code: 'AFEN', male: '愛の教祖',           female: '魔性の聖女' },
  5:  { code: 'ARTC', male: '暴走ダンプカー',     female: '肉食系ハンター' },
  6:  { code: 'AFTC', male: '夜のジョーカー',     female: '小悪魔な発明家' },
  7:  { code: 'AREC', male: '自意識過剰なスター', female: 'スポットライト女優' },
  8:  { code: 'AFEC', male: '気まぐれピーターパン', female: '無邪気なティンカーベル' },
  9:  { code: 'PRTN', male: '生真面目な公務員',   female: '鉄壁のガードマン' },
  10: { code: 'PFTN', male: 'ソロプレイヤー',     female: '冷めた脚本家' },
  11: { code: 'PRTC', male: '無口なスナイパー',   female: '無口なテクニシャン' },
  12: { code: 'PFTC', male: '性癖研究員',         female: '変態リケジョ' },
  13: { code: 'PREN', male: '忠実な番犬',         female: '従順な夜の秘書' },
  14: { code: 'PFEN', male: '愛の執行人',         female: '心中ロマンチスト' },
  15: { code: 'PREC', male: '感度3000倍のオス猫', female: 'とろける猫' },
  16: { code: 'PFEC', male: '夢見る詩人',         female: '悲劇のヒロイン' }
} as const;

// ■ 2. 相性マトリクス (Compatibility Matrix)
export const compatibilityMatrix = {
  // 1. ARTN
  1: { best: 13, good: 15, worst: 8 },
  // 2. AFTN
  2: { best: 15, good: 16, worst: 1 },
  // 3. AREN
  3: { best: 8,  good: 16, worst: 10 },
  // 4. AFEN
  4: { best: 16, good: 14, worst: 11 },
  // 5. ARTC
  5: { best: 14, good: 5,  worst: 13 },
  // 6. AFTC
  6: { best: 13, good: 9,  worst: 16 },
  // 7. AREC
  7: { best: 10, good: 7,  worst: 14 },
  // 8. AFEC
  8: { best: 9,  good: 8,  worst: 3 },
  // 9. PRTN
  9: { best: 6,  good: 8,  worst: 5 },
  // 10. PFTN
  10: { best: 7,  good: 6,  worst: 3 },
  // 11. PRTC
  11: { best: 4,  good: 11, worst: 16 },
  // 12. PFTC
  12: { best: 4,  good: 12, worst: 1 },
  // 13. PREN
  13: { best: 6,  good: 1,  worst: 5 },
  // 14. PFEN
  14: { best: 5,  good: 14, worst: 9 },
  // 15. PREC
  15: { best: 2,  good: 1,  worst: 10 },
  // 16. PFEC
  16: { best: 3,  good: 2,  worst: 11 }
} as const;

// コードからIDを取得
export function getCharacterIdByCode(code: string): number | null {
  for (const [id, data] of Object.entries(characterIdMap)) {
    if (data.code === code) {
      return parseInt(id);
    }
  }
  return null;
}

// IDからキャラクター情報を取得
export function getCharacterById(id: number, gender: 'male' | 'female') {
  const character = characterIdMap[id as keyof typeof characterIdMap];
  if (!character) return null;
  
  return {
    code: character.code,
    name: character[gender],
    id
  };
}

// 相性情報を取得
export function getCompatibility(characterCode: string) {
  const id = getCharacterIdByCode(characterCode);
  if (!id || !compatibilityMatrix[id as keyof typeof compatibilityMatrix]) {
    return null;
  }
  
  const compatibility = compatibilityMatrix[id as keyof typeof compatibilityMatrix];
  
  return {
    best: compatibility.best,
    worst: compatibility.worst
  };
}