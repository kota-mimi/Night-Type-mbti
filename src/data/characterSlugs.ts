// Night Type キャラクターのURL用スラッグマッピング（32種類独立）
export const characterSlugs: Record<string, string> = {
  // 男性版 Night Type characters (16種類)
  'ARTN-male': 'absolute-king',              // 絶対君主（キング）
  'AFTN-male': 'night-ceo',                 // 夜のCEO
  'AREN-male': 'overprotective-husband',    // 過保護な旦那
  'AFEN-male': 'love-guru',                 // 愛の教祖
  'ARTC-male': 'runaway-dumptruck',         // 暴走ダンプカー
  'AFTC-male': 'night-joker',               // 夜のジョーカー
  'AREC-male': 'narcissistic-star',         // 自意識過剰なスター
  'AFEC-male': 'whimsical-peter-pan',       // 気まぐれピーターパン
  'PRTN-male': 'serious-civil-servant',     // 生真面目な公務員
  'PFTN-male': 'solo-player',               // ソロプレイヤー
  'PRTC-male': 'silent-sniper',             // 無口なスナイパー
  'PFTC-male': 'fetish-researcher',         // 性癖研究員
  'PREN-male': 'faithful-guard-dog',        // 忠実な番犬
  'PFEN-male': 'love-enforcer',             // 愛の執行人
  'PREC-male': 'sensitive-male-cat',        // 感度3000倍のオス猫
  'PFEC-male': 'dreaming-poet',             // 夢見る詩人（ポエマー）

  // 女性版 Night Type characters (16種類)
  'ARTN-female': 'cold-empress',            // 冷徹な女帝（クイーン）
  'AFTN-female': 'little-devil-inventor',   // 小悪魔な発明家
  'AREN-female': 'overprotective-mama',     // 過保護なママ
  'AFEN-female': 'innocent-tinkerbell',     // 無邪気なティンカーベル
  'ARTC-female': 'carnivorous-hunter',      // 肉食系ハンター
  'AFTC-female': 'ice-beauty',              // 氷の美貌（ビューティー）
  'AREC-female': 'spotlight-actress',       // スポットライト女優
  'AFEC-female': 'magical-saint',           // 魔性の聖女
  'PRTN-female': 'iron-wall-guard',         // 鉄壁のガードマン
  'PFTN-female': 'cold-screenwriter',       // 冷めた脚本家
  'PRTC-female': 'silent-technician',       // 無口なテクニシャン
  'PFTC-female': 'perverted-science-girl',  // 変態リケジョ
  'PREN-female': 'obedient-night-secretary',// 従順な夜の秘書
  'PFEN-female': 'suicide-romanticist',     // 心中ロマンチスト
  'PREC-female': 'melting-cat',             // とろける猫
  'PFEC-female': 'tragic-heroine',          // 悲劇のヒロイン
};

// 逆引き用
export const slugToType: Record<string, string> = Object.fromEntries(
  Object.entries(characterSlugs).map(([key, value]) => [value, key])
);