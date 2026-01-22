'use client'

import { motion } from 'framer-motion'
import { Noto_Sans_JP } from 'next/font/google'
import { User, Brain, Scale, Clock } from 'lucide-react'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  display: 'swap',
})

export default function AboutPage() {
  const axes = [
    {
      icon: <User className="w-8 h-8 text-blue-600" />,
      title: '第1指標：エネルギー (Energy)',
      subtitle: '「攻めたいか、受け入れたいか」',
      items: [
        {
          type: 'A：アクティブ (Active / 能動)',
          feature: '特徴： 主導権を握りたい「S気質」タイプ。',
          psychology: '心理： 相手をコントロールしたり、自分の思い通りに乱れさせたりすることに興奮を覚えます。「見せたい」「聞かせたい」という露出・誇示欲求もこちらに分類されます。'
        },
        {
          type: 'P：パッシブ (Passive / 受動)',
          feature: '特徴： 相手に委ねたい「M気質」タイプ。',
          psychology: '心理： 恥じらいや、少し強引に求められることに喜びを感じます。アイマスク等で視界を遮断して感覚に没入するなど、内面的な快楽を重視します。'
        }
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: '第2指標：刺激の源 (Stimulus)',
      subtitle: '「肉体で感じるか、脳内で感じるか」',
      items: [
        {
          type: 'R：リアル (Real / 現実)',
          feature: '特徴： 肌の触れ合いやリアルな感触を重視する「感覚」タイプ。',
          psychology: '心理： ムードや言葉よりも「技術」や「物理的な相性」が全て。匂い、体温、締め付けなど、五感に直接くる刺激がないと満足できません。'
        },
        {
          type: 'F：ファンタジー (Fantasy / 妄想)',
          feature: '特徴： シチュエーションや言葉に興奮する「直感」タイプ。',
          psychology: '心理： 「今、禁断のことをしている」という背徳感や、耳元での囁き、コスプレやロールプレイなど、想像力（脳内）を掻き立てられる要素でイくことができます。'
        }
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: '第3指標：判断基準 (Judgment)',
      subtitle: '「機能性を取るか、情緒を取るか」',
      items: [
        {
          type: 'T：テクニカル (Tech / 機能)',
          feature: '特徴： セックスを「スポーツ」や「快楽の追求」と割り切れるタイプ。',
          psychology: '心理： 感情がなくても、体が気持ちよければOKというドライな一面があります。新しいおもちゃや体位への探究心も旺盛な研究家です。'
        },
        {
          type: 'E：エモーショナル (Emo / 感情)',
          feature: '特徴： セックスを「愛情確認」や「心の融合」と捉えるタイプ。',
          psychology: '心理： 行為そのものより、キス、ハグ、終わった後のピロートークが最重要。「愛されている」という実感がないと、どれだけ激しくても虚しくなります。'
        }
      ]
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: '第4指標：行動パターン (Style)',
      subtitle: '「安定を好むか、刺激を好むか」',
      items: [
        {
          type: 'N：ノーマル (Normal / 王道)',
          feature: '特徴： いつもの手順、いつもの場所で安心したい「秩序」タイプ。',
          psychology: '心理： 決まったルーティンを守ることに心地よさを感じます。急な無茶振りや、準備のないアブノーマルなハプニングは苦手です。'
        },
        {
          type: 'C：カオス (Chaos / 混沌)',
          feature: '特徴： その場のノリやハプニングを楽しみたい「変幻自在」タイプ。',
          psychology: '心理： マンネリが大敵。「次はどうなるの？」という予測不能な展開や、場所を選ばないスリル、野外などのスパイスを常に求めています。'
        }
      ]
    }
  ]

  return (
    <div className={`min-h-screen bg-midnight-900 relative overflow-hidden ${notoSansJP.className}`}>
      {/* Background Floating Orbs */}
      <div className="floating-orb orb-pink w-64 h-64 top-20 left-10" style={{animationDelay: '0s'}} />
      <div className="floating-orb orb-cyan w-48 h-48 top-1/2 right-20" style={{animationDelay: '4s'}} />
      <div className="floating-orb orb-purple w-56 h-56 bottom-20 left-1/3" style={{animationDelay: '8s'}} />
      <div className="floating-orb orb-pink w-40 h-40 top-1/3 right-1/4" style={{animationDelay: '12s'}} />
      
      <div className="container mx-auto px-4 py-16 max-w-4xl relative z-10">
        
        {/* 4つの軸 */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="neon-card p-8 md:p-10"
        >
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-3xl font-bold neon-gold mb-6 whitespace-nowrap">
              Night Type診断
            </h1>
            <h2 className="text-lg md:text-xl text-gray-200 mb-6">
              アダルト性格診断（夜のMBTI） 4つの分析軸
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                なぜ、あの人と体の相性が合わないのでしょうか？ なぜ、いつも同じパターンで恋愛が終わるのでしょうか？
              </p>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                それは「愛情の深さ」の違いではなく、<strong className="neon-pink">「本能のクセ（性癖）」</strong>の違いです。
              </p>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                本診断では、あなたの夜の行動パターンを４つの指標で徹底分析。 全16タイプの中から、あなたが最も輝ける<strong className="neon-pink">「本当の夜の姿」と「運命の相手」</strong>を導き出します。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {axes.map((axis, index) => (
              <div key={index} className="neon-card border border-gray-600/30 p-4 md:p-6">
                {/* 軸のタイトル */}
                <div className="mb-4">
                  <h2 className="text-lg md:text-xl font-bold neon-cyan mb-2">
                    {axis.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-300 font-medium">
                    {axis.subtitle}
                  </p>
                </div>

                {/* 2つのタイプ */}
                <div className="grid md:grid-cols-2 gap-4">
                  {axis.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="neon-card border border-gray-700/40 p-4 space-y-3"
                    >
                      <h3 className="text-base font-bold text-gray-200">
                        {item.type}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {item.feature}
                        </p>
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {item.psychology}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}