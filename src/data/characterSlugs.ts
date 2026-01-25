// Night Type キャラクターのURL用スラッグマッピング（タイプコード別）
export const characterSlugs: Record<string, string> = {
  // Night Type characters
  'ARTN': 'absolute-king',         // 絶対君主（キング）/ 冷徹な女帝（クイーン）
  'AFTN': 'night-ceo',            // 夜のCEO / 小悪魔な発明家
  'AREN': 'overprotective-husband', // 過保護な旦那 / 過保護なママ
  'AFEN': 'love-guru',            // 愛の教祖 / 無邪気なティンカーベル
  'ARTC': 'runaway-dumptruck',    // 暴走ダンプカー / 肉食系ハンター
  'AFTC': 'night-joker',          // 夜のジョーカー / 氷の美貌（ビューティー）
  'AREC': 'narcissistic-star',    // 自意識過剰なスター / スポットライト女優
  'AFEC': 'whimsical-peter-pan',  // 気まぐれピーターパン / 魔性の聖女
  'PRTN': 'serious-civil-servant', // 生真面目な公務員 / 鉄壁のガードマン
  'PFTN': 'solo-player',          // ソロプレイヤー / 冷めた脚本家
  'PRTC': 'silent-sniper',        // 無口なスナイパー / 無口なテクニシャン
  'PFTC': 'fetish-researcher',    // 性癖研究員 / 変態リケジョ
  'PREN': 'faithful-guard-dog',   // 忠実な番犬 / 従順な夜の秘書
  'PFEN': 'love-enforcer',        // 愛の執行人 / 心中ロマンチスト
  'PREC': 'sensitive-cat',        // 感度3000倍のオス猫 / とろける猫
  'PFEC': 'dreaming-poet',        // 夢見る詩人（ポエマー）/ 悲劇のヒロイン
};

// 逆引き用
export const slugToType: Record<string, string> = Object.fromEntries(
  Object.entries(characterSlugs).map(([key, value]) => [value, key])
);