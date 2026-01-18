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
          type: 'A：アクティブ (Active / 攻め)',
          feature: '特徴： 主導権を握りたい「S気質」タイプ。',
          psychology: '心理： 相手をコントロールしたり、自分の思い通りに乱れさせたりすることに興奮を覚えます。「見せたい」「聞かせたい」という露出欲求もこちら。'
        },
        {
          type: 'P：パッシブ (Passive / 受け)',
          feature: '特徴： 相手に委ねたい「M気質」タイプ。',
          psychology: '心理： 恥じらいや、少し強引に求められることに喜びを感じます。視界を遮断して感覚に没入するなど、内面的な快楽を重視します。'
        }
      ]
    },
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: '第2指標：刺激の源 (Source)',
      subtitle: '「肉体で感じるか、脳内で感じるか」',
      items: [
        {
          type: 'P：フィジカル (Physical / 肉体)',
          feature: '特徴： 肌の触れ合いやリアルな感触を重視する「現実」タイプ。',
          psychology: '心理： ムードよりも「技術」や「体の相性」が全て。匂い、体温、締め付けなど、物理的な刺激がないと満足できません。'
        },
        {
          type: 'B：ブレイン (Brain / 脳内)',
          feature: '特徴： シチュエーションや言葉に興奮する「妄想」タイプ。',
          psychology: '心理： 「今、禁断のことをしている」という背徳感や、耳元での囁きなど、想像力を掻き立てられる要素でイくことができます。'
        }
      ]
    },
    {
      icon: <Scale className="w-8 h-8 text-green-600" />,
      title: '第3指標：判断基準 (Judgment)',
      subtitle: '「機能性を取るか、情緒を取るか」',
      items: [
        {
          type: 'T：テクニカル (Technical / 機能)',
          feature: '特徴： セックスを「スポーツ」や「快楽の追求」と割り切れるタイプ。',
          psychology: '心理： 感情がなくても、体が気持ちよければOKというドライな一面があります。新しいおもちゃや体位への探究心も旺盛です。'
        },
        {
          type: 'E：エモーショナル (Emotional / 情緒)',
          feature: '特徴： セックスを「愛情確認」や「心の融合」と捉えるタイプ。',
          psychology: '心理： 行為そのものより、キス、ハグ、終わった後のピロートークが最重要。「愛されている」という実感がないと虚しくなります。'
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
          feature: '特徴： いつもの手順、いつもの場所で安心したい「安定」タイプ。',
          psychology: '心理： 決まったルーティンを守ることに心地よさを感じます。急な無茶振りや、アブノーマルなハプニングは苦手です。'
        },
        {
          type: 'C：カオス (Chaos / 刺激)',
          feature: '特徴： その場のノリやハプニングを楽しみたい「冒険」タイプ。',
          psychology: '心理： マンネリが大敵。「次はどうなるの？」という予測不能な展開や、野外・スリルなどのスパイスを常に求めています。'
        }
      ]
    }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-b from-pink-100 to-rose-100 ${notoSansJP.className}`}>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* 4つの軸 */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 whitespace-nowrap">
              Night Type診断
            </h1>
            <h2 className="text-lg md:text-xl text-gray-700 mb-6">
              アダルト性格診断（夜のMBTI） 4つの分析軸
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                なぜ、あの人と体の相性が合わないのでしょうか？ なぜ、いつも同じパターンで恋愛が終わるのでしょうか？
              </p>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
                それは「愛情の深さ」の違いではなく、<strong className="text-pink-600">「本能のクセ（性癖）」</strong>の違いです。
              </p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                本診断では、あなたの夜の行動パターンを４つの指標で徹底分析。 全16タイプの中から、あなたが最も輝ける<strong className="text-pink-600">「本当の夜の姿」と「運命の相手」</strong>を導き出します。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {axes.map((axis, index) => (
              <div key={index} className="bg-[#E6F3FF] rounded-xl p-4 md:p-6">
                {/* 軸のタイトル */}
                <div className="mb-4">
                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">
                    {axis.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 font-medium">
                    {axis.subtitle}
                  </p>
                </div>

                {/* 2つのタイプ */}
                <div className="grid md:grid-cols-2 gap-4">
                  {axis.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white rounded-xl p-4 space-y-3"
                    >
                      <h3 className="text-base font-bold text-gray-800">
                        {item.type}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item.feature}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
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