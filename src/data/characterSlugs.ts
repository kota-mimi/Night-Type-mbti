// Night Code キャラクターのURL用スラッグマッピング（性別別）
export const characterSlugs: Record<string, string> = {
  // Male Night Code characters
  'male-ARTN': 'absolute-king',         // 絶対君主（キング）
  'male-AFTN': 'night-ceo',            // 夜のCEO
  'male-AREN': 'overprotective-patron', // 過保護なパトロン
  'male-AFEN': 'love-guru',            // 愛の教祖
  'male-ARTC': 'runaway-dumptruck',    // 暴走ダンプカー
  'male-AFTC': 'night-joker',          // 夜のジョーカー
  'male-AREC': 'narcissistic-star',    // 自意識過剰なスター
  'male-AFEC': 'whimsical-peter-pan',  // 気まぐれピーターパン
  'male-PRTN': 'serious-civil-servant', // 生真面目な公務員
  'male-PFTN': 'solo-player',          // ソロプレイヤー
  'male-PRTC': 'silent-sniper',        // 無口なスナイパー
  'male-PFTC': 'fetish-researcher',    // 性癖研究員
  'male-PREN': 'faithful-guard-dog',   // 忠実な番犬
  'male-PFEN': 'love-enforcer',        // 愛の執行人
  'male-PREC': 'sensitive-male-cat',   // 感度3000倍のオス猫
  'male-PFEC': 'dreaming-poet',        // 夢見る詩人（ポエマー）

  // Female Night Code characters
  'female-ARTN': 'cold-empress',         // 冷徹な女帝（クイーン）
  'female-AFTN': 'little-devil-inventor',// 小悪魔な発明家
  'female-AREN': 'overprotective-mama',  // 過保護なママ
  'female-AFEN': 'magical-saint',        // 魔性の聖女
  'female-ARTC': 'carnivorous-hunter',   // 肉食系ハンター
  'female-AFTC': 'ice-beauty',           // 氷の美貌（ビューティー）
  'female-AREC': 'spotlight-actress',    // スポットライト女優
  'female-AFEC': 'innocent-tinkerbell',  // 無邪気なティンカーベル
  'female-PRTN': 'iron-wall-guard',      // 鉄壁のガードマン
  'female-PFTN': 'cold-screenwriter',    // 冷めた脚本家
  'female-PRTC': 'silent-technician',    // 無口なテクニシャン
  'female-PFTC': 'perverted-science-girl', // 変態リケジョ
  'female-PREN': 'obedient-night-secretary', // 従順な夜の秘書
  'female-PFEN': 'suicide-romanticist',  // 心中ロマンチスト
  'female-PREC': 'melting-cat',          // とろける猫
  'female-PFEC': 'tragic-heroine'        // 悲劇のヒロイン
};

// 逆引き用
export const slugToType: Record<string, string> = Object.fromEntries(
  Object.entries(characterSlugs).map(([key, value]) => [value, key])
);