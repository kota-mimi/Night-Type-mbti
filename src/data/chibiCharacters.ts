export const chibiCharacterArt = {
  male: {
    ARTN: { name: '絶対君主', motif: '王冠と赤い玉座', color: '#F2A65A' },
    AFTN: { name: '夜のCEO', motif: 'ノートPCと高級腕時計', color: '#9BA7D7' },
    AREN: { name: '過保護な旦那', motif: '毛布と温かい飲み物', color: '#E9A7B0' },
    AFEN: { name: '愛の教祖', motif: 'ハート形の後光と花束', color: '#D69BE8' },
    ARTC: { name: '暴走ダンプカー', motif: '炎を上げる小さなハンドル', color: '#F28B66' },
    AFTC: { name: '夜のジョーカー', motif: 'トランプとびっくり箱', color: '#79C8B8' },
    AREC: { name: '自意識過剰なスター', motif: 'スポットライトと手鏡', color: '#F5C96A' },
    AFEC: { name: '気まぐれピーターパン', motif: '羽根付き帽子と紙飛行機', color: '#83C98A' },
    PRTN: { name: '生真面目な公務員', motif: '書類の束ときっちりした眼鏡', color: '#8FB6CF' },
    PFTN: { name: 'ソロプレイヤー', motif: 'ヘッドホンと携帯ゲーム機', color: '#A8A8C7' },
    PRTC: { name: '無口なスナイパー', motif: '的と片目を閉じたポーズ', color: '#78909C' },
    PFTC: { name: '性癖研究員', motif: '白衣と虫眼鏡とメモ帳', color: '#77BFC7' },
    PREN: { name: '忠実な番犬', motif: '首輪風チョーカーと待てのポーズ', color: '#D6A36A' },
    PFEN: { name: '愛の執行人', motif: '大きなハートを抱える姿', color: '#B89AD7' },
    PREC: { name: '感度3000倍のオス猫', motif: '猫のように丸まる姿と鈴', color: '#E6B49A' },
    PFEC: { name: '夢見る詩人', motif: '開いた本と三日月', color: '#9CB5DA' },
  },
  female: {
    ARTN: { name: '冷徹な女帝', motif: '王冠と赤い玉座と扇', color: '#E59AAE' },
    AFTN: { name: '小悪魔な発明家', motif: '角風カチューシャと電球', color: '#80C9B8' },
    AREN: { name: '過保護なママ', motif: '毛布と救急箱', color: '#E7A6A0' },
    AFEN: { name: '無邪気なティンカーベル', motif: '小さな羽と星のステッキ', color: '#93CD86' },
    ARTC: { name: '肉食系ハンター', motif: '小さな弓矢と狙いを定める姿', color: '#E98572' },
    AFTC: { name: '氷の美貌', motif: 'タブレットと氷の結晶', color: '#9FCBDD' },
    AREC: { name: 'スポットライト女優', motif: 'スポットライトと羽根扇', color: '#F1BD70' },
    AFEC: { name: '魔性の聖女', motif: 'ハート形の後光と小さな杖', color: '#D49AE3' },
    PRTN: { name: '鉄壁のガードマン', motif: '小さな盾とチェックリスト', color: '#8EAFCB' },
    PFTN: { name: '冷めた脚本家', motif: '脚本と冷めたコーヒー', color: '#AAA4C8' },
    PRTC: { name: '無口なテクニシャン', motif: '工具箱と無表情なピース', color: '#7FA0A8' },
    PFTC: { name: '変態リケジョ', motif: '白衣とフラスコとメモ帳', color: '#75BDC7' },
    PREN: { name: '従順な夜の秘書', motif: '手帳とリボン付きファイル', color: '#D4A176' },
    PFEN: { name: '心中ロマンチスト', motif: '大きなハートと封筒', color: '#BA93CA' },
    PREC: { name: 'とろける猫', motif: 'クッションで丸まる姿と鈴', color: '#E5AF9D' },
    PFEC: { name: '悲劇のヒロイン', motif: '涙型ハンカチと古い恋愛小説', color: '#9FAED5' },
  },
} as const;

export function getChibiImagePath(typeCode: string, gender: 'male' | 'female') {
  return `/characters/chibi/${typeCode}_${gender}.png`;
}
