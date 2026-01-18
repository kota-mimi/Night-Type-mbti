// Night Code キャラクターのURL用スラッグマッピング
export const characterSlugs: Record<string, string> = {
  // Male Night Code characters (MBTI keys still used for males)
  ESTJ: 'absolute-king',         // 絶対君主（キング）
  ENTJ: 'night-ceo',            // 夜のCEO
  ESFJ: 'overprotective-patron', // 過保護なパトロン
  ENFJ: 'love-guru',            // 愛の教祖
  ESTP: 'runaway-dumptruck',    // 暴走ダンプカー
  ENTP: 'night-joker',          // 夜のジョーカー
  ESFP: 'narcissistic-star',    // 自意識過剰なスター
  ENFP: 'whimsical-peter-pan',  // 気まぐれピーターパン
  ISTJ: 'serious-civil-servant', // 生真面目な公務員
  INTJ: 'solo-player',          // ソロプレイヤー
  ISTP: 'silent-sniper',        // 無口なスナイパー
  INTP: 'fetish-researcher',    // 性癖研究員
  ISFJ: 'faithful-guard-dog',   // 忠実な番犬
  INFJ: 'love-enforcer',        // 愛の執行人
  ISFP: 'sensitive-male-cat',   // 感度3000倍のオス猫
  INFP: 'dreaming-poet',        // 夢見る詩人（ポエマー）

  // Female Night Code characters
  APTN: 'cold-empress',         // 冷徹な女帝（クイーン）
  ABTN: 'ice-beauty',           // 氷の美貌（ビューティー）
  APEN: 'overprotective-mama',  // 過保護なママ
  ABEN: 'magical-saint',        // 魔性の聖女
  APTC: 'carnivorous-hunter',   // 肉食系ハンター
  ABTC: 'little-devil-inventor',// 小悪魔な発明家
  APEC: 'spotlight-actress',    // スポットライト女優
  ABEC: 'innocent-tinkerbell',  // 無邪気なティンカーベル
  PPTN: 'iron-wall-guard',      // 鉄壁のガードマン
  PBTN: 'cold-screenwriter',    // 冷めた脚本家
  PPTC: 'silent-technician',    // 無口なテクニシャン
  PBTC: 'perverted-science-girl', // 変態リケジョ
  PPEN: 'obedient-night-secretary', // 従順な夜の秘書
  PBEN: 'suicide-romanticist',  // 心中ロマンチスト
  PPEC: 'melting-cat',          // とろける猫
  PBEC: 'tragic-heroine'        // 悲劇のヒロイン
};

// 逆引き用
export const slugToType: Record<string, string> = Object.fromEntries(
  Object.entries(characterSlugs).map(([key, value]) => [value, key])
);