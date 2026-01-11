import { Question } from '@/types';

export const questions: Question[] = [
  // SG軸（Solo vs Group）Q1〜Q6 → S寄り3問、G寄り3問
  {
    id: 1,
    axis: 'SG',
    text: 'ジムに行く時、知り合いがいると気を遣ってしまうので避けたい。',
    direction: 'positive'
  },
  {
    id: 2,
    axis: 'SG',
    text: '友達と一緒に運動する方が、楽しくて頑張れる。',
    direction: 'negative'
  },
  {
    id: 3,
    axis: 'SG',
    text: 'ダイエットのことを家族や友達によく相談する。',
    direction: 'negative'
  },
  {
    id: 4,
    axis: 'SG',
    text: 'ダイエット中であることを、なるべく人に知られたくない。',
    direction: 'positive'
  },
  {
    id: 5,
    axis: 'SG',
    text: 'みんなでワイワイしながら運動する方が、一人より続く。',
    direction: 'negative'
  },
  {
    id: 6,
    axis: 'SG',
    text: '人に見られていると、本気でトレーニングしにくい。',
    direction: 'positive'
  },
  
  // RE軸（Routine vs Emotion）Q7〜Q12 → R寄り3問、E寄り3問
  {
    id: 7,
    axis: 'RE',
    text: '今日は何を食べようかな、と毎回考えるのが楽しい。',
    direction: 'negative'
  },
  {
    id: 8,
    axis: 'RE',
    text: '毎日同じ運動だと、すぐに飽きてやめたくなる。',
    direction: 'negative'
  },
  {
    id: 9,
    axis: 'RE',
    text: '毎日同じ時間に同じことをする方が、習慣になって楽。',
    direction: 'positive'
  },
  {
    id: 10,
    axis: 'RE',
    text: '急な飲み会に誘われたら、ダイエットは一旦忘れて楽しむ。',
    direction: 'negative'
  },
  {
    id: 11,
    axis: 'RE',
    text: '毎日の食事メニューを事前に決めておく方が安心。',
    direction: 'positive'
  },
  {
    id: 12,
    axis: 'RE',
    text: 'ダイエット中は、決めたルールを必ず守ることが大切だと思う。',
    direction: 'positive'
  },

  // FC軸（Food Quality vs Calorie）Q13〜Q18 → F寄り3問、C寄り3問
  {
    id: 13,
    axis: 'FC',
    text: 'スーパーで食材を買う時、値段が少し高くてもオーガニックや無添加のものを選ぶ。',
    direction: 'positive'
  },
  {
    id: 14,
    axis: 'FC',
    text: 'コンビニで何か買う時、まずはカロリー表示をチェックしてから決める。',
    direction: 'negative'
  },
  {
    id: 15,
    axis: 'FC',
    text: '外食する時、値段よりも食材の質や安全性を重視して店を選ぶ。',
    direction: 'positive'
  },
  {
    id: 16,
    axis: 'FC',
    text: '食事の記録をつける時、カロリー計算アプリを使って数字で管理している。',
    direction: 'negative'
  },
  {
    id: 17,
    axis: 'FC',
    text: '冷凍食品よりも、手間がかかっても新鮮な野菜や肉を使って料理したい。',
    direction: 'positive'
  },
  {
    id: 18,
    axis: 'FC',
    text: '同じ味なら、普通の商品より低カロリー・ゼロカロリー商品を選ぶ。',
    direction: 'negative'
  },

  // QL軸（Quick vs Long）Q19〜Q24 → Q寄り3問、L寄り3問
  {
    id: 19,
    axis: 'QL',
    text: '1〜2週間で体重が減らないと、この方法は効果ないと思ってやめてしまう。',
    direction: 'positive'
  },
  {
    id: 20,
    axis: 'QL',
    text: '体重の変化が少なくても、1年後を考えてゆっくりと続けることができる。',
    direction: 'negative'
  },
  {
    id: 21,
    axis: 'QL',
    text: 'ダイエットを始めたら、1ヶ月以内に見た目の変化が欲しい。',
    direction: 'positive'
  },
  {
    id: 22,
    axis: 'QL',
    text: '短期間で痩せるよりも、太りにくい体質になる方が大切だと思う。',
    direction: 'negative'
  },
  {
    id: 23,
    axis: 'QL',
    text: '夏までに痩せたいなど、具体的な期限がある方がやる気が出る。',
    direction: 'positive'
  },
  {
    id: 24,
    axis: 'QL',
    text: '無理して早く痩せるより、健康を保ちながら少しずつ痩せたい。',
    direction: 'negative'
  }
];